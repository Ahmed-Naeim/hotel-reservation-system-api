import { Router } from 'express';
import { protect, restrictTo } from '../../middlewares/authMiddleware.js';
import { getAllHotels, getHotel, createHotel, updateHotel, deleteHotel } from '../services/hotelService.js';
import roomRouter from './roomRoute.js';
import reviewRouter from './reviewRoute.js';

const router = Router();

// Nested routes for rooms and reviews
router.use('/:hotelId/rooms', roomRouter);
router.use('/:hotelId/reviews', reviewRouter);

router.route('/')
    .get(getAllHotels)
    .post(protect, restrictTo('superadmin'), createHotel);

router.route('/:id')
    .get(getHotel)
    .patch(protect, restrictTo('superadmin', 'manager'), updateHotel)
    .delete(protect, restrictTo('superadmin'), deleteHotel);

export default router;