const Candidate = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie-parser');
const imagekit = require('../config/imageKit');
const extractResumeText = require('../Utils/ResumeTextExtraction');
const parseResumeWithAI = require('../Utils/ParseResumeWithAI');

const userRegister = async (req, res) => {
    try{
        const {name, email, password, phone, role} = req.body;

        const emailExists = await Candidate.findOne({email});

        if(emailExists){
            res.status(400).json({
                success: false,
                message: "Email Already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Candidate.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role
        });

        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{
            expiresIn: "2h"
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: newUser,
            token: token
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
        console.log(error)
    }
};

const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const emailExists = await Candidate.findOne({email});

        if(!emailExists){
            res.status(400).json({
                success: false,
                message: "Email or Password is Incorrect"
            });
        }

        if(emailExists.role !== "candidate"){
            res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const passwordExists = await bcrypt.compare(password, emailExists.password);

        if(!passwordExists){
            res.status(400).json({
                success: false,
                message: "Email or Password is Incorrect"
            });
        }

        const token = jwt.sign({id: emailExists._id},process.env.JWT_SECRET,{
            expiresIn: "2h"
        })

            res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        })

        res.status(200).json({
            success: true,
            message: "User Logged In Successfully",
            user: emailExists,
            token: token
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const  id  = req.user.id; // Assuming the user ID is stored in req.user_id after authentication
        console.log("User DD",id);

        const user = await Candidate.findById(id);

        if (!user || user.role !== "candidate") {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Profile Retrieved",
            user: user
        })
    }catch (error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        console.log("error",error.message);

    }
};

const updateUserProfile = async (req, res) => {
    try {
        const id = req.user.id;
        const {name, email, phone} = req.body;

        const user = await Candidate.findById(id);

        if (!user || user.role !== "candidate") {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        // Update user profile
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User Profile Updated Successfully",
            user: user
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}

const updatePassword = async (req, res) => {
    try {
        const id = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await Candidate.findById(id);

        if (!user || user.role !== "candidate") {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }
//         console.log("currentPassword:", currentPassword);
// console.log("newPassword:", newPassword);
// console.log("user password exists:", !!user?.password);

        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated Successfully"
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
        console.log("error",error.message);
    }
}

const resumeUpload = async (req, res) => {
    try {
        const file = req.file;
        if(!file){
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const user = await Candidate.findById(req.user.id);

        if(!user || user.role !== "candidate"){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            }); 
        }

        // Extract text from resume
        const resumeText = await extractResumeText(file);

        if(!resumeText || resumeText.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Failed to extract text from resume"
            });
        }
        console.log("Extracted Resume Text:", resumeText);

        const parsedData = await parseResumeWithAI(resumeText);

        if(!parsedData){
            return res.status(400).json({
                success: false,
                message: "Failed to parse resume data"
            });
        }

        const upload = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: '/hireFlows/resumes'
        });

        user.resume = {
            fileName: req.file.originalname,
            fileUrl: upload.url,
            fileId: upload.fileId,
            uploadedAt: new Date(),
            parsingStatus: "completed",
            parsedDate: new Date(),
            parsedVerson: '1.0',
            extractedText: resumeText,
            parsedData: parsedData
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Resume Uploaded Successfully",
            resume: user.resume
        })

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
        console.log("error", error.message);

    }
}

module.exports = { userRegister, userLogin, getUserProfile, updateUserProfile, updatePassword, resumeUpload };