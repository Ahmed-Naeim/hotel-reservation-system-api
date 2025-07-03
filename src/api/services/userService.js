import { User } from '../models/userModel.js';
import * as factory from '../../utils/handlerFactory.js';

// These are for admins
export const getAllUsers = factory.getAll(User);
export const getUser = factory.getOne(User);
export const updateUser = factory.updateOne(User); // Do NOT use to update passwords
export const deleteUser = factory.deleteOne(User);

// For logged-in users to manage their own profile
export const getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
};