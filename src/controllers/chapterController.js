import Chapter from '../models/chaptersModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

// Get all chapters
export const getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find({})
            .populate('president', 'communityName email contact designation image') // Populates president details
            .populate('vicePresident', 'communityName email contact designation image'); // Populates vicePresident details

        res.status(200).json(chapters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get chapter by ID
export const getChapterById = async (req, res) => {
    const { id } = req.params;
    try {
        const chapter = await Chapter.findById(id)
            .populate('president')
            .populate('vicePresident')
            .populate('creator');
        if (!chapter) return res.status(404).json({ error: "Chapter not found" });
        res.status(200).json(chapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new chapter

export const createChapter = async (req, res) => {
    const {
        chapterName,
        Name,
        location,
        clubs,
        president,
        vicePresident,
        contactPresiden,
        contactVicePresident,
        creator,
        image, // Expects base64 image data
    } = req.body;

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

        // Create a new chapter
        const newChapter = new Chapter({
            chapterName,
            Name,
            location,
            clubs,
            president,
            vicePresident,
            contactPresiden,
            contactVicePresident,
            creator,
            image: imageUrl,
        });

        const savedChapter = await newChapter.save();
        res.status(201).json(savedChapter);
    } catch (error) {
        console.error('Error creating chapter:', error);
        res.status(500).json({ error: error.message });
    }
};

export const updateChapter = async (req, res) => {
    const { id } = req.params;
    const updates = { ...req.body };

    try {
        // If a new image is provided, upload it to Cloudinary
        if (updates.image) {
            const uploadResponse = await uploadOnCloudinary(updates.image);
            if (!uploadResponse) {
                return res.status(400).json({ error: "Failed to upload image" });
            }
            updates.image = uploadResponse.url;
        }

        // Update the chapter
        const updatedChapter = await Chapter.findByIdAndUpdate(
            id, 
            updates, 
            { new: true, runValidators: true }
        );

        if (!updatedChapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        res.status(200).json(updatedChapter);
    } catch (error) {
        console.error('Error updating chapter:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a chapter
export const deleteChapter = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedChapter = await Chapter.findByIdAndDelete(id);
        if (!deletedChapter) return res.status(404).json({ error: "Chapter not found" });
        res.status(200).json({ message: "Chapter deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
