import mongoose from 'mongoose';

const ChapterSchema = new mongoose.Schema({
    chapterName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    president: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },
    vicePresident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },
    contactPresiden: {
        type: String,
        required: true,
    },
    contactVicePresident: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    image: {
        type: String,
        default: "/uploads/placeholder.png",
    },
}, { timestamps: true });

const Chapter = mongoose.model('Chapter', ChapterSchema);

export default Chapter;
