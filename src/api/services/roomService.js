import { Room } from '../models/roomModel.js';
import * as factory from '../../utils/handlerFactory.js';
import { ApiError } from '../../utils/ApiError.js';

// Middleware to set hotel ID from params or user
export const setHotelId = (req, res, next) => {
    // Allow nested routes
    if (!req.body.hotel) {
        if (req.params.hotelId) {
            req.body.hotel = req.params.hotelId;
        } else if (req.user.role === 'manager' && req.user.managedHotel) {
            req.body.hotel = req.user.managedHotel;
        } else {
            return next(new ApiError(400, 'A room must be associated with a hotel.'));
        }
    }
    next();
};

export const createRoom = factory.createOne(Room);
export const getRoom = factory.getOne(Room);
export const getAllRooms = factory.getAll(Room);
export const updateRoom = factory.updateOne(Room);
export const deleteRoom = factory.deleteOne(Room);