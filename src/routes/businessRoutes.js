import express from 'express';
import {
  saveBusinessData,
  deleteBusinessById,
  getBusinessById,
  updateBusinessById,
  getSingleBusinessById,
  getAllBusinesses
  
} from '../controllers/businessController.js';

const router = express.Router();

/**
 * @route POST /api/business
 * @desc Save or update business data
 * @access Public
 */
router.post('/', saveBusinessData);
router.get('/', getAllBusinesses);

/**
 * @route GET /api/business/:userId
 * @desc Get business data by user ID
 * @access Public
 */
router.get('/:userId', getBusinessById);

/**
 * @route DELETE /api/business/:userId
 * @desc Delete business data by user ID
 * @access Public
 */
router.delete('/:userId', deleteBusinessById);

router.put('/:id', updateBusinessById); // Update a single business
router.get('/business/:id', getSingleBusinessById);

export default router;
