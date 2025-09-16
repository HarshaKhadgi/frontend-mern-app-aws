import {initializeApp} from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyAkfHADHtwTynfu5xSVkQOPV_r30vCFC5o",
    authDomain: "fir-tutorial-2c5ad.firebaseapp.com",
    projectId: "fir-tutorial-2c5ad",
    storageBucket: "fir-tutorial-2c5ad.firebasestorage.app",
    messagingSenderId: "358811015235",
    appId: "1:358811015235:web:70098b0a629d00c53a1cf6",
    measurementId: "G-4PQWGFX5DT",
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  export const db = getFirestore(app)