// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC14P7M1SHnLB-KyTflMTdmq2ZfotcP5S0",

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


// SignIn
const SignInForm = document.querySelector("#SignIn");

SignInForm.addEventListener('submit', (event) => {
    event.preventDefault() // -> so page does not refresh

    //Get User Information from Form
    const email = SignInForm['SignInEmail'].value;
    const password = SignInForm['SignInPassword'].value;

    signInWithEmailAndPassword(auth, email, password).then(credential => {
        //console.log(credential);
        if (credential.operationType === "signIn"){
            window.location.href = "main.html"
        }

    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        //For Developer to see what's wrong
        console.log(errorCode, errorMessage);

        //For User Message if Sign in is not possible
        const SignInFieldset = document.querySelector("#SignInFieldset");

        if (errorCode === "auth/wrong-password"){

            const wrongPassword = document.createElement('p');
            wrongPassword.textContent = "Wrong Password! Please try again.";
            wrongPassword.style.color = '#ca2e55';

            SignInFieldset.insertBefore(wrongPassword, SignInForm['SignInPassword']);
        }
        else if (errorCode === "auth/user-not-found"){

            const wrongEmail = document.createElement('p');
            wrongEmail.textContent = "E-Mail not found! Please try again.";
            wrongEmail.style.color = '#ca2e55';

            SignInFieldset.insertBefore(wrongEmail, SignInForm['SignInEmail']);
        }
    });
})