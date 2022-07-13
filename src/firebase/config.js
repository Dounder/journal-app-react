import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyBaAU7iaxQJuO0T4rPXa15-qZg3Q4HiACI',
	authDomain: 'journal-react-4e7a0.firebaseapp.com',
	projectId: 'journal-react-4e7a0',
	storageBucket: 'journal-react-4e7a0.appspot.com',
	messagingSenderId: '540856742316',
	appId: '1:540856742316:web:1d17a2729bbd3ad11a0a09',
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
