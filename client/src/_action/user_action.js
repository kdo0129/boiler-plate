import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export const loginUser = (dataToSubmit) => {
	const request = axios
		.post('/api/users/login', dataToSubmit)
		.then((response) => response.data);
	return {
		type: LOGIN_USER,
		payload: request,
	};
};

export const registerUser = (dataToSubmit) => {
	const request = axios
		.post('/api/users/register', dataToSubmit)
		.then((res) => res.data);
	return {
		type: REGISTER_USER,
		payload: request,
	};
};

export const auth = (dataToSubmit) => {
	const request = axios
		.get(`/api/users/auth`, dataToSubmit)
		.then((res) => res.data);

	return {
		type: AUTH_USER,
		payload: request,
	};
};
