import Club from '../models/clubsModel.js';

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
            image,
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
    const updates = req.body;
    try {
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
