mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsLW8iLCJhIjoiY2w0bGgwNTd1MG0xZDNpcXA2Zjlva3MwNCJ9._1wzMXGbaJsD2BM5ZPd2zA';

//checks if information is inside country boxes below the map
let country1 = false;
let country2 = false;
//counts how many times a country is added to the country box to assign correct ID's
let clickCounter = 1;
//ID values that will be given
let customID;

//border of the map, so that the world is only shown once
let bounds = [
    [-170, -80], // Southwest coordinates
    [190, 85] // Northeast coordinates
];

//map initialized
const map = new mapboxgl.Map({container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style
    center: [16.3, 48.2], // starting position [lng, lat]
    zoom: 3, // starting zoom
    maxZoom: 6,
    maxBounds: bounds
    });

//on load the information about the borders are added
map.on('load', () => {
    map.addSource('country-boundaries', {
        'type': 'geojson',
        //country data from http://geojson.xyz/ (19.06.2022 22:00)
        'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
    });

    //countrie colored layer
    map.addLayer({
        'id': 'country-fills',
        'type': 'fill',
        'source': 'country-boundaries',
        'layout': {},
        'paint': {
            'fill-color': '#aeaeae', //#0096f0
            'fill-opacity': 0.5
        }
    },
        'country-label'
    );

    //borders colored layer
    map.addLayer({
        'id': 'country-borders',
        'type': 'line',
        'source': 'country-boundaries',
        'layout': {},
        'paint': {
            'line-color': '#262626', //#0082ff
            'line-width': 2
        }
    },
        'country-label'
    );

    //countries colored when mouse hovers above it
    map.addLayer({
        "id": "country-fill-hovered",  // country-fills-hover",
        "type": "fill",
        "source": "country-boundaries",
        "layout": {},
        "paint": {
            "fill-color": "#c2e812",
            "fill-opacity": 1
        },
        "filter": ["==", "name", ""]
    },
        'country-label'
    );

    //when mouse moves over country is coloured
    map.on('mousemove', function(e) {
        let features = map.queryRenderedFeatures(e.point, { layers: ["country-fills"] });

        if (features.length) {
            map.getCanvas().style.cursor = 'pointer';
            map.setFilter("country-fill-hovered", ["==", "name", features[0].properties.name]);
        } else {
            map.setFilter("country-fill-hovered", ["==", "name", ""]);
            map.getCanvas().style.cursor = '';
        }
    });


    //when mouse is outside of the map the country changes colour to the basic layer colour
    map.on("mouseout", function() {
        map.getCanvas().style.cursor = 'auto';
        map.setFilter("country-fill-hovered", ["==", "name", ""]);
    });

    //on click setCountryName methode is call which takes in the coordinates of the mouseclick and saves the data of the countries into the backend
    map.on("click", function(e) {
        let features = map.queryRenderedFeatures(e.point, { layers: ["country-fills"] });
        if (features.length) {
            console.log(features[0].properties.name + "\nlng: " + e.lngLat.lng + "\nlat: " + e.lngLat.lat);
            setCountryName(features[0].properties.name, e.lngLat.lng, e.lngLat.lat);
        }
    });
});

let Data = {
}

//writes the name of the country clicked into the country boxes and calls displayCountryInfo(takes in coordinates and country name)
function setCountryName(name, lng, lat){
    if(!country1 && country2 || country1 && !country2){
        document.getElementById("Countries").scrollIntoView();
    }

    if(!country1 && !country2 || !country1 && country2){
        let country1Name = document.getElementById("country1Name");
        country1Name.textContent = name
        displayCountryInfo(name, lng, lat);

        let country1Population = document.getElementById("country1Population");
        let country1Area = document.getElementById("country1Area");
        let country1Continent = document.getElementById("country1Continent");

        country1Population.textContent = "--";
        country1Area.textContent = "--";
        country1Continent.textContent = "--";

        country1 = true;
    }else if(country1 && !country2){
        let country2Name = document.getElementById("country2Name");
        country2Name.textContent = name;
        displayCountryInfo(name, lng, lat);

        let country2Population = document.getElementById("country2Population");
        let country2Area = document.getElementById("country2Area");
        let country2Continent = document.getElementById("country2Continent");

        country2Population.textContent = "--";
        country2Area.textContent = "--";
        country2Continent.textContent = "--";

        country2 = true;
    }else{
        console.log("full");
    }
}

//if country is successfully added to the country box the clickCounter is incremented and if it is divisible by two the country gets the id 0 and if not the id 1
//also sends a post request to load the country information into the backend
function displayCountryInfo(countryName, lng, lat) {
    clickCounter++;
    if(clickCounter % 2 === 0){
        customID = 0;
    }else{
        customID = 1;
    }
    try{
        fetch(`http://localhost:3000/map/${countryName}`, {
            method: 'POST',
            body: JSON.stringify({
                'countryLng': `${lng}`,
                'countryLat': `${lat}`,
                'id': customID
            }),
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            Cache: 'default'
        })
            .then(r => r.text())
            .then(text => {
                console.log(text);
            })
    }catch(e){
        console.log("Something went wrong");
    }

}

