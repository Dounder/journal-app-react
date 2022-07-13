import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';

import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const googleLogin = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		const { displayName, email, photoURL, uid } = result.user;

		return { ok: true, displayName, email, photoURL, uid };
	} catch (error) {
		return { ok: false, code: error.error, message: error.message };
	}
};

export const registerUserWithEmailAndPassword = async ({ email, password, displayName }) => {
	try {
		const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);

		const { uid, photoURL } = resp.user;

		await updateProfile(FirebaseAuth.currentUser, { displayName });

		return { ok: true, uid, photoURL, email, displayName };
	} catch (error) {
		return { ok: false, code: error.error, message: error.message };
	}
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
	try {
		const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);

		const { uid, photoURL, displayName } = resp.user;

		return { ok: true, uid, photoURL, email, displayName };
	} catch (error) {
		return { ok: false, code: error.error, message: error.message };
	}
};

export const logoutFirebase = async () => {
	return await FirebaseAuth.signOut();
};
