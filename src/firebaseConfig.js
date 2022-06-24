import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDkHPDJDNJN67QwfXkUAD_0UCNp5lYKowE",
  authDomain: "to-do-app-2c403.firebaseapp.com",
  projectId: "to-do-app-2c403",
  storageBucket: "to-do-app-2c403.appspot.com",
  messagingSenderId: "221061957942",
  appId: "1:221061957942:web:93d3c34d255e8d34edcb97",
  measurementId: "G-ZWPBF8J122",
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
