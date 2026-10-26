
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Candidate = require('../Models/userModel');
const Recruiter = require('../Models/recruiterModel');
const authCookieOptions = require('../Utils/authCookieOptions');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    try {
        const { credential, role, phone, companyName } = req.body;

        if (
            !credential ||
            !['candidate', 'recruiter'].includes(role)
        ) {
            return res.status(400).json({
                success: false,
                message: 'Google credential and valid role are required'
            });
        }

        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        if (!payload?.email || !payload.email_verified) {
            return res.status(401).json({
                success: false,
                message: 'Google email could not be verified'
            });
        }

        const email = payload.email.toLowerCase().trim();
        const name = payload.name || email.split('@')[0];

        const Model = role === 'candidate' ? Candidate : Recruiter;
        const OtherModel = role === 'candidate' ? Recruiter : Candidate;

        // Prevent the same email from being registered under both roles.
        const otherAccount = await OtherModel.findOne({ email });

        if (otherAccount) {
            return res.status(409).json({
                success: false,
                message: `This email belongs to a ${otherAccount.role} account. Please select the correct account type.`
            });
        }

        let user = await Model.findOne({ email });
        let isNewUser = false;

        if (!user) {
            // Google does not provide a password. Generate an unusable
            // random password hash to preserve compatibility with the schema.
            const randomPassword = crypto.randomBytes(32).toString('hex');
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            const userData = {
                email,
                password: hashedPassword,
                phone: typeof phone === 'string' ? phone.trim() : '',
                role
            };

            if (role === 'candidate') {
                userData.name = name;
            } else {
                userData.Company =
                    typeof companyName === 'string'
                        ? companyName.trim()
                        : '';
            }

            user = await Model.create(userData);
            isNewUser = true;
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            ...authCookieOptions,
            maxAge: 2 * 60 * 60 * 1000
        });

        const safeUser = user.toObject();
        delete safeUser.password;

        return res.status(isNewUser ? 201 : 200).json({
            success: true,
            isNewUser,
            message: isNewUser
                ? 'Google account created successfully'
                : 'Google login successful',
            user: safeUser
        });

    } catch (error) {
        console.error('Google authentication error:', error);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Google authentication failed'
        });
    }
};

module.exports = { googleLogin };
