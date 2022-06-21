const { Router } = require('express');

const controller = require('../controllers/country_controller');
const path = require("path");
const firestoreContoller = require('../controllers/firestore_map_controller.js');

const routes = Router();

routes.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '../../Frontend/frontend_html/home.html'));
});

routes.get('/feedback',function(req,res){
    res.sendFile(path.join(__dirname, '../../Frontend/frontend_html/feedback.html'));
});

routes.post('/map/:country', controller.createCountry);


// Routes for MapInfos
routes.get('/map/information/:id', firestoreContoller.getMapById)

routes.get('/allMaps/information', firestoreContoller.getMaps)


module.exports = routes;