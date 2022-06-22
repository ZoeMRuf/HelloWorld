//imports express and contoller methods and path to handle our paths
const { Router } = require('express');
const controller = require('../controllers/country_controller');
const path = require("path");

const routes = Router();

//loads the main page
routes.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '../../Frontend/frontend_html/home.html'));
});
//loads the feedback page
routes.get('/feedback',function(req,res){
    res.sendFile(path.join(__dirname, '../../Frontend/frontend_html/feedback.html'));
});

//get, post, delete and put routes for country information
//first part is the path wheras the second part is what methode is being called
routes.get('/map/:id', controller.getCountry);

routes.post('/map/:country/', controller.createCountry);

routes.delete('/map/:id', controller.deleteCountry);

routes.put('/map/:country', controller.updateCountry);

//get, post, and put routes for map information
routes.get('/mapData', controller.getMapData);

routes.post('/mapData/:id', controller.addMapData);

routes.put('/mapData/:id', controller.updateMapData);

//exports the routes
module.exports = routes;