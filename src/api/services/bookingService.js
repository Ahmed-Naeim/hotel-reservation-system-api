import { Booking } from '../models/bookingModel.js';
import * as factory from '../../utils/handlerFactory.js';
import { ApiError } from '../../utils/ApiError.js';

// For customers to create a booking
export const createBooking = async (req, res, next) => {
    try {
        req.body.user = req.user.id; // Set user from logged-in user
        // Add logic here to calculate total price based on dates and room price
        if (!req.body.totalPrice) {
            return next(new ApiError(400, 'Booking must have a total price.'));
        }
        const newBooking = await Booking.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                booking: newBooking
            }
        });
    } catch (error) {
        next(error);
    }
};

// For customers to see their own bookings
export const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user: req.user.id });
        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: {
                bookings
            }
        });
    } catch (error) {
        next(error);
    }
};

// For managers/admins to see all bookings
export const getAllBookings = factory.getAll(Booking);
export const getBooking = factory.getOne(Booking);
export const updateBooking = factory.updateOne(Booking);
export const deleteBooking = factory.deleteOne(Booking);