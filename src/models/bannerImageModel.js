// models/BannerImage.js
import mongoose from 'mongoose';

const bannerImageSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        unique: true // Ensure only one entry per page
    },
    images: [
        {
            imagePath: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const BannerImage = mongoose.model('BannerImage', bannerImageSchema);

export default BannerImage;
