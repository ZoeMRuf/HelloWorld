const fetch = require('node-fetch');

class Country{
    constructor(name) {
        this.name = name;
    }
}

class FilledCountry{
    constructor(name, population, area, continents) {
        this.name = name;
        this.population = population;
        this.area = area;
        this.continents = continents;
    }
}

class CountryModel{
    static COUNTRY_ID = 1;

    constructor() {
        this.countryInfos = new FilledCountry("none", 0, 0, "none");
    }

    createCountry(country){
        try{
            fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
                .then(r => r.json())
                .then((output) => {
                    this.countryInfos.name = output[0].name.common;
                    this.countryInfos.population = output[0].population;
                    this.countryInfos.area = output[0].area;
                    this.countryInfos.continents = output[0].continents;
                    console.log(this.countryInfos);

                })
        }catch (e){
            console.log("Something went wrong");
        }
        return this.countryInfos;
    }

    checkCountry(){
        return this.countryInfos.name != null;

    }
}
const model = new CountryModel();
module.exports = model;