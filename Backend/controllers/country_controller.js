//imports model methods

const model = require("../models/country_model");
const mapData = require("../models/mapData_model");

class CountryController{
    static MANDATORY = ["name", "population", "surface_area", "region"];

    //checks if the ID is already taken
    checkCountry(){
        model.checkCountry();
    }

    //creates a country at the given ID
    createCountry = (req, res) => {

        try {
            if (this.checkCountry) {
                res.send(model.createCountry(req.params.country, req.body));
            }else{
                res.status(404).send(`There is already a country with this ID: ${req.params.id}`)
            }
        } catch (e) {
            res.status(404).send("Something went wrong");
        }
    }

    //gets the country information that where saved
    getCountry(req, res){
        res.send(model.getCountryInformation(req.params.id));
    }

    //deletes country at give ID
    deleteCountry(req, res){
        res.send(model.deleteCountry(req.params.id));
    }

    //replaces country at given ID
    updateCountry(req, res){
        res.send(model.updateCountry(req.params.country));
    }

    //get map information at given ID
    getMapData(req, res){
        res.send(mapData.getMapData());
    }

    //adds data of map with the given ID onto our webpage
    addMapData(req, res){
        res.send(mapData.addMapData(req.params.id));
    }

    //replaces the map data, which is on our webpage
    updateMapData(req, res){
        res.send(mapData.updateMapData(req.params.id));
    }
}
//exports methods
module.exports = new CountryController();