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

routes.post('/map/:country', controller.createCountry);

module.exports = routes;