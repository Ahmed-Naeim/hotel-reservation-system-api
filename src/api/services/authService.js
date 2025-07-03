import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { User } from '../models/userModel.js';
import { ApiError } from '../../utils/ApiError.js';
import { Email } from '../../utils/email.js';
import crypto from 'crypto';
import asyncHandler from 'express-async-handler';

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN.replace('d', '') * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};


export const signup = asyncHandler(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role // Role can be set on signup, but should be restricted
    });

    createSendToken(newUser, 201, res);
});

export const login = asyncHandler(async (req, res, next) => {
    // Check if email and password are provided
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ApiError(400, 'Please provide email and password!'));
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new ApiError(401, 'Incorrect email or password'));
    }

    // If everything is correct, send token to client
    createSendToken(user, 200, res);
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
    // Check if email is provided
    if (!req.body.email) {
        return next(new ApiError(400, 'Please provide your email address.'));
    }

    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ApiError(404, 'There is no user with that email address.'));
    }
    // Generate reset token and set expiration
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
    });
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ApiError(500, 'There was an error sending the email. Try again later.'));
});

export const resetPassword = asyncHandler(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ApiError(400, 'Token is invalid or has expired'));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    createSendToken(user, 200, res);
});