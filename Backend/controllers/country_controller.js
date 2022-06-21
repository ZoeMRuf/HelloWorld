const model = require("../models/country_model");

class CountryController{
    static MANDATORY = ["name", "population", "surface_area", "region"];

    checkCountry(){
        return true;
    }
    createCountry = (req, res) => {

        try {
            if (this.checkCountry()) {
                res.send(model.createCountry(req.params.country));
            }
        } catch (e) {
            res.status(404).send("There is already a country");
        }
    }

}

module.exports = new CountryController();