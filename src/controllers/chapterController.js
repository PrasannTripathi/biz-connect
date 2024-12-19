import Chapter from '../models/chaptersModel.js';

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
    const { chapterName, Name, location,clubs, president, vicePresident, contactPresiden, contactVicePresident, creator, image } = req.body;
    try {
        const newChapter = new Chapter({
            chapterName,
            Name,
            location,
            president,
            vicePresident,
            contactPresiden,
            contactVicePresident,
            creator,
            image,
            clubs
        });
        const savedChapter = await newChapter.save();
        res.status(201).json(savedChapter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a chapter
export const updateChapter = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedChapter = await Chapter.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedChapter) return res.status(404).json({ error: "Chapter not found" });
        res.status(200).json(updatedChapter);
    } catch (error) {
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
