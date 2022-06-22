const fetch = require('node-fetch');

class Country{
    constructor(name) {
        this.name = name;
    }
}

class FilledCountry{
    constructor(name, population, area, continent, id) {
        this.name = name;
        this.population = population;
        this.area = area;
        this.continent = continent;
        this.id = id;
    }
}

class CountryModel{
    state = true;
    API_KEY = "pk.ae0c36b29506bf9752333e29553716bc";
    countryCode;
    constructor() {
        this.countryInfo1 = new FilledCountry("none", 0, 0, "none", 0);
        this.countryInfo2 = new FilledCountry("none", 0, 0, "none", 1);

        this.countryInfos = [this.countryInfo1, this.countryInfo2];

    }

    createCountry(country, id, body) {

        let lat = body.countryLat;
        let lon = body.countryLng;
        let localState = id;

        //${body.countryLat}${body.countryLat}
        fetch(`https://us1.locationiq.com/v1/reverse?key=${this.API_KEY}&lat=${lat}&lon=${lon}&format=json`)
            .then(res => res.json())
            .then((data) => {
                this.countryCode = data.address.country_code;
                return this.countryCode;
            })
            .then(countryCode => {
                fetch(`https://restcountries.com/v3.1/alpha/${this.countryCode}`)
                    .then(r => r.json())
                    .then((output) => {
                        this.countryInfos[localState].name = output[0].name.common;
                        this.countryInfos[localState].population = output[0].population;
                        this.countryInfos[localState].area = output[0].area;
                        this.countryInfos[localState].continent = output[0].continents[0];
                        this.countryInfos[localState].id = localState;
                        //console.log(this.countryInfos);
                        this.state = !this.state;
                    })
            })

        /*
                try{
                    fetch(`https://us1.locationiq.com/v1/reverse?key=${this.API_KEY}&lat=${body.countryLat}&lon=${body.countryLat}&format=json`)
                        .then(res => res.json())
                        .then((data) => {
                            data.address.country_code;
                        })
                        .then(countryCode => {
                            fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
                                .then(r => r.json())
                                .then((output) => {
                                    this.countryInfos[localState].name = output[0].name.common;
                                    this.countryInfos[localState].population = output[0].population;
                                    this.countryInfos[localState].area = output[0].area;
                                    this.countryInfos[localState].continent = output[0].continents[0];
                                    this.countryInfos[localState].id = localState;
                                    //console.g(this.countryInfos);
                                    this.state = !this.state;
                                })
                        })




        /*
                    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
                        .then(r => r.json())
                        .then((output) => {
                            this.countryInfos[localState].name = output[0].name.common;
                            this.countryInfos[localState].population = output[0].population;
                            this.countryInfos[localState].area = output[0].area;
                            this.countryInfos[localState].continent = output[0].continents[0];
                            this.countryInfos[localState].id = localState;
                            //console.log(this.countryInfos);
                            this.state = !this.state;

                }catch (e){
                    console.log("Something went wrong");
                }})*/

        return "It worked";
    }

    getCountryInformation(id){
        return this.countryInfos[id]
    }

    deleteCountry(id){
        this.countryInfos[id].name = "none";
        this.countryInfos[id].population = 0;
        this.countryInfos[id].area = 0;
        this.countryInfos[id].continent = "none";
        return "Deleted";
    }

    updateCountry(country){
        try{
            fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
                .then(r => r.json())
                .then((data) => {
                    this.countryInfos.name = data[0].name.common;
                    this.countryInfos.population = data[0].population;
                    this.countryInfos.area = data[0].area;
                    this.countryInfos.continent = data[0].continents[0];
                })
        }catch (e){
            console.log("Something went wrong");
        }

        return "Replacement successful";
    }

    checkCountry(){
        return this.countryInfos.name != null;
    }
}
const model = new CountryModel();
module.exports = model;