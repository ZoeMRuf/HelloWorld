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
    static addMap(title, creator, creationDate, pathToImage, description, graticule, distortion, usage, id) {
        setDoc(doc(db,'Maps', id), {
            title: title,
            creator: creator,
            creationDate: creationDate,
            Image: pathToImage,
            infoText: {
                description: description,
                graticule: graticule,
                distortion: distortion,
                usage: usage,
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

DatabaseAccess.addMap("Aitoff Projection","David A. Aitoff","1889", "../map_images/Aitoff.png","The Aitoff projection is a modified azimuthal projection. It is a compromise projection whose graticule takes the form of an ellipse. This projection is appropriate for small-scale mapping of the world. It was developed by Russian cartographer David A. Aitoff in 1889.", "The meridians are equally spaced and concave toward the central meridian. The central meridian is a straight line and half the length of the equator. The parallels are equally spaced curves, concave toward the poles. The projection outline forms a shape of an ellipse. The poles are presented as points, and they are co-vertices of the ellipse (located on the minor axis). The graticule is symmetric across the equator and the central meridian.", "The Aitoff projection is neither conformal nor equal-area. That means that shapes, areas, distances, directions, and angles are all somewhat distorted. Scale is correct along the equator and the central meridian. Distortion values are symmetric across the equator and the central meridian.", "The projection is appropriate for small-scale mapping not requiring accurate area measurements.","01")

DatabaseAccess.addMap("Berghaus Star Projection","Hermann Berghaus","1880", "../map_images/Berghaus's_star.png","The Berghaus star projection uses the azimuthal equidistant projection for the central hemisphere. The other half of the world is split into five triangular pieces, forming a star around the circular center. Usually centered at the North Pole, it can minimize breaks in land masses. The American Association of Geographers (AAG) incorporated a version of the Berghaus star projection into its logo in 1911. The projection was developed by Hermann Berghaus in 1879. Equations for an ellipsoid of revolution were developed at Esri.", "The meridians are equally spaced and concave toward the central meridian. The central meridian is a straight line and half the length of the equator. The parallels are equally spaced curves, concave toward the poles. The projection outline forms a shape of an ellipse. The poles are presented as points, and they are co-vertices of the ellipse (located on the minor axis). The graticule is symmetric across the equator and the central meridian.", "Projection is neither conformal nor equal-area. Shapes, areas, and angles are all generally distorted. The projection preserves both distance and direction from the central point though a hemisphere. Scale is true only along straight lines radiating from the center of the map for a hemisphere and along the lines between the center and the tips of triangular pieces. In polar aspect, this is along the central meridians of triangular pieces. Distortion values are radially symmetric across the center of the map.", "The Berghaus star projection was used for world maps in several atlases in the nineteenth century. The American Association of Geographers uses a version of the Berghaus star projection in its logo.","02")

DatabaseAccess.addMap("Equal Earth Projection","Tom Patterson, Bernhard Jenny and Bojan Šavrič","2018","../map_images/equal_earth.png", "Equal Earth is an equal-area pseudocylindrical projection for world maps. Its land features have a pleasing appearance, and its shape is similar to the Robinson projection. The projection was jointly developed by Tom Patterson, Bernhard Jenny, and Bojan Šavrič in 2018, and it was quickly adopted by the NASA Goddard Institute for Space Studies (GISS).","Equal Earth is a pseudocylindric projection. All parallels, the central meridian, and both poles are presented as straight lines. The parallels are unequally spaced. The meridians are equally spaced and other than the central meridian are curved outward. The poles are 0.59247 times the length of the equator. The graticule is symmetric across the equator and the central meridian.","Equal Earth is an equal-area (equivalent) projection. Shapes, directions, angles, and distances are distorted and stretched north-south in tropical and mid-latitude areas. Nearer the poles, features are compressed in the north-south direction. Distortion values are symmetric across the equator and the central meridian.", "The projection is appropriate for small-scale mapping, especially for thematic world maps illustrating area characteristics and analysis requiring accurate areas.","03")

DatabaseAccess.addMap("Hammer Projection", "Ernst von Hammer","1892 ","../map_images/Hammer.png","The Hammer projection is a modification of the Lambert azimuthal equal-area projection. It is an equal-area projection and its graticule takes a form of an ellipse. The projection is also known as the Hammer-Aitoff projection. The Hammer projection is appropriate for small-scale mapping. The Hammer projection was developed by Ernst von Hammer in 1892 after being inspired by the Russian cartographer, David A. Aitoff. Equations for an ellipsoid were developed at Esri.","Hammer is a modified azimuthal projection. The central meridian is a straight line, half the length of the projected equator. The other meridians are complex curves, concave toward the central meridian and unequally spaced along the equator. The equator is a straight line. All other parallels are complex curves, concave toward the nearest pole and unequally spaced along the central meridian. The projection outline forms a shape of an ellipse. Poles are presented as points and they are co-vertices of the ellipse (on the minor axis). The graticule is symmetric across the equator and the central meridian.","Hammer is an equal-area (equivalent) projection. Shapes, directions, angles, and distances are generally distorted. Land features near the projection's outline are skewed. Scale decreases along the equator and central meridian as distance from the origin increases. Areas near the poles are less sheared than on some pseudocylindrical projections. Distortion values are symmetric across the equator and the central meridian.","The Hammer projection is appropriate for small-scale mapping, especially for thematic world maps illustrating area characteristics and analysis requiring accurate areas. The Hammer ellipsoidal variant is recommended for world maps centered on other latitudes besides the equator. An example of such an oblique aspect is the Briesemeister projection.","04")

DatabaseAccess.addMap("Mercator Projection","Gerhard Mercator","1569","../map_images/Mercator.png","Mercator is a conformal cylindrical map projection that was originally created to display accurate compass bearings for sea travel. An additional feature of this projection is that all local shapes are accurate and correctly defined at infinitesimal scale. It was presented by Gerardus Mercator in 1569. The Web Mercator variant of the projection is the de facto standard for web maps and online services.","Mercator is a cylindrical projection. The meridians are vertical lines, parallel to each other, and equally spaced, and they extend to infinity when approaching the poles. The lines of latitude are horizontal straight lines, perpendicular to the meridians and the same length as the equator, but they become farther apart toward the poles. The poles project to infinity and cannot be shown on the map. The graticule is symmetric across the equator and the central meridian.","Mercator is a conformal map projection. Directions, angles, and shapes are maintained at infinitesimal scale. Any straight line drawn on this projection represents an actual compass bearing. These true direction lines are rhumb lines and generally do not describe the shortest distance between points. Distances are true along the equator or along the secant latitudes (standard parallels). Area is increasingly distorted toward the polar regions. For example, although Greenland is only one-eighth the size of South America, Greenland appears to be larger than Souh America in the Mercator projection. Distortion values are the same along a particular parallel and they are symmetric across the equator and the central meridian.","The projection is appropriate for large-scale mapping of the areas near the equator such as Indonesia and parts of the Pacific Ocean. Due to its property of straight rhumb lines, it is recommended for standard sea navigation charts. Its variant, the Web Mercator projection, is standard for web maps and online services. The projection is often misused for world maps, wall charts, and thematic mapping on web maps.","05")

DatabaseAccess.addMap("Mollweide Projection","Karl B. Mollweide","1805","../map_images/Mollweide.png","The Mollweide projection is an equal-area pseudocylindrical map projection displaying the world in a form of an ellipse with axes in a 2:1 ratio. It is also known as Babinet, elliptical, homolographic, or homalographic projection. The projection is appropriate for thematic and other world maps requiring accurate areas. Mollweide was first introduced by Karl B. Mollweide in 1805.","Mollweide is a pseudocylindric projection. The equator and the central meridian are projected as two perpendicular straight lines. The central meridian is half the length of the projected equator. Two meridians, 90° east and 90° west of the central meridian, project as a circle. The other meridians are regularly distributed semi-ellipses concave toward the central meridian. All parallels are unequally distributed straight lines perpendicular to the central meridian. Their spacing decreases away from equator. The projection outline forms a shape of an ellipse. The poles are presented as points and they are covertices of the ellipse (on the minor axis). The graticule is symmetric across the equator and the central meridian.","Mollweide is an equal-area (equivalent) projection. Shapes, directions, angles, and distances are generally distorted. Points 40°44' north and south at the central meridian have zero distortion. The scale is correct along the 40°44' north and south parallels and constant along any given parallel. Bulging outer meridians produce considerable distortion toward the edge of the projection, especially at high latitudes. Distortion values are symmetric across the equator and the central meridian.","The Mollweide projection is appropriate for small-scale mapping, especially for thematic world maps illustrating area characteristics and analysis requiring accurate areas.","06")

DatabaseAccess.addMap("Robinson Projection","Arthur H. Robinson","1963", "../map_images/Robinson.png","The Robinson projection is perhaps the most commonly used compromise pseudocylindrical map projection for world maps. National Geographic used the Robinson projection for their world maps for about a decade until 1998. The projection was designed by Arthur H. Robinson in 1963 at the request of the Rand McNally Company using graphic design rather than mathematical equation development. It was briefly called the orthophanic (right appearing) projection after its introduction.","Robinson is a pseudocylindric projection. The meridians are regularly distributed curves mimicking elliptical arcs. They are concave toward the central meridian and do not intersect the parallels at right angles. The parallels are unequally distributed straight lines. The equator, both poles, and the central meridian are projected as straight lines. The central meridian is 0.5072 times the length of the projected equator and pole lines are 0.5322 as long as equator. The graticule is symmetric across the equator and the central meridian.","The Robinson projection is neither conformal nor equal-area. It generally distorts shapes, areas, distances, directions, and angles. The distortion patterns are similar to common compromise pseudocylindrical projections. Area distortion grows with latitude and does not change with longitude. High latitude areas are exaggerated. Angular distortion is moderate near the center of the map and increases toward the edges. Distortion values are symmetric across the equator and the central meridian.","The Robinson projection is primarily appropriate for general world maps. National Geographic used it for their world maps for about a decade until 1998.","07")

DatabaseAccess.addMap("Van der Grinten Projection","Alphons J. van der Grinten","1898","../map_images/Van_der_Grinten.png","The Van der Grinten I projection is a polyconic projection of the world in a circle. In this projection, the continents look similar to how they appear on the Mercator projection, except that the Van der Grinten I portrays the world with a curved graticule. Both the meridians and parallels are projected as circular arcs. National Geographic used the projection for their world maps between 1922 and 1988. The projection was invented by Alphons J. van der Grinten in 1898.","Van der Grinten I is a polyconic projection. The equator and the central meridian are projected as straight lines of equal length. The other meridians are equally spaced circular arcs concave toward the central meridian. All parallels, except the equator, are also projected as circular arcs, but concave toward the nearest pole. They are unequally spaced and their spacing decreases away from the equator. The projection outline forms a circle. The poles are presented as points on the outline. The graticule is symmetric across the equator and the central meridian.","The Van der Grinten I projection is neither conformal nor equal-area. Shapes, areas, distances, directions, and angles are all generally distorted. The scale is true along the equator and increases rapidly with the distance from the equator. The polar regions are greatly distorted and exaggerated. Distortion values are symmetric across the equator and the central meridian.","Due to its circular look, the Van der Grinten I projection is very appealing for global maps. The projection could be used for general world maps not requiring accurate areas, although its use is not recommended due to extreme distortion in polar regions. National Geographic used the projection for their world maps between 1922 and 1988.","08")