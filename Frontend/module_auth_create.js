// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

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


// CreateAccount

const CreateAccountForm = document.querySelector("#CreateAccount");

CreateAccountForm.addEventListener('submit', (event) => {
    event.preventDefault() // -> so page does not refresh

    //Get User Information from Form
    const email = CreateAccountForm['email'].value;
    const password = CreateAccountForm['password'].value;

    //Test if eventListener works
    console.log(email, password);

    createUserWithEmailAndPassword(auth, email, password).then(credential => {

        console.log(credential.user);


        //Go to main Backend
        window.location.href = "main.html";
    })
})

// und daten von accout sollen auf firebase gespeichert werden



