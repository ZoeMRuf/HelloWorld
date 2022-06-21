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
const collectionReference = collection(db, 'Maps')

class MapFunctions {
    // Get Data from our Database
    getMaps(req,res){
        getDocs(collectionReference)
            .then((snapshot) => {

                res.send(JSON.stringify({
                    id: snapshot.docs.id,
                    data: snapshot.docs.data
                }));

                /*
                let maps = [];
                snapshot.docs.forEach((doc) => {
                    maps.push({...doc.data(), id: doc.id})
                });

                console.log(maps);

                 */
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
    addMap(title, creator, creationDate, pathToImage, description, graticule, distortion, usage, limitations, id) {
        setDoc(doc(db,'Maps', id), {
            title: title,
            creator: creator,
            creationDate: creationDate,
            pathToImage: pathToImage,
            infoText: {
                description: description,
                graticule: graticule,
                distortion: distortion,
                usage: usage,
                limitations: limitations
            }
        })
            .then(() => {
                getMaps();
                //.reset????
            })
    }


// DeleteMap
    deleteMapById(id){
        const documentReference = doc(db, 'Maps', id);
        deleteDoc(documentReference).then(() => {
            getMaps();
            //something
        })

    }

}

module.exports = new MapFunctions();




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

/*
addMap("Aitoff Projection",
    "David A. Aitoff",
    "1889",
    "/map-images",
    "The Aitoff projection is a modified azimuthal projection. It is a compromise projection whose graticule takes the form of an ellipse. " +
    "This projection is appropriate for small-scale mapping of the world. It was developed by Russian cartographer David A. Aitoff in 1889.",
    "The meridians are equally spaced and concave toward the central meridian. The central meridian is a straight line and half the length of the equator. " +
    "The parallels are equally spaced curves, concave toward the poles. The projection outline forms a shape of an ellipse. " +
    "The poles are presented as points, and they are co-vertices of the ellipse (located on the minor axis). The graticule is symmetric across the equator and the central meridian.",
    "The Aitoff projection is neither conformal nor equal-area. That means that shapes, areas, distances, directions, and angles are all somewhat distorted. " +
    "Scale is correct along the equator and the central meridian. Distortion values are symmetric across the equator and the central meridian.",
    "The projection is appropriate for small-scale mapping not requiring accurate area measurements.",
    "The Aitoff projection is supported on spheres only. For an ellipsoid, the semimajor axis is used for the radius.",
    "01");


 */

