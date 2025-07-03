import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../api/models/userModel.js';

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next(new ApiError(401, 'You are not logged in. Please log in to get access.'));
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return next(new ApiError(401, 'The user belonging to this token no longer exists.'));
        }

        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return next(new ApiError(401, 'User recently changed password! Please log in again.'));
        }

        req.user = currentUser;
        next();
    } catch (error) {
        next(error);
    }
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError(403, 'You do not have permission to perform this action.'));
        }
        next();
    };
};