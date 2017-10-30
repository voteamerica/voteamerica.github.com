//get the data from API, using jQuery, assigns rider / driver variables to calls
//make leaflet map, load custom icons, pop-ups, and add to a layer group
$(document).ready(function () {
    
    // These IDs are all defined in index.html
    var MAP_DIV = $("#map");
    var NO_MAP_DATA = $("#noMapDataAvailable");
    var LOADING_MESSAGE = $("#mapLoadingMessage");

    NO_MAP_DATA.hide();
    LOADING_MESSAGE.show();

    function handleFailedApiCalls(details) {
        console.error("maps.js: handleFailedApiCalls: Error, api calls failed, details:", details);

        NO_MAP_DATA.show();
        MAP_DIV.hide();
        LOADING_MESSAGE.hide();
    }

    function handleSuccessfulApiCalls(riderSource, driverSource) {

        MAP_DIV.show();
        NO_MAP_DATA.hide();
        LOADING_MESSAGE.hide();
        
        var jsonRider = riderSource[0],
            jsonDriver = driverSource[0];
        
        //create the map, set the zoom, add it to the 'map' div element
        // Note that "map" is an ID on a div in at index index.html in the pages folder.
        var map = L.map('map')
            .setView([36, -93], 3);
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                minZoom: 3,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            }).addTo(map);
            
        //create the geocoder
        new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.OpenStreetMap(),
            position: 'topleft',
            showMarker: false,
            retainZoomLevel: false,
        }).addTo(map);

        //custom icons
        var riderIcon = new L.icon({
            iconUrl: 'images/rider_red.png',
            iconSize:     [30, 30], // size of the icon
            iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
        });
    
        var driverIcon = new L.icon({
            iconUrl: 'images/maki-car-15-blue.png',
            iconSize:     [30, 30], // size of the icon
            iconAnchor:   [15, 15], // point of the icon which will correspond to marker's location
            popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
        });

        //create geoJSON layer by parsing JSON with geojson.js library
        var jsonRiderParse = GeoJSON.parse(jsonRider, {Point: ['latitude_numeric', 'longitude_numeric']});
        var jsonDriverParse = GeoJSON.parse(jsonDriver, {Point: ['latitude_numeric', 'longitude_numeric']});
    
        //plot the geoJSON feaures with markers so we can use custom icons
        //example here https://maptimeboston.github.io/leaflet-intro/
        var markers = L.markerClusterGroup();

        var jsonRiderLayer = L.geoJSON(jsonRiderParse, {
            pointToLayer: function (feature, latlng) {
                var marker = L.marker(latlng, {icon: riderIcon});
                marker.bindPopup('<b>Unmatched Riders: ' + feature.properties.count + '</b><br/>' + feature.properties.city + ', ' + feature.properties.state + '<br/>zip: ' + feature.properties.zip);
                markers.addLayer(marker);
            }
        });
        
        var jsonDriverLayer = L.geoJSON(jsonDriverParse, {
            pointToLayer: function (feature, latlng) {
                var marker = L.marker(latlng, {icon: driverIcon});
                marker.bindPopup('<b>Available Drivers: </b>' + feature.properties.count + '</b><br/>' + feature.properties.city + ', ' + feature.properties.state + '<br/>zip: ' + feature.properties.zip);
                markers.addLayer(marker);
            }
        });
    
        map.addLayer(markers);

    }

    $.when(
        //wait until successful calls of both sources
        $.getJSON(remoteUrl + '/unmatched-riders'),
        $.getJSON(remoteUrl + '/unmatched-drivers')
    )
    .done(handleSuccessfulApiCalls)
    .fail(handleFailedApiCalls);

}); //end ready function 
