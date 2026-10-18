const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const socketAuth = require('./Middleware/socketAuth');
const Interview = require('./Models/InterviewModel');
const Recruiter = require('./Models/recruiterModel');
const Candidate = require('./Models/userModel');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true,
    },
    transports: ['websocket', 'polling'],
})

io.use(socketAuth);

io.on('connection', (socket) => {
    console.log("Socket Connected", socket.id);

    socket.on('join-interview', async ({ interviewId } = {}, callback) => {
        const reply = typeof callback === 'function' ? callback : () => {};

        try{
            if(!mongoose.isValidObjectId(interviewId)){
                return reply({
                    success: false,
                    message: "Invalid interview ID",
                });
            }

            const interview = await Interview.findById(interviewId);
            if(!interview){
                return reply({
                    success: false,
                    message: "Interview not found",
                });
            }
            const userId = String(socket.user.id);
            const isRecruiter = String(interview.recruiterId) === userId && Boolean(await Recruiter.exists({ _id: userId }));

            const isCandidate = String(interview.candidateId) === userId && Boolean(await Candidate.exists({ _id: userId }));

            if(!isRecruiter && !isCandidate){
                return reply({
                    success: false,
                    message: "You are not authorized to join this interview",
                });
            }

            const roomId = `interview:${interviewId}`;

            const room = io.sockets.adapter.rooms.get(roomId);
            const existingSockets = room
                ? await Promise.all(
                [...room].map((id) => io.in(id).fetchSockets())
                  )
                : [];

            const occupiedRoles = existingSockets.flat().map((s) => s.data.interviewRole);
            
            if ((isRecruiter && occupiedRoles.includes("recruiter")) || (isCandidate && occupiedRoles.includes("candidate"))) {
                 return reply({
                    success: false,
                    message: "This participant is already connected to the interview",
                 });
                 }

            socket.data.interviewId = String(interview._id);
            socket.data.interviewRole = isRecruiter ? "recruiter" : "candidate";

            await socket.join(roomId);

             reply({
                success: true,
                message: "Interview room joined",
                role: socket.data.interviewRole,
            });

             // Tell the other authorized participant that this user has joined
            socket.to(roomId).emit("participant-joined", {
            role: socket.data.interviewRole,
         });

      console.log(`${socket.data.interviewRole} joined interview ${interview._id}`);
        }catch(error){
            console.error("Join interview error:", error);

      reply({
        success: false,
        message: "Could not join interview",
        });
    }
    })

     // Exchange PeerJS IDs only inside an authorized interview room
  socket.on("peer-ready", (peerId) => {
    if (
      !socket.data.interviewId ||
      typeof peerId !== "string" ||
      peerId.length > 200
    ) {
      return;
    }

    const roomId = `interview:${socket.data.interviewId}`;

    socket.to(roomId).emit("peer-ready", {
      peerId,
      role: socket.data.interviewRole,
    });
  });

    socket.on('disconnect', () => {
        console.log("Socket disconnected:", socket.id);
    });
});



httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
})