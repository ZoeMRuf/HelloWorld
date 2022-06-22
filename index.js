//imports express, our custom routes
const express = require("express");
const path = require("path");
const startRoute = require('./Backend/routes/website_routes');
const bodyParser = require("express");

//Port number
const port = process.env.PORT ?? 3000;
const app = express();

//add data from those paths into our project
app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(bodyParser.urlencoded({ extended: true }));
//makes it possible to get information from body
app.use(bodyParser.json());
//add data from those paths into our project
app.use(express.static(path.join(__dirname, 'Frontend/frontend_html')));
app.use('/', startRoute);

//prints link
app.listen(port, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log(`Server listening at http://localhost:${port}`);
    }
})


