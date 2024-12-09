import mongoose from 'mongoose';

const ReelSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    thumbnailUrl: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500 // Optional: add a max length for description
    },
    like:{
        type: Number,
        default: 0
    },
    dislike:{
        type: Number,
        default: 0
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Adjust this to match your User model name
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Reel = mongoose.model('Reel', ReelSchema);

export default Reel;