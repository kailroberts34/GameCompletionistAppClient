import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not defined in environment variables');
}

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;