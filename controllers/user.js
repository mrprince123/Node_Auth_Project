import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendToken } from "../utils/features.js";
import ErrorHandler from "../middleware/error.js";

export const register = async (req, res, next) => {

    try {

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User already Exists", 404));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword })

        sendToken(user, res, "Registered Successfully", 201);

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or Password", 404));
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or Password"
            });
        }

        sendToken(user, res, `Welcome back ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};


export const getMyProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        user: req.user,
    })

};

export const logout = async (req, res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message: "User Logged out Successfully"
    })

};