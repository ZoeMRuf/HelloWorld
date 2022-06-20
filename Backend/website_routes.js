const { Router } = require('express');
const path = require("path");

const routes = Router();

routes.get('/',function(req,res){
    res.sendFile(path.join(__dirname, '../Frontend/frontend_html/home.html'));
});

routes.get('/feedback',function(req,res){
    res.sendFile(path.join(__dirname, '../Frontend/frontend_html/feedback.html'));
});


module.exports = routes;