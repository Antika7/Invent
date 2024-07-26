import axios from 'axios';

// Define your base URL here
const BASE_URL = 'https://your-backend-url.com';

// Create an instance of axios with default configurations
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

// Function to upload images
export const uploadImages = async (images) => {
    const formData = new FormData();
    images.forEach((image) => {
        formData.append('images', image.file);
    });

    try {
        const response = await apiClient.post('/upload', formData);
        return response.data;
    } catch (error) {
        console.error('Error uploading images:', error);
        throw error;
    }
};