//gets the country information and loads it into the country boxes
function loadCountry(){
    try{
        fetch("http://localhost:3000/map/0")
            .then(r => r.json())
            .then(data => {
                let country1Population = document.getElementById("country1Population");
                let country1Area = document.getElementById("country1Area");
                let country1Continent = document.getElementById("country1Continent");

                country1Population.textContent = "Population: " + data.population.toLocaleString('en-US');
                country1Area.textContent = "Area: " + data.area.toLocaleString('en-US') + " \u33A2";
                country1Continent.textContent = "Continent: " + data.continent;
            })
    }catch(e){
        console.log("Something went wrong");
    }

    try{
        fetch("http://localhost:3000/map/1")
            .then(r => r.json())
            .then(data => {
                let country2Population = document.getElementById("country2Population");
                let country2Area = document.getElementById("country2Area");
                let country2Continent = document.getElementById("country2Continent");

                country2Population.textContent = "Population: " + data.population.toLocaleString('en-US');
                country2Area.textContent = "Area: " + data.area.toLocaleString('en-US') + " \u33A2";
                country2Continent.textContent = "Continent: " + data.continent;
            })
    }catch(e){
        console.log("Something went wrong");
    }
}

//compare button loads information to the country boxes
const confirmButton = document.getElementById("compare");
confirmButton.addEventListener("click", function(){
    setTimeout(function(){
        loadCountry();
    }, 500);
})

//clears information of country box 1
const clearButton1 = document.getElementById("clear1");
clearButton1.addEventListener("click", function(){
    let country1Name = document.getElementById("country1Name");
    let country1Population = document.getElementById("country1Population");
    let country1Area = document.getElementById("country1Area");
    let country1Continent = document.getElementById("country1Continent");

    country1Name.textContent = "--";
    country1Population.textContent = "--";
    country1Area.textContent = "--";
    country1Continent.textContent = "--";

    country1 = false;
    if(!country1 && !country2){
        document.getElementById("map").scrollIntoView();
    }
    try{
        fetch(`http://localhost:3000/map/0`, {
            method: 'DELETE',
            body: JSON.stringify(Data),
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            Cache: 'default'
        })
            .then(r => r.text())
            .then(text => {
                console.log(text);
            })
    }catch(e){
        console.log("Something went wrong");
    }

})


//clears information of country box 1
const clearButton2 = document.getElementById("clear2");
clearButton2.addEventListener("click", function(){
    let country2Name = document.getElementById("country2Name");
    let country2Population = document.getElementById("country2Population");
    let country2Area = document.getElementById("country2Area");
    let country2Continent = document.getElementById("country2Continent");

    country2Name.textContent = "--";
    country2Population.textContent = "--";
    country2Area.textContent = "--";
    country2Continent.textContent = "--";

    country2 = false;

    if(!country1 && !country2){
        document.getElementById("map").scrollIntoView();
    }
    try{
        fetch(`http://localhost:3000/map/1`, {
            method: 'DELETE',
            body: JSON.stringify(Data),
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            Cache: 'default'
        })
            .then(r => r.text())
            .then(text => {
                console.log(text);
            })
    }catch(e){
        console.log("Something went wrong");
    }

})

const btn = document.querySelectorAll(".btn");

//Map buttons
btn.forEach(b => {
    b.addEventListener('click', (event) => {
        const id = b.id;
        console.log(id);

        try{
            fetch(`http://localhost:3000/mapData/${id}`, {
                method: 'PUT',
                body: JSON.stringify({}),
                headers: {
                    Accept: 'application.json',
                    'Content-Type': 'application/json'
                },
                Cache: 'default'
            })
                .then(r => r.json())
                .then(text => {

                    console.log(text.title);

                    const title = document.getElementById('mapTitle');
                    const creationDate = document.getElementById('mapCreationDate');
                    const creator = document.getElementById('mapCreator');

                    title.textContent = text.title;
                    creationDate.textContent = "Year of Creation: --- " + text.creationDate + " ---";
                    creator.textContent = "Author : --- " + text.creator + " ---";

                    const description = document.getElementById('mapDescription');
                    const distortion = document.getElementById('mapDistortion');
                    const graticule = document.getElementById('mapGraticule');
                    const usage = document.getElementById('mapUsage');

                    description.textContent = text.description;
                    distortion.textContent = text.distortion;
                    graticule.textContent = text.graticule;
                    usage.textContent = text.usage;

                    const Image = document.getElementById('mapImg');
                    Image.src = text.pathToImage;

                })
        }catch(e){
            console.log("Something went wrong");
        }
        setTimeout(function(){
            document.getElementById('WorldMap').scrollIntoView();
        }, 400);

    })
})
//post request to load first map informations
document.addEventListener("DOMContentLoaded", function (event){

    try{
        fetch(`http://localhost:3000/mapData/01`, {
            method: 'POST',
            body: JSON.stringify({}),
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            Cache: 'default'
        })
            .then(r => r.json())
            .then(text => {

                console.log(text.title);

                const title = document.getElementById('mapTitle');
                const creationDate = document.getElementById('mapCreationDate');
                const creator = document.getElementById('mapCreator');

                title.textContent = text.title;
                creationDate.textContent = "Year of Creation: --- " + text.creationDate + " ---";
                creator.textContent = "Author : --- " + text.creator + " ---";

                const description = document.getElementById('mapDescription');
                const distortion = document.getElementById('mapDistortion');
                const graticule = document.getElementById('mapGraticule');
                const usage = document.getElementById('mapUsage');

                description.textContent = text.description;
                distortion.textContent = text.distortion;
                graticule.textContent = text.graticule;
                usage.textContent = text.usage;

                const Image = document.getElementById('mapImg');
                Image.src = text.pathToImage;

            })
    }catch(e){
        console.log("Something went wrong");
    }

})



