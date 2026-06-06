// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBC6IV7SVSl0kbfjcL-jR3_Tf3hqqp3ebI",
//   authDomain: "recetas-pps.firebaseapp.com",
//   projectId: "recetas-pps",
//   storageBucket: "recetas-pps.firebasestorage.app",
//   messagingSenderId: "717636578380",
//   appId: "1:717636578380:web:0c1909bde2a8a8d9a098e9",
//   measurementId: "G-8V2CJ16364"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Firebase config
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBC6IV7SVSl0kbfjcL-jR3_Tf3hqqp3ebI',
    authDomain: 'recetas-pps.firebaseapp.com',
    projectId: 'recetas-pps',
    storageBucket: 'recetas-pps.firebasestorage.app',
    messagingSenderId: '717636578380',
    appId: '1:717636578380:web:0c1909bde2a8a8d9a098e9',
    measurementId: 'G-8V2CJ16364',
  },
};
