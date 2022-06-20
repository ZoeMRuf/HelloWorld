const express = require("express");
const path = require("path");
const startRoute = require('./Backend/website_routes');

const port = process.env.PORT ?? 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(express.static(path.join(__dirname, 'Frontend/frontend_html')));
app.use('/', startRoute);

app.listen(port, (error)=>{
    if(error){
        console.log(error);
    }else{
        console.log(`Server listening at http://localhost:${port}`);
    }
})


