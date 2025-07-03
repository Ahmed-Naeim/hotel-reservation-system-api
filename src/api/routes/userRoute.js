import { Router } from 'express';
import { protect, restrictTo } from '../../middlewares/authMiddleware.js';
import { getAllUsers, getUser, updateUser, deleteUser, getMe } from '../services/userService.js';

const router = Router();

// All routes after this middleware are protected
router.use(protect);

router.get('/me', getMe, getUser);
// router.patch('/updateMyPassword', updatePassword); // To be implemented in auth.service
// router.patch('/updateMe', updateMe); // To be implemented in user.service

// All routes after this are restricted to admins
router.use(restrictTo('superadmin'));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;