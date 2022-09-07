// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

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


// CreateAccount
const CreateAccountForm = document.querySelector("#CreateAccount");
const CAFieldset = document.querySelector("#createAccountFieldset");

CreateAccountForm.addEventListener('submit', (event) => {
    event.preventDefault() // -> so page does not refresh

    //Get User Information from Form
    const email = CreateAccountForm['email'].value;
    const password = CreateAccountForm['password'].value;
    const repeatPassword = CreateAccountForm['repeatPassword'].value;

    //check if password and repeatPassword are the same
    if (password === repeatPassword){
        // only now create account
        createUserWithEmailAndPassword(auth, email, password).then(credential => {

            //Go to main Backend
            window.location.href = "main.html";

        })
        .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode, errorMessage);
        });
    }
    else {
        //Message to User that password and repeatPassword are not identical
        const wrongPassword = document.createElement('p');
        wrongPassword.textContent = "Wrong Password! Passwords must be identical. Pleas try again.";
        wrongPassword.style.color = '#ca2e55';

        CAFieldset.insertBefore(wrongPassword, CAFieldset['password']);
    }
})



