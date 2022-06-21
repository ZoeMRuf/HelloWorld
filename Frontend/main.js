mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsLW8iLCJhIjoiY2w0bGgwNTd1MG0xZDNpcXA2Zjlva3MwNCJ9._1wzMXGbaJsD2BM5ZPd2zA';
let state = false;
let country1 = false;
let country2 = false;

const map = new mapboxgl.Map({container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style
    center: [16.3, 48.2], // starting position [lng, lat]
    zoom: 3, // starting zoom
    maxZoom: 6
    });


map.on('load', () => {
    map.addSource('country-boundaries', {
        'type': 'geojson',
        //country data from http://geojson.xyz/ (19.06.2022 22:00)
        'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
    });

    //countrie colored
    map.addLayer({
        'id': 'country-fills',
        'type': 'fill',
        'source': 'country-boundaries',
        'layout': {},
        'paint': {
            'fill-color': '#0096f0',
            'fill-opacity': 0.5
        }
    },
        'country-label'
    );

    //borders colored
    map.addLayer({
        'id': 'country-borders',
        'type': 'line',
        'source': 'country-boundaries',
        'layout': {},
        'paint': {
            'line-color': '#0082ff',
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
            "fill-color": "#00f096",
            "fill-opacity": 1
        },
        "filter": ["==", "name", ""]
    },
        'country-label'
    );


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

    map.on("mouseout", function() {
        map.getCanvas().style.cursor = 'auto';
        map.setFilter("country-fill-hovered", ["==", "name", ""]);
    });

    map.on("click", function(e) {
        let features = map.queryRenderedFeatures(e.point, { layers: ["country-fills"] });
        if (features.length) {
            console.log(e, features[0].properties.name);
            setCountryName(features[0].properties.name);

        }
    });
});

let Data = {
}

function setCountryName(name){
    if(!country1 && !country2){
        let country1Name = document.getElementById("country1Name");
        country1Name.textContent = name
        displayCountryInfo(name);

        let country1Population = document.getElementById("country1Population");
        let country1Area = document.getElementById("country1Area");
        let country1Continent = document.getElementById("country1Continent");

        country1 = true;
    }else if(country1 && !country2){
        let country2Name = document.getElementById("country2Name");
        country2Name.textContent = name;
        displayCountryInfo(name);

        let country2Population = document.getElementById("country2Population");
        let country2Area = document.getElementById("country2Area");
        let country2Continent = document.getElementById("country2Continent");

        country2 = true;
    }else if(!country1 && country2){
        let country1Name = document.getElementById("country1Name");
        country1Name.textContent = name
        displayCountryInfo(name);

        let country1Population = document.getElementById("country1Population");
        let country1Area = document.getElementById("country1Area");
        let country1Continent = document.getElementById("country1Continent");

        country1 = true;
    }else{
        console.log("full");
    }


    /*
    state = !state;
    console.log(name);
    if(state){
        let country1Name = document.getElementById("country1Name");
        country1Name.textContent = name
        displayCountryInfo(name);

        let country1Population = document.getElementById("country1Population");
        let country1Area = document.getElementById("country1Area");
        let country1Continent = document.getElementById("country1Continent");

        country1Population.textContent = "--";
        country1Area.textContent = "--";
        country1Continent.textContent = "--";
    }else{
        let country2Name = document.getElementById("country2Name");
        country2Name.textContent = name;
        displayCountryInfo(name);

        let country2Population = document.getElementById("country2Population");
        let country2Area = document.getElementById("country2Area");
        let country2Continent = document.getElementById("country2Continent");

        country2Population.textContent = "--";
        country2Area.textContent = "--";
        country2Continent.textContent = "--";
    }

     */
}

function displayCountryInfo(countryName) {
    if(!country1){
        fetch(`http://localhost:3000/map/${countryName}/0`, {
            method: 'POST',
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
    }else{
        fetch(`http://localhost:3000/map/${countryName}/1`, {
            method: 'POST',
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
    }
}


function loadCountry(){
    fetch("http://localhost:3000/map/0")
        .then(r => r.json())
        .then(data => {
            let country1Population = document.getElementById("country1Population");
            let country1Area = document.getElementById("country1Area");
            let country1Continent = document.getElementById("country1Continent");

            country1Population.textContent = data.population;
            country1Area.textContent = data.area;
            country1Continent.textContent = data.continent;
        })

    fetch("http://localhost:3000/map/1")
        .then(r => r.json())
        .then(data => {
            let country2Population = document.getElementById("country2Population");
            let country2Area = document.getElementById("country2Area");
            let country2Continent = document.getElementById("country2Continent");

            country2Population.textContent = data.population;
            country2Area.textContent = data.area;
            country2Continent.textContent = data.continent;
        })

    /*
    fetch("http://localhost:3000/map/")
        .then(r => r.json())
        .then(data => {
            if(data.id == 0){
                let country1 = document.getElementById("country1_article");
                let country1_info = document.createElement("p");
                country1_info.textContent = data.name + "\n" + data.population + "\n" + data.area +  "\n" + data.continent;
                country1.prepend(country1_info);
                console.log(data);
            }else if(data.id = 1){
                let country2 = document.getElementById("country2_article");
                let country2_info = document.createElement("p");
                country2_info.textContent = data.name + "\n" + data.population + "\n" + data.area +  "\n" + data.continent;
                country2.prepend(country2_info);
                console.log(data);
            }
        })

     */
}

const confirmButton = document.getElementById("compare");
confirmButton.addEventListener("click", function(){
    setTimeout(function(){
        loadCountry();
    }, 100);
})

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
})



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
})


