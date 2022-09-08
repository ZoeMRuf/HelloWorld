// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, deleteUser} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {apiKey: "AIzaSyC14P7M1SHnLB-KyTflMTdmq2ZfotcP5S0",

    authDomain: "helloworldnachpr.firebaseapp.com",

    projectId: "helloworldnachpr",

    storageBucket: "helloworldnachpr.appspot.com",

    messagingSenderId: "272296957922",

    appId: "1:272296957922:web:ade80cde4d53a7c2198bbb",

    measurementId: "G-J7YSJM4SNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


//Delete User
const DeleteButton = document.querySelector("#Delete");

DeleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    deleteUser(auth.currentUser).then(() => {
        //Go back to Home Page.
        window.location.href = "home.html";
    }).catch((error) => {
        // An error happened.
        console.log(error.code, error.message);
    });
})