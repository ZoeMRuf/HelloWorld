//import node fetch to be able to fetch
const fetch = require('node-fetch');

//object for a country with its information
class FilledCountry{
    constructor(name, population, area, continent, id) {
        this.name = name;
        this.population = population;
        this.area = area;
        this.continent = continent;
        this.id = id;
    }
}

//our actual filledCountry objects are handled
class CountryModel{
    API_KEY = "pk.ae0c36b29506bf9752333e29553716bc";
    countryCode;
    constructor() {
        //two country object with id 0(left) and id 1(right)
        this.countryInfo1 = new FilledCountry("none", 0, 0, "none", 0);
        this.countryInfo2 = new FilledCountry("none", 0, 0, "none", 1);
        //put inside an array
        this.countryInfos = [this.countryInfo1, this.countryInfo2];

    }

    //first it takes in latetude and longitude to get the country code and in the second api the country code is used to get the country information and saved into the object
    createCountry(country, body) {

        let lat = body.countryLat;
        let lon = body.countryLng;
        let localState = body.id;

        fetch(`https://us1.locationiq.com/v1/reverse?key=${this.API_KEY}&lat=${lat}&lon=${lon}&format=json`)
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Something went wrong')
            })
            .then((data) => {
                this.countryCode = data.address.country_code;
                return this.countryCode;
            })
            .catch((error) => {
                this.countryCode = "none";
                console.log("Something went wrong with the foreign API's 1");
            })
            .then(countryCode => {
                fetch(`https://restcountries.com/v3.1/alpha/${this.countryCode}`)
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Something went wrong')
                    })
                    .then((output) => {
                        this.countryInfos[localState].name = output[0].name.common;
                        this.countryInfos[localState].population = output[0].population;
                        this.countryInfos[localState].area = output[0].area;
                        this.countryInfos[localState].continent = output[0].continents[0];
                        this.countryInfos[localState].id = localState;
                    })
                    .catch((error) => {
                        this.deleteCountry(body.id);
                        console.log("Something went wrong with the foreign API's")
                    });
            })
        return "It worked";
    }

    //returns country information
    getCountryInformation(id){
        return this.countryInfos[id]
    }

    //deletes country information
    deleteCountry(id){
        this.countryInfos[id].name = "none";
        this.countryInfos[id].population = 0;
        this.countryInfos[id].area = 0;
        this.countryInfos[id].continent = "none";

        return "Deleted";
    }


    //replaces country information
    updateCountry(country){
        try{
            fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
                .then(r => r.json())
                .then((data) => {
                    this.countryInfos.name = data[0].name.common;
                    this.countryInfos.population = data[0].population;
                    this.countryInfos.area = data[0].area;
                    this.countryInfos.continent = data[0].continents[0];
                    return "Replacement successful";
                })
        }catch (e){
            return "Something went wrong";
        }
    }

    //checks if country of given ID is files
    checkCountry(){
        return !this.countryInfos.name.localeCompare("none");
    }
}

//exports the methods
const model = new CountryModel();
module.exports = model;
