import express from 'express';
import { 
    createReel, 
    getAllReels, 
    getReelById, 
    updateReel, 
    deleteReel, 
    updateReelFeedback
} from '../controllers/BizReelsControllers.js';

const router = express.Router();

// Remove multer upload middleware since we're not handling file uploads
router.post('/', createReel);
router.post('/like-or-dislike', updateReelFeedback);
router.get('/', getAllReels);
router.get('/:id', getReelById);
router.put('/:id', updateReel);
router.delete('/:id', deleteReel);
  
export default router;