// axios instance
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
    timeout: 10000,   // 10sec
});

// Add a response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle different types of errors
        if (error.response) {
            // Server responded with a status code outside of 2xx
            console.error('Response error:', error.response.data);
            // You can handle specific status codes here
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized access');
                    break;
                case 404:
                    console.error('Resource not found');
                    break;
                case 500:
                    console.error('Server error');
                    break;
                default:
                    console.error(`Error with status code: ${error.response.status}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network error - no response received:', error.request);
        } else {
            // Error in setting up the request
            console.error('Request error:', error.message);
        }

        // You can also dispatch to a global state manager here if needed
        
        // Return the rejected promise to let the calling code handle it as well
        return Promise.reject({
            message: error.response?.data?.message || error.message || "unknown",
            status: error.response?.status,
            data: error.response?.data
        });
    }
);

export default axiosInstance;