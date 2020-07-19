import React from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
const googleService = process.env.REACT_APP_GOOGLE || '';
const API = process.env.REACT_APP_API || '';
const googleLoginAPI = process.env.REACT_APP_GOOGLE_LOGIN || '';

const Login = () => {
	const onSuccess = async (data) => {
		const { id_token } = data.tokenObj;
		try {
			const login = await axios.post(`${API}/${googleLoginAPI}`, { idToken: id_token });
			console.log(login);
		} catch (error) {
			// console.log(error);
		}
	};
	const onFailure = async (error) => {
		console.log(error);
	};
	return (
		<>
			<GoogleLogin
				clientId = {googleService}
				buttonText="Login"
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}

			/>
		</>
	);
};
export default Login;
