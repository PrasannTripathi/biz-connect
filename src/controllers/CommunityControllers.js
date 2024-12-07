import Community from '../models/CommunityModel.js'; // Adjust the path as per your structure
import { validationResult } from 'express-validator';
import { User } from '../models/userModel.js';

// Create a new community
export const createCommunity = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {
            communityName,
            email,
            contact,
            designation,
            AssignId,
            description,
            image,
            creator,
            approved
        } = req.body;

        // Check if a user with the provided email already exists
        let existingUser = await User.findOne({ email });
        if (!existingUser) {
            // Create a new user for the community member
            const password = "Default@123"; // Generate or use a default password
            existingUser = new User({
                email,
                fullName: communityName,
                mobile: contact,
                role: "member",
                password, // Hashing will be handled by the pre-save hook in the User model
            });
            await existingUser.save();
        }

        // Create the community entry
        const newCommunity = new Community({
            communityName,
            email,
            contact,
            designation,
            AssignId,
            description,
            image,
            creator,
            approved,
            user: existingUser._id, // Link the user to the community
        });

        const savedCommunity = await newCommunity.save();
        res.status(201).json(savedCommunity);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Get all communities
export const getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find().populate('creator', 'name email');
        res.status(200).json({communities:communities,message:'all communities fetched successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Get a single community by ID
export const getCommunityById = async (req, res) => {
    try {
        const community = await Community.findById(req.params.id).populate('creator', 'name email');
        if (!community) {
            return res.status(404).json({ message: 'Community not found' });
        }
        res.status(200).json(community);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Update a community
export const updateCommunity = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedCommunity = await Community.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCommunity) {
            return res.status(404).json({ message: 'Community not found' });
        }

        res.status(200).json(updatedCommunity);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Delete a community
export const deleteCommunity = async (req, res) => {
    try {
        const deletedCommunity = await Community.findByIdAndDelete(req.params.id);
        if (!deletedCommunity) {
            return res.status(404).json({ message: 'Community not found' });
        }
        res.status(200).json({ message: 'Community deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const getUnapprovedCommunities = async (req, res) => {
    try {
        // Find all communities where `approved` is false
        const unapprovedCommunities = await Community.find({ approved: "pending" })
            .populate("creator", "email fullName") // Populate creator info if needed
            .populate("user", "email fullName"); // Populate user info if needed

        res.status(200).json({
            success: true,
            count: unapprovedCommunities.length,
            data: unapprovedCommunities,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

export const updateApprovalStatus = async (req, res) => {
    const { id } = req.params; // Community ID from URL params
    const { approved } = req.body; // New approval status from request body

    try {
        // Check if the community exists
        const community = await Community.findById(id);
        if (!community) {
            return res.status(404).json({
                success: false,
                message: "Community not found",
            });
        }

        // Update the approval status
        community.approved = approved;
        const updatedCommunity = await community.save();

        res.status(200).json({
            success: true,
            message: `Community ${approved ? "approved" : "disapproved"} successfully`,
            data: updatedCommunity,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
};