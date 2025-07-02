import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    roomNumber: { type: String, required: true },
    roomType: { type: String, required: true, enum: ['Single', 'Double', 'Suite', 'Deluxe'] },
    pricePerNight: { type: Number, required: [true, 'A room must have a price.'] },
    capacity: { type: Number, required: true },
    amenities: [String],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: [true, 'A room must belong to a hotel.']
    }
}, { timestamps: true });

// Ensure a room number is unique within a single hotel
roomSchema.index({ hotel: 1, roomNumber: 1 }, { unique: true });

export const Room = mongoose.model('Room', roomSchema);