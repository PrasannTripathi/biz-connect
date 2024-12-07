// routes/bannerRoutes.js
import express from 'express';
import multer from 'multer';
import { uploadBanner, getBanner, deleteBanner, getAllBannerImage } from '../controllers/bannerImageController.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/banners'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

// Routes
router.post('/upload', upload.array('images', 10), uploadBanner); // Allows up to 10 images
router.get('/:page', getBanner);
router.get('/', getAllBannerImage);
router.delete('/:page', deleteBanner);

export default router;
