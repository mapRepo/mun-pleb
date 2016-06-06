var map = L.map('map').setView([45.63732, -62.718], 10);

//L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
//    maxZoom: 18,
//    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
//        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
//        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
//    id: 'mapbox.streets'
//}).addTo(map);
//?api_key=3f23d85de57f4e50bceb42fd79572c732de9816d'
var CartoDB_PositronNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 19
});


map.addLayer(CartoDB_PositronNoLabels);
function style(feature) {
    //console.log(sn);
    if (Number(feature.properties.YES) > Number(feature.properties.NO)) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.3,
            fillColor: '#567714'
        };
    } else {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.3,
            fillColor: '#801515'
        };
    }
}

//running total
var allYes = 0;
var allNo = 0;

$.getJSON("/Data/PCD.geojson", function (data) {
    var mapData = [];
    var mapCategories = [];

    geojson = L.geoJson(data, {
        style: style,
        name: "Pictou County Districts",
        onEachFeature: function (feature, layer) {
            var feat = feature.properties;
            var popupText = "<h5>District " + feat.DISTNAME + ", Pictou County</h5><hr>"
            + "Yes: " + feat.YES + " votes</br>"
            + "No:  " + feat.NO + " votes</br>"
            + "Percentage Yes votes: " + ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>"
            + "Percentage No votes: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>";

            allYes += Number(feat.YES);
            allNo += Number(feat.NO);

            layer.bindPopup(popupText)
        }
    }).addTo(map);
});

//Pictou Wards
$.getJSON("/Data/PW.geojson", function (data) {
    var mapData = [];
    var mapCategories = [];

    geojson = L.geoJson(data, {
        style: style,
        name: "Pictou Wards",
        onEachFeature: function (feature, layer) {
            var feat = feature.properties;
            var popupText = "<h5>District " + feat.District + ", " + feat.Poll + ", Pictou</h5><hr>"
            + "Yes: " + feat.YES + " votes</br>"
            + "No: " + feat.NO + " votes</br>"
            + "Percentage Yes votes: " + ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>"
            + "Percentage No votes: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>";

            allYes += Number(feat.YES);
            allNo += Number(feat.NO);
            layer.bindPopup(popupText)
        }
    }).addTo(map);
});

//New Glasgow Wards
$.getJSON("/Data/NGW.geojson", function (data) {
    var mapData = [];
    var mapCategories = [];

    geojson = L.geoJson(data, {
        style: style,
        name: "New Glasgow Wards",
        onEachFeature: function (feature, layer) {
            var feat = feature.properties;
            var popupText = "<h5>District " + feat.District + ", " + feat.Poll + ", New Glasgow</h5><hr>"
            + "Yes: " + feat.YES + " votes</br>"
            + "No: " + feat.NO + " votes</br>"
            + "Percentage Yes votes: " + ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>"
            + "Percentage No votes: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>";

            allYes += Number(feat.YES);
            allNo += Number(feat.NO);
            layer.bindPopup(popupText)
        }
    }).addTo(map);
});


//Stellarton Wards
$.getJSON("/Data/SW.geojson", function (data) {
    var mapData = [];
    var mapCategories = [];

    geojson = L.geoJson(data, {
        style: style,
        name: "Stellarton Wards",
        onEachFeature: function (feature, layer) {
            var feat = feature.properties;
            var popupText = "<h5>District " + feat.District + ", " + feat.Poll + ", Stellarton</h5><hr>"
            + "Yes: " + feat.YES + " votes</br>"
            + "No: " + feat.NO + " votes</br>"
            + "Percentage Yes votes: " + ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>"
            + "Percentage No votes: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>";

            allYes += Number(feat.YES);
            allNo += Number(feat.NO);
            layer.bindPopup(popupText)

        }
    }).addTo(map);
    console.log("Yes: " + allYes.toString());
    console.log("No: " + allNo);
    console.log(allYes + allNo);
});