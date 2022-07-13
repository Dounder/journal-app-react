import {
	googleLogin,
	loginWithEmailAndPassword,
	logoutFirebase,
	registerUserWithEmailAndPassword,
} from '../../firebase/provides';
import { clearNotes } from '../journal/journalSlice';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
	return async (dispatch /* getState */) => {
		dispatch(checkingCredentials());
	};
};

export const startGoogleLogin = () => {
	return async (dispatch /* getState */) => {
		dispatch(checkingCredentials());

		const result = await googleLogin();

		if (!result.ok) return dispatch(logout(result.message));

		dispatch(login(result));
	};
};

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
	return async (dispatch /* getState */) => {
		dispatch(checkingCredentials());

		console.log(email, password, displayName);

		const { ok, uid, photoURL, message } = await registerUserWithEmailAndPassword({
			email,
			password,
			displayName,
		});

		if (!ok) return dispatch(logout(message));

		dispatch(login({ uid, photoURL, email, displayName }));
	};
};

export const startLoginUserWithEmailAndPassword = ({ email, password }) => {
	return async (dispatch /* getState */) => {
		dispatch(checkingCredentials());

		const { ok, uid, photoURL, displayName, message } = await loginWithEmailAndPassword({
			email,
			password,
		});

		if (!ok) return dispatch(logout(message));

		dispatch(login({ uid, photoURL, email, displayName }));
	};
};

export const startLogout = () => {
	return async (dispatch /* getState */) => {
		await logoutFirebase();

		dispatch(clearNotes());
		dispatch(logout());
	};
};
