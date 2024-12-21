import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
    cloud_name: "dnzqoglrs",
    api_key: "242552266216188",
    api_secret: "dJoHVyKmY-lQg9247Jy-w4u7vrc"
});

/**
 * Upload a base64 string directly to Cloudinary
 * @param {string} base64String - The base64 string to upload
 * @returns {Promise<object|null>} - The Cloudinary upload response or null if an error occurs
 */
const uploadOnCloudinary = async (base64String) => {
    try {
        if (!base64String) {
            throw new Error('Base64 string is missing');
        }

        // Check if the base64 string starts with a valid data URL format
        const regex = /^data:image\/(png|jpeg|jpg);base64,/;
        if (!regex.test(base64String)) {
            throw new Error('Invalid base64 string. Ensure the string includes the correct data URL prefix.');
        }

        // Simple upload without additional parameters
        const response = await cloudinary.uploader.upload(base64String, {
            // Optional settings for optimization
            overwrite: true,
            invalidate: true,
            width: 810,
            height: 456,
            crop: "fill",
        });

        console.log('Upload successful:', {
            url: response.url,
            public_id: response.public_id
        });

        return response;

    } catch (error) {
        console.error('Cloudinary Error:', {
            message: error.message || 'Unknown error',
            name: error.name,
            status: error.http_code || 'N/A'
        });
        throw error;
    }
};

export { uploadOnCloudinary };