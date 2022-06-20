mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuaWVsLW8iLCJhIjoiY2w0bGgwNTd1MG0xZDNpcXA2Zjlva3MwNCJ9._1wzMXGbaJsD2BM5ZPd2zA';


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
        }
    });
});


