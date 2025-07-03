import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    review: { type: String, required: [true, 'Review can not be empty!'] },
    rating: { type: Number, min: 1, max: 5, required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Prevent duplicate reviews from the same user on the same hotel
reviewSchema.index({ hotel: 1, user: 1 }, { unique: true });

// Populate user details automatically
reviewSchema.pre(/^find/, function(next) {
    this.populate('user', 'name');
    next();
});

export const Review = mongoose.model('Review', reviewSchema);