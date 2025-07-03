import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true },
    city: { type: String, required: true, index: true },
    address: { type: String, required: true },
    amenities: [String],
    bannerImage: { type: String, required: true },
    images: [String],
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'A hotel must have a manager.']
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual populate for rooms and reviews
hotelSchema.virtual('rooms', {
    ref: 'Room',
    foreignField: 'hotel',
    localField: '_id'
});

hotelSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'hotel',
    localField: '_id'
});

export const Hotel = mongoose.model('Hotel', hotelSchema);