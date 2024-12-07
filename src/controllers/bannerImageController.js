// controllers/BannerImageController.js
import BannerImage from '../models/bannerImageModel.js';
import fs from 'fs';
import path from 'path';

export const uploadBanner = async (req, res) => {
    const { page } = req.body;

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image file is required.' });
    }

    try {
        const existingBanner = await BannerImage.findOne({ page });

        // Delete old images if updating
        if (existingBanner) {
            existingBanner.images.forEach((image) => fs.unlinkSync(image.imagePath));
            existingBanner.images = req.files.map((file) => ({ imagePath: file.path }));
            await existingBanner.save();
            return res.status(200).json({ message: 'Banner images updated successfully.' });
        }

        // Create new banner entry
        const banner = new BannerImage({
            page,
            images: req.files.map((file) => ({ imagePath: file.path }))
        });
        await banner.save();

        res.status(201).json({ message: 'Banner images uploaded successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

export const getAllBannerImage = async (req, res) => {
   

    try {
        const banner = await BannerImage.find({  });

        if (!banner) {
            return res.status(404).json({ message: 'Banner images not found for this page.' });
        }

        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

export const getBanner = async (req, res) => {
    const { page } = req.params;

    try {
        const banner = await BannerImage.findOne({ page });

        if (!banner) {
            return res.status(404).json({ message: 'Banner images not found for this page.' });
        }

        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

export const deleteBanner = async (req, res) => {
    const { page } = req.params;

    try {
        const banner = await BannerImage.findOneAndDelete({ page });

        if (!banner) {
            return res.status(404).json({ message: 'Banner images not found.' });
        }

        // Delete all image files
        banner.images.forEach((image) => fs.unlinkSync(image.imagePath));

        res.status(200).json({ message: 'Banner images deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error });
    }
};
