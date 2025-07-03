import { Router } from 'express';
import { protect, restrictTo } from '../../middlewares/authMiddleware.js';
import * as bookingService from '../services/bookingService.js';

const router = Router();

router.use(protect);

router.post('/', restrictTo('customer'), bookingService.createBooking);
router.get('/my-bookings', restrictTo('customer'), bookingService.getMyBookings);

// Routes for admins/managers
router.use(restrictTo('manager', 'superadmin'));

router.route('/')
    .get(bookingService.getAllBookings);

router.route('/:id')
    .get(bookingService.getBooking)
    .patch(bookingService.updateBooking)
    .delete(bookingService.deleteBooking);

export default router;