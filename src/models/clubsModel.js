import mongoose from 'mongoose';

const ClubSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    clubName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    chapter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chapter'
    },
    president:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Community'
    },
    vicePresident:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Community'
    },
    contactPresiden: {
        type: String,
        required: true,
    },
    contactVicePresident:{
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

const Club = mongoose.model('Club', ClubSchema);

export default Club;
