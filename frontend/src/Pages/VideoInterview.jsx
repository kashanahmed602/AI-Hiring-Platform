import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Peer } from "peerjs";
import axios from "axios";

import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  LoaderCircle,
  CircleAlert,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

const VideoInterview = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const socketRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);
  const callRef = useRef(null);
  const remotePeerIdRef = useRef("");
  const roleRef = useRef("");

  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Connecting to interview...");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [busy, setBusy] = useState(false);
  const [candidateAllowed, setCandidateAllowed] = useState(false);
  const [allowingCandidate, setAllowingCandidate] = useState(false);

  const callPeer = useCallback((remotePeerId) => {
    const peer = peerRef.current;
    const stream = streamRef.current;

    if (
      !peer ||
      peer.destroyed ||
      !stream ||
      !remotePeerId ||
      !peer.open ||
      callRef.current
    ) {
      return;
    }

    setError("");
    setBusy(true);
    setStatus("Calling interview participant...");

    const call = peer.call(remotePeerId, stream);

    if (!call) {
      setBusy(false);
      setError("Could not start video call. Please retry.");
      return;
    }

    callRef.current = call;
    attachCallListeners(call);
  }, []);

  const attachCallListeners = (call) => {
    call.on("stream", (remoteStream) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream;
      }

      setInCall(true);
      setBusy(false);
      setStatus("Video interview is live.");
    });

    call.on("close", () => {
      if (callRef.current === call) {
        callRef.current = null;
      }

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }

      setInCall(false);
      setBusy(false);
      setStatus("Call ended. You can reconnect if the interview is still open.");
    });

    call.on("error", (err) => {
      console.error("Peer call error:", err);
      setError("Video connection failed. Check your network and retry.");
      setBusy(false);
    });
  };

  useEffect(() => {
    if (!interviewId) {
      setError("Interview ID is missing from the URL.");
      setStatus("Cannot open interview.");
      return;
    }

    let disposed = false;

    const socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: false,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setStatus("Verifying your interview access...");
      setError("");

      socket.emit("join-interview", { interviewId }, (result) => {
        if (disposed) return;

        if (!result?.success) {
          setError(result?.message || "You cannot join this interview.");
          setStatus("Interview access denied.");
          socket.disconnect();
          return;
        }

        roleRef.current = result.role;
        setRole(result.role);

        setStatus(
          `Verified as ${result.role}. Start your camera to join the call.`
        );
      });
    });

    socket.on("connect_error", (err) => {
      if (disposed) return;

      console.error("Socket connection error:", err);
      setError(
        "Could not authenticate with the interview server. Please log in again."
      );
      setStatus("Connection failed.");
    });

    socket.on("participant-joined", ({ role: joinedRole } = {}) => {
      if (disposed) return;

      setStatus(`${joinedRole || "Your"} participant joined the room.`);

      // Re-send our PeerJS ID when the other participant joins.
      if (peerRef.current?.open) {
        socket.emit("peer-ready", peerRef.current.id);
      }
    });

    socket.on("peer-ready", ({ peerId, role: peerRole } = {}) => {
      if (
        disposed ||
        typeof peerId !== "string" ||
        !peerRole ||
        peerRole === roleRef.current
      ) {
        return;
      }

      remotePeerIdRef.current = peerId;

      // Only the recruiter initiates the call to avoid duplicate calls.
      if (roleRef.current === "recruiter" && streamRef.current) {
        callPeer(peerId);
      } else {
        setStatus(
          `${peerRole} is ready. Waiting for the recruiter to start the call.`
        );
      }
    });

    socket.connect();

    return () => {
      disposed = true;

      socket.removeAllListeners();
      socket.disconnect();

      if (socketRef.current === socket) {
        socketRef.current = null;
      }

      callRef.current?.close();
      callRef.current = null;

      peerRef.current?.destroy();
      peerRef.current = null;

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }
    };
  }, [interviewId, callPeer]);

  const handleAllowCandidate = async () => {
    try {
      setAllowingCandidate(true);
      setError("");

      const response = await axios.patch(
        `http://localhost:3001/api/v1/interviews/${interviewId}/allow-candidate`,
        {},
        { withCredentials: true }
      );

      if (response.data?.success) {
        setCandidateAllowed(true);
        setStatus("Candidate is allowed to join the interview.");
      } else {
        setError(response.data?.message || "Could not allow candidate.");
      }
    } catch (err) {
      console.error("Allow candidate error:", err);
      setError(
        err.response?.data?.message ||
          "Could not allow candidate. Please try again."
      );
    } finally {
      setAllowingCandidate(false);
    }
  };

  const startCamera = async () => {
    try {
      setError("");
      setBusy(true);
      setStatus("Requesting camera and microphone permission...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const peer = new Peer();
      peerRef.current = peer;

      peer.on("open", (peerId) => {
        setReady(true);
        setBusy(false);
        setStatus("Camera ready. Waiting for the other participant...");

        socketRef.current?.emit("peer-ready", peerId);

        // If the other participant was already ready, use their ID.
        if (
          roleRef.current === "recruiter" &&
          remotePeerIdRef.current
        ) {
          callPeer(remotePeerIdRef.current);
        }
      });

      peer.on("call", (call) => {
        // Candidate accepts calls only from the verified recruiter flow.
        // PeerJS itself does not authenticate the caller's identity.
        if (roleRef.current !== "candidate") {
          call.close();
          return;
        }

        if (callRef.current) {
          call.close();
          return;
        }

        callRef.current = call;
        call.answer(stream);
        attachCallListeners(call);
        setStatus("Connecting to recruiter...");
      });

      peer.on("error", (err) => {
        console.error("PeerJS error:", err);
        setError(`Video service error: ${err.type || err.message}`);
        setBusy(false);
      });
    } catch (err) {
      console.error("Camera setup error:", err);

      setError(
        err.name === "NotAllowedError"
          ? "Camera/microphone permission denied. Allow access in your browser."
          : err.message || "Could not start camera."
      );

      setStatus("Camera setup failed.");
      setBusy(false);
    }
  };

  const toggleMic = () => {
    const next = !micOn;

    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = next;
    });

    setMicOn(next);
  };

  const toggleCamera = () => {
    const next = !cameraOn;

    streamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = next;
    });

    setCameraOn(next);
  };

  const endCall = () => {
    callRef.current?.close();
    callRef.current = null;

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setInCall(false);
    setBusy(false);
    setStatus("Call ended.");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="text-sm font-semibold text-violet-600">
            HIREFLOW VIDEO INTERVIEW
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Live Interview Room
          </h1>

          <p className="mt-2 text-sm text-slate-500">{status}</p>

          <p className="mt-2 break-all text-xs text-slate-400">
            Interview ID: {interviewId}
          </p>
        </header>

        {error && (
          <div className="mb-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <CircleAlert size={18} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        {role && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
            <ShieldCheck size={18} />
            Verified interview participant: {role}
          </div>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-4">
              <p className="font-semibold">You</p>
              <p className="text-xs text-slate-500">Local video</p>
            </div>

            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="aspect-video w-full bg-slate-900 object-cover"
            />
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-4">
              <p className="font-semibold">Other participant</p>
              <p className="text-xs text-slate-500">Remote video</p>
            </div>

            <div className="relative flex aspect-video items-center justify-center bg-slate-900">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="h-full w-full object-cover"
              />

              {!inCall && (
                <div className="absolute text-center text-sm text-white/70">
                  <Video size={32} className="mx-auto mb-2" />
                  Waiting for participant...
                </div>
              )}
            </div>
          </section>
        </div>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <button
            onClick={startCamera}
            disabled={!role || ready || busy}
            className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy && <LoaderCircle size={18} className="animate-spin" />}
            <Video size={18} />
            Start Camera
          </button>

          {role === "recruiter" && (
            <button
              type="button"
              onClick={handleAllowCandidate}
              disabled={candidateAllowed || allowingCandidate}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {allowingCandidate ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                <CheckCircle2 size={18} />
              )}
              {allowingCandidate
                ? "Allowing Candidate..."
                : candidateAllowed
                ? "Candidate Allowed"
                : "Allow Candidate"}
            </button>
          )}

          {!role && (
            <p className="mt-2 text-sm text-slate-500">
              Camera access will be available after the server verifies your interview.
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={toggleMic}
              disabled={!streamRef.current}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50 disabled:opacity-50"
            >
              {micOn ? <Mic size={18} /> : <MicOff size={18} />}
              {micOn ? "Mute" : "Unmute"}
            </button>

            <button
              onClick={toggleCamera}
              disabled={!streamRef.current}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50 disabled:opacity-50"
            >
              {cameraOn ? <Video size={18} /> : <VideoOff size={18} />}
              {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
            </button>

            <button
              onClick={endCall}
              disabled={!inCall}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              <PhoneOff size={18} />
              End Call
            </button>

            <button
              onClick={() => navigate(-1)}
              className="rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50"
            >
              Leave Room
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default VideoInterview;
