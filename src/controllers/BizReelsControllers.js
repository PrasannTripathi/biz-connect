import Reel from "../models/ReelsModel.js";

// Create a new Reel
export const createReel = async (req, res) => {
    const { description, creator, videoUrl, thumbnailUrl } = req.body;

    // Validate required fields
    if (!videoUrl) {
        return res.status(400).json({ message: "Video URL is required" });
    }

    try {
        const reel = new Reel({ 
            url: videoUrl, 
            thumbnailUrl, 
            description, 
            creator 
        });
        await reel.save();
        res.status(201).json({ message: "Reel created successfully", reel });
    } catch (error) {
        res.status(500).json({ message: "Failed to create reel", error: error.message });
    }
};

export const updateReelFeedback = async (req, res) => {
    try {
        const { reelId } = req.params; // Reel ID from request parameters
        const { action } = req.body; // Action ('like' or 'dislike') from request body

        // Validate action
        if (!['like', 'dislike'].includes(action)) {
            return res.status(400).json({ error: 'Invalid action. Use "like" or "dislike".' });
        }

        // Find the reel by ID
        const reel = await Reel.findById(reelId);
        if (!reel) {
            return res.status(404).json({ error: 'Reel not found.' });
        }

        // Update the like or dislike count based on the action
        if (action === 'like') {
            reel.like += 1;
        } else if (action === 'dislike') {
            reel.dislike += 1;
        }

        // Save the updated reel
        await reel.save();

        return res.status(200).json({ message: `Reel ${action}d successfully.`, reel });
    } catch (error) {
        console.error('Error updating reel feedback:', error);
        return res.status(500).json({ error: 'An error occurred while updating reel feedback.' });
    }
};

// Fetch all Reels
export const getAllReels = async (req, res) => {
    try {
        const reels = await Reel.find().populate("creator", "username email"); // Assuming Admin model has name and email
        res.status(200).json(reels);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reels", error: error.message });
    }
};

// Fetch a Reel by ID
export const getReelById = async (req, res) => {
    const { id } = req.params;

    try {
        const reel = await Reel.findById(id).populate("creator", "name email");
        if (!reel) {
            return res.status(404).json({ message: "Reel not found" });
        }
        res.status(200).json(reel);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch reel", error: error.message });
    }
};

// Update a Reel
export const updateReel = async (req, res) => {
    const { id } = req.params;
    const { description, videoUrl, thumbnailUrl } = req.body;

    try {
        const reel = await Reel.findByIdAndUpdate(
            id, 
            { 
                url: videoUrl, 
                thumbnailUrl, 
                description 
            }, 
            { new: true }
        );

        if (!reel) {
            return res.status(404).json({ message: "Reel not found" });
        }

        res.status(200).json({ message: "Reel updated successfully", reel });
    } catch (error) {
        res.status(500).json({ message: "Failed to update reel", error: error.message });
    }
};

// Delete a Reel
export const deleteReel = async (req, res) => {
    const { id } = req.params;

    try {
        const reel = await Reel.findByIdAndDelete(id);
        if (!reel) {
            return res.status(404).json({ message: "Reel not found" });
        }
        res.status(200).json({ message: "Reel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete reel", error: error.message });
    }
};