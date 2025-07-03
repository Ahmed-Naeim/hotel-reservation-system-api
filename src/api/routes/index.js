import { Router } from 'express';
import authRoute from './authRoute.js';
import userRoute from './userRoute.js';
import hotelRoute from './hotelRoute.js';
import roomRoute from './roomRoute.js';
import bookingRoute from './bookingRoute.js';
import reviewRoute from './reviewRoute.js';

const router = Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/hotels', hotelRoute);
router.use('/rooms', roomRoute);
router.use('/bookings', bookingRoute);
router.use('/reviews', reviewRoute);

export default router;