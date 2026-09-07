const Recruiter = require('../Models/recruiterModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie-parser');

const RecruiterRegister = async (req, res) => {
    try{
        const { "Company Name": companyName, email, password, phone, role } = req.body;

        const emailExists = await Recruiter.findOne({email});

        if(emailExists){
            res.status(400).json({
                success: false,
                message: "Email Already Exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Recruiter.create({
            "Company Name": companyName,
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

const RecruiterLogin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const emailExists = await Recruiter.findOne({email});

        if(!emailExists){
            res.status(400).json({
                success: false,
                message: "Email or Password is Incorrect"
            });
        }

        if(emailExists.role !== "recruiter"){
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

module.exports = { RecruiterRegister, RecruiterLogin };