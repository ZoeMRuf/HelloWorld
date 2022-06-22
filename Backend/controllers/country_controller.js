const model = require("../models/country_model");

class CountryController{
    static MANDATORY = ["name", "population", "surface_area", "region"];

    checkCountry(){
        model.checkCountry();
    }
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

    getCountry(req, res){
        res.send(model.getCountryInformation(req.params.id));
    }

    deleteCountry(req, res){
        res.send(model.deleteCountry(req.params.id));
    }

    updateCountry(req, res){
        res.send(model.updateCountry(req.params.country));
    }

    getMapData(req, res){
        res.send(model.getMapData());
    }

    addMapData(req, res){
        res.send(model.addMapData(req.params.id));
    }

    updateMapData(req, res){
        res.send(model.updateMapData(req.params.id));
    }
}

module.exports = new CountryController();