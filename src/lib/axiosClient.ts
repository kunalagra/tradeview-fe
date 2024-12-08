import axios from 'axios';
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import { logoutUser } from './authLib';

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	timeout: 10000, // Optional: Set a request timeout
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.request.use(
	(config) => {
		// Add authorization token
		const token = getCookie('token'); // Get token from cookies

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response && error.response.status === 401) {
			const errorMessage = error.response.data.message;

			if (
				errorMessage &&
				errorMessage === 'Authorization token expired'
			) {
				logoutUser();
			}
		}

		return Promise.reject(error);
	},
);

export default axiosClient;
