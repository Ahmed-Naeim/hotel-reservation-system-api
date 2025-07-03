import { Review } from '../models/reviewModel.js';
import * as factory from '../../utils/handlerFactory.js';

// Middleware to set IDs for creating a review
export const setHotelAndUserIds = (req, res, next) => {
    if (!req.body.hotel) req.body.hotel = req.params.hotelId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

export const getAllReviews = factory.getAll(Review);
export const getReview = factory.getOne(Review);
export const createReview = factory.createOne(Review);
export const updateReview = factory.updateOne(Review);
export const deleteReview = factory.deleteOne(Review);