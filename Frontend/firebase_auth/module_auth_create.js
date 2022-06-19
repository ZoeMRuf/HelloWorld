// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateEmail, sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtDXXiHIAyEcraPlIcJhxCsWofuetO-pU",
    authDomain: "helloworld-ea756.firebaseapp.com",
    projectId: "helloworld-ea756",
    storageBucket: "helloworld-ea756.appspot.com",
    messagingSenderId: "421368849663",
    appId: "1:421368849663:web:7f6cb76ffde540444258ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const user = auth.currentUser;


// CreateAccount
const CreateAccountForm = document.querySelector("#CreateAccount");
const CAFieldsetPassword = document.querySelector("#createAccountFieldset-password");

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

            /* Does send email to Span ACHTUNG
            sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("send email");
                console.log(credential.user);
            });

             */

            //Works but don't know if useful
            //credential.displayName = "ZoeMRuf";

            //Go to main Backend
            window.location.href = "main.html";

        })
        .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
        });
    }
    else {
        //Message to User that password and repeatPassword are not identical
        const wrongPassword = document.createElement('p');
        wrongPassword.textContent = "Wrong Password! Passwords must be identical. Pleas try again.";
        wrongPassword.style.color = '#ca2e55';

        CAFieldsetPassword.insertBefore(wrongPassword, CAFieldsetPassword['password']);
    }
})

// und daten von accout sollen auf firebase gespeichert werden

