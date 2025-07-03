import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'confirmed' }
}, { timestamps: true });

// Populate user and room details automatically
bookingSchema.pre(/^find/, function(next) {
    this.populate('user', 'name email').populate('room', 'roomNumber roomType');
    next();
});

export const Booking = mongoose.model('Booking', bookingSchema);