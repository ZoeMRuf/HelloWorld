const { Router } = require('express');
const controller = require('../controllers/country_controller');
const path = require("path");

const routes = Router();

routes.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '../../Frontend/frontend_html/home.html'));
});

routes.get('/feedback',function(req,res){
    res.sendFile(path.join(__dirname, '../../Frontend/frontend_html/feedback.html'));
});

routes.get('/map/:id', controller.getCountry);

routes.post('/map/:country/', controller.createCountry);

routes.delete('/map/:id', controller.deleteCountry);

routes.put('/map/:country', controller.updateCountry);


routes.get('/mapData', controller.getMapData);

routes.post('/mapData/:id', controller.addMapData);

routes.put('/mapData/:id', controller.updateMapData);
module.exports = routes;