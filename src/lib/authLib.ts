import axiosClient from '@/lib/axiosClient'; // Assuming axiosClient is in lib/axiosClient
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const getToken = () => {
	return getCookie('token'); // Retrieve token from cookies
};

export const setAuthToken = (token: string) => {
	setCookie('token', token, { maxAge: 60 * 60 * 24 * 7 }); // Set token in cookies for 7 days
};

export const removeAuthToken = () => {
	deleteCookie('userProfile');
	deleteCookie('token');
};

export const loginUser = async (email: string, password: string) => {
	try {
		const response = await axiosClient.post('/user/login', {
			email,
			password,
		});

		if (response.status === 200 && response.data.token) {
			setAuthToken(response.data.token); // Store token in cookies
			return response.data.token;
		} else {
			throw new Error('Login failed');
		}
	} catch (error) {
		throw new Error('Login failed');
	}
};

export const isLoggedIn = () => {
	console.log(getToken());
	return !!getToken(); // Check if token exists in cookies
};

export const logoutUser = () => {
	removeAuthToken(); // Remove token from cookies
	// Redirect to login page
	window.location.href = '/login';
};
