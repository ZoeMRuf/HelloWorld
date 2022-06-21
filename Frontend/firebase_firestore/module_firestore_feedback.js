// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import {
    collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtDXXiHIAyEcraPlIcJhxCsWofuetO-pU",
    authDomain: "helloworld-ea756.firebaseapp.com",
    databaseURL: "https://helloworld-ea756-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "helloworld-ea756",
    storageBucket: "helloworld-ea756.appspot.com",
    messagingSenderId: "421368849663",
    appId: "1:421368849663:web:7f6cb76ffde540444258ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Reference to our Database
const collectionReference = collection(db, 'Feedback')


// Get Data from our Database
function getFeedbacks(){
    getDocs(collectionReference)
        .then((snapshot) => {
            let feedbacks = [];
            snapshot.docs.forEach((doc) => {
                feedbacks.push({...doc.data(), id: doc.id})
            });

            console.log(feedbacks);
        })
        .catch(error => {
            console.log(error.message)
        })
}


//Get only one Feedback by ID
function getFeedbackById(id){
    const documentReference = doc(db, 'Feedback', id);
    getDoc(documentReference).then((doc) => {
        console.log(doc.id, doc.data());
    })
}


// Adding a Feedback
function addFeedback(firstTime, primaryReason, foundWhatNeeded, foundCommand, informationAccess, overall, awareness, generalsComments, personalData, id) {
    setDoc(doc(db,'Feedback', id), {
        firstTime: firstTime,
        primaryReason: primaryReason,
        foundWhatNeeded: foundWhatNeeded,
        foundCommand: foundCommand,
        informationAccess: informationAccess,
        overall: overall,
        awareness: awareness,
        generalsComments: generalsComments,
        personalData: personalData
    })
        .then(() => {
            //getFeedbacks();
            //.reset????
        })
}


// DeleteFeedback
function deleteFeedbackById(id){
    const documentReference = doc(db, 'Feedback', id);
    deleteDoc(documentReference).then(() => {
        getFeedbacks();
    })

}

// SaveFeedback in Database
const FeedbackForm = document.querySelector("#FeedbackForm");

FeedbackForm.addEventListener('submit', (event) => {
    event.preventDefault() // -> so page does not refresh

    //Get User Information from Form
    const firstTime = FeedbackForm['first_time_visit'].value;
    const primaryReason = FeedbackForm['first_time_visit_text'].value;
    const foundWhatNeeded = FeedbackForm[''].value;
    const foundCommand = FeedbackForm[''].value;
    const informationAccess = FeedbackForm[''].value;
    const overall = FeedbackForm[''].value;
    const awareness = FeedbackForm[''].value;
    const generalsComments = FeedbackForm[''].value;
    const personalData = FeedbackForm[''].value;

/*
    //Message to User that password and repeatPassword are not identical
    const wrongPassword = document.createElement('p');
    wrongPassword.textContent = "Wrong Password! Passwords must be identical. Pleas try again.";
    wrongPassword.style.color = '#ca2e55';

    CAFieldset.insertBefore(wrongPassword, CAFieldset['password']);

 */

})