import { Hotel } from '../models/hotelModel.js';
import * as factory from '../../utils/handlerFactory.js';

// Admin/Superadmin services
export const createHotel = factory.createOne(Hotel);
export const updateHotel = factory.updateOne(Hotel);
export const deleteHotel = factory.deleteOne(Hotel);

// Public services
export const getAllHotels = factory.getAll(Hotel);
export const getHotel = factory.getOne(Hotel, { path: 'reviews rooms' });
