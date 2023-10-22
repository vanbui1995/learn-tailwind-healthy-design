import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, Persistence, setPersistence, browserSessionPersistence } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyD2AL3qaUM6PCARLU1p2651O0g50ElaOa8',
  authDomain: 'funny-movies-33dc0.firebaseapp.com',
  projectId: 'funny-movies-33dc0',
  storageBucket: 'funny-movies-33dc0.appspot.com',
  messagingSenderId: '216243594074',
  appId: '1:216243594074:web:fb28422f3bcf10a81a8963',
  measurementId: 'G-E2YTG1LVPJ',
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


