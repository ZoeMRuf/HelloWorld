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

class DatabaseAccess{
    // Get Data from our Database
    getMaps(req,res){
        getDocs(collectionReference)
            .then((snapshot) => {
                res.send(JSON.stringify({
                    id: snapshot.docs.id,
                    data: snapshot.docs.data
                }));
            })
            .catch(error => {
                console.log(error.message)
            })
    }


//Get only one Map by ID
    getMapById(req, res){
        const id = req.params.id;
        const documentReference = doc(db, 'Maps', id);
        getDoc(documentReference).then((doc) => {
            res.send(JSON.stringify({
                id: doc.id,
                data: doc.data
            }));
        })
    }


// Adding a Map
/ Adding a Map
    addMap(title, creator, creationDate, pathToImage, height, description, graticule, distortion, usage, limitations, id) {
        setDoc(doc(db,'Maps', id), {
            title: title,
            creator: creator,
            creationDate: creationDate,
            Image: {
                path: pathToImage,
                height: height
            },
            infoText: {
                description: description,
                graticule: graticule,
                distortion: distortion,
                usage: usage,
                limitations: limitations
            }
        })
        .then(() => {
            console.log("MapAdded")
        })
    }


// DeleteMap
    deleteMapById(req, res){
        const id = req.params.id;
        const documentReference = doc(db, 'Maps', id);
        deleteDoc(documentReference).then(() => {
            res.send(200).send("Map was deleted");
        })
            .catch(error => {
            res.send(404).send(error.message);
        })

    }


}

/*
//realTimeListener for later
onSnapshot(collectionReference, (snapshot) => {
    let maps = [];
    snapshot.docs.forEach((doc) => {
        maps.push({...doc.data(), id: doc.id})
    });
    console.log(maps);
})

 */



