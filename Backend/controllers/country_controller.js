const model = require("../models/country_model");

class CountryController{
    static MANDATORY = ["name", "population", "surface_area", "region"];

    checkCountry(){
        return true;
    }
    createCountry = (req, res) => {

        try {
            if (this.checkCountry()) {
                res.send(model.createCountry(req.params.country, req.params.id));
            }
        } catch (e) {
            res.status(404).send("There is already a country");
        }
    }

    getCountry(req, res){
        res.send(model.getCountryInformation(req.params.id));
    }

    deleteCountry(req, res){
        res.send(model.deleteCountry(req.params.id));
    }

    updateCountry(req, res){
        model.updateCountry(req.params.country);
    }

}

module.exports = new CountryController();