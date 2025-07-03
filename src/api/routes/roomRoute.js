import { Router } from 'express';
import { protect, restrictTo } from '../../middlewares/authMiddleware.js';
import * as roomService from '../services/roomService.js';

// mergeParams allows us to access params from parent routers (e.g., :hotelId)
const router = Router({ mergeParams: true });

router.use(protect);

router.route('/')
    .get(roomService.getAllRooms)
    .post(restrictTo('manager', 'superadmin'), roomService.setHotelId, roomService.createRoom);

router.route('/:id')
    .get(roomService.getRoom)
    .patch(restrictTo('manager', 'superadmin'), roomService.updateRoom)
    .delete(restrictTo('manager', 'superadmin'), roomService.deleteRoom);

export default router;