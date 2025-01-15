/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDvcrzaRro60K-TcgskcWbycp0bIqjoQFc",
    authDomain: "mascercatuyo-c5f52.firebaseapp.com",
    projectId: "mascercatuyo-c5f52",
    storageBucket: "mascercatuyo-c5f52.firebasestorage.app",
    messagingSenderId: "141732274438",
    appId: "1:141732274438:web:51e24c8af63f7b8d6ffe87",
    measurementId: "G-9DWM7LRTLP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);