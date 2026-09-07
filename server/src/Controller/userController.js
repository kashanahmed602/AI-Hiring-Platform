const Candidate = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie-parser');

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

module.exports = { userRegister, userLogin };