import { Router } from 'express';
import { protect, restrictTo } from '../../middlewares/authMiddleware.js';
import * as reviewService from '../services/reviewService.js';

const router = Router({ mergeParams: true });

router.use(protect);

router.route('/')
    .get(reviewService.getAllReviews)
    .post(restrictTo('customer'), reviewService.setHotelAndUserIds, reviewService.createReview);

router.route('/:id')
    .get(reviewService.getReview)
    .patch(restrictTo('customer', 'superadmin'), reviewService.updateReview)
    .delete(restrictTo('customer', 'superadmin'), reviewService.deleteReview);

export default router;