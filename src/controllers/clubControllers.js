import Club from '../models/clubsModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Get all clubs
export const getAllClubs = async (req, res) => {
    try {
        const clubs = await Club.find()
            .populate('chapter')
            .populate('president', 'communityName email contact designation image') // Populates president details
            .populate('vicePresident', 'communityName email contact designation image');
        res.status(200).json(clubs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get club by ID
export const getClubById = async (req, res) => {
    const { id } = req.params;
    try {
        const club = await Club.findById(id)
            .populate('chapter')
            .populate('president')
            .populate('vicePresident')
            .populate('creator');
        console.log(club)
        if (!club) return res.status(404).json({ error: "Club not found" });
        res.status(200).json(club);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new club
export const createClub = async (req, res) => {
    const { Name, clubName, location, chapter, president, vicePresident, contactPresiden, contactVicePresident, creator, image } = req.body;
    try {
        let imageUrl = null;

        // Upload the image to Cloudinary if provided
        if (image) {
            const uploadResponse = await uploadOnCloudinary(image);
            if (!uploadResponse) {
                return res.status(400).json({ error: "Failed to upload image" });
            }
            imageUrl = uploadResponse.url;
        }
        const newClub = new Club({
            Name,
            clubName,
            location,
            chapter,
            president,
            vicePresident,
            contactPresiden,
            contactVicePresident,
            creator,
            image:imageUrl,
        });
        const savedClub = await newClub.save();
        res.status(201).json(savedClub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a club
export const updateClub = async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };
    try {
        if (updates.image) {
            const uploadResponse = await uploadOnCloudinary(updates.image);
            if (!uploadResponse) {
                return res.status(400).json({ error: "Failed to upload image" }); 
            }
            updates.image = uploadResponse.url;
        }
        const updatedClub = await Club.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedClub) return res.status(404).json({ error: "Club not found" });
        res.status(200).json(updatedClub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a club
export const deleteClub = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClub = await Club.findByIdAndDelete(id);
        if (!deletedClub) return res.status(404).json({ error: "Club not found" });
        res.status(200).json({ message: "Club deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
