// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, deleteDoc, doc, onSnapshot, getDoc
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
const collectionReference = collection(db, 'Maps')


// Get Data from our Database
function getMaps(){
    getDocs(collectionReference).then((snapshot) => {
        let maps = [];
        snapshot.docs.forEach((doc) => {
            maps.push({...doc.data(), id: doc.id})
        });

        const res = JSON.stringify(maps);
        console.log(maps);
        return res

    })
     .catch(error => {
            console.log(error.message)
     })
}


//Get only one Map by ID
function getMapById(id){
    const documentReference = doc(db, 'Maps', id);
    getDoc(documentReference).then((doc) => {
        console.log(doc.id, doc.data());
    })
}


// Adding a Map
function addMap(title, author, id) {
    setDoc(doc(db,'Maps', id), {
        title: title,
        author: author
    })
    .then(() => {
        getMaps();
        //.reset????
    })
}


// DeleteMap
function deleteMapById(id){
    const documentReference = doc(db, 'Maps', id);
    deleteDoc(documentReference).then(() => {
            getMaps();
        //something
    })

}


//realTimeListener for later
onSnapshot(collectionReference, (snapshot) => {
    let maps = [];
    snapshot.docs.forEach((doc) => {
        maps.push({...doc.data(), id: doc.id})
    });
    console.log(maps);
})

getMapById("01");


