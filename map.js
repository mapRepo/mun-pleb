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
            fillColor: '#567714',
            className: "polys"

        };
    } else {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.3,
            fillColor: '#801515',
            className: "polys"
        };
    }
}

//running total
var allYesPCD = 0;
var allNoPCD = 0;
var allYesPW = 0;
var allNoPW = 0;
var allYesNGW = 0;
var allNoNGW = 0;
var allYesSW = 0;
var allNoSW = 0;

function dw() {
    $.getJSON("/mun-pleb/Data/PCD.geojson", function (data) {
        var mapData = [];
        var mapCategories = [];

        pcd = L.geoJson(data, {
            style: style,
            name: "Pictou County Districts",
            onEachFeature: function (feature, layer) {

                var feat = feature.properties;
                var popupText = "<div id='container' style='min-width: 300px; height: 200px; margin: 0 auto'></div><h5 style='display: none;'>District " + feat.DISTNAME + ", Pictou County</h5>"
                //var popupText = "<h5>District " + feat.DISTNAME + ", Pictou County</h5><hr>"
                //+ "Yes: " + feat.YES + " votes</br>"
                //+ "No:  " + feat.NO + " votes</br>"
                //+ "Percentage Yes votes: " + (Number(feat.YES) / (Number(feat.YES) + Number(feat.NO)) * 100).toFixed(2) + "%</br>"
                //+ "Percentage No votes: " + (Number(feat.NO) / (Number(feat.YES) + Number(feat.NO)) * 100).toFixed(2) + "%</br>";

                allYesPCD += Number(feat.YES);
                allNoPCD += Number(feat.NO);

                layer.bindPopup(popupText)

                //var label = L.marker(layer.getBounds().getCenter(), {
                //    icon: L.divIcon({
                //        className: 'label',
                //        html: "<text style='background-color: #fff; color: black; padding: .4em; background-opacity: 6; border-radius: 2px'>District " + feature.properties.DISTNAME +"</text>",
                //        iconSize: [20, 4],

                //    })
                //}).addTo(map);

            }

        }).addTo(map);
        console.log("PCD: Yes- " + allYesPCD)
        console.log("PCD: No- " + allNoPCD)

    });

    //Pictou Wards
    $.getJSON("/mun-pleb/Data/PW.geojson", function (data) {
        var mapData = [];
        var mapCategories = [];

        pw = L.geoJson(data, {
            style: style,
            name: "Pictou Wards",
            onEachFeature: function (feature, layer) {
                var feat = feature.properties;
                var popupText = "<div id='container' style='min-width: 300px; height: 200px; margin: 0 auto'></div><h5 style='display: none;'>District " + feat.District + ", " + feat.Poll + ", Pictou</h5>"
                //var popupText = "<h5>District " + feat.District + ", " + feat.Poll + ", Pictou</h5><hr>"
                //+ "Yes: " + feat.YES + " votes</br>"
                //+ "No: " + feat.NO + " votes</br>"
                //+ "Percentage Yes votes: " + (Number(feat.YES) / (Number(feat.YES) + Number(feat.NO)) * 100).toFixed(2) + "%</br>"
                //+ "Percentage No votes: " + (Number(feat.NO) / (Number(feat.YES) + Number(feat.NO)) * 100).toFixed(2) + "%</br>";

                allYesPW += Number(feat.YES);
                allNoPW += Number(feat.NO);
                layer.bindPopup(popupText)
            }
        }).addTo(map);

        console.log("PW: Yes- " + allYesPW)
        console.log("PW: No- " + allNoPW)
    });

    //New Glasgow Wards
    $.getJSON("/mun-pleb/Data/NGW.geojson", function (data) {
        var mapData = [];
        var mapCategories = [];

        ngw = L.geoJson(data, {
            style: style,
            name: "New Glasgow Wards",
            onEachFeature: function (feature, layer) {
                var feat = feature.properties;
                var popupText = "<div id='container' style='min-width: 300px; height: 200px; margin: 0 auto'></div><h5 style='display: none;'>District " + feat.District + ", " + feat.Poll + ", New Glasgow</h5>"
                //var popupText = "<h5>District " + feat.District + ", " + feat.Poll + ", New Glasgow</h5><hr>"
                //+ "Yes: " + feat.YES + " votes</br>"
                //+ "No: " + feat.NO + " votes</br>"
                //+ "Percentage Yes votes: " + ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>"
                //+ "Percentage No votes: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>";

                allYesNGW += Number(feat.YES);
                allNoNGW += Number(feat.NO);
                layer.bindPopup(popupText)
            }
        }).addTo(map);

        console.log("NGW: Yes- " + allYesNGW)
        console.log("NGW: No- " + allNoNGW)
    });


    //Stellarton Wards
    $.getJSON("/mun-pleb/Data/SW.geojson", function (data) {
        var mapData = [];
        var mapCategories = [];

        sw = L.geoJson(data, {
            style: style,
            name: "Stellarton Wards",
            onEachFeature: function (feature, layer) {
                var feat = feature.properties;
                var popupText = "<div id='container' style='min-width: 300px; height: 200px; margin: 0 auto'></div><h5 style='display: none;'>District " + feat.District + ", " + feat.Poll + ", Stellarton</h5>"
                //var popupText = "<h5>District " + feat.District + ", " + feat.Poll + ", Stellarton</h5><hr>"
                //+ "Yes: " + feat.YES + " votes</br>"
                //+ "No: " + feat.NO + " votes</br>"
                //+ "Percentage Yes votes: " + ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>"
                //+ "Percentage No votes: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>";

                allYesSW += Number(feat.YES);
                allNoSW += Number(feat.NO);
                layer.bindPopup(popupText)

            }
        }).addTo(map);

        console.log("SW: Yes- " + allYesSW)
        console.log("SW: No- " + allNoSW)
    });
}

//console.log("Yes: " + allYes.toString());
//console.log("No: " + allNo);
//console.log(allYes + allNo);



//D3 layers

//var width = 960,
//    height = 500;

//var radius = d3.scale.sqrt()
//    .domain([0, 1e6])
//    .range([0, 10]);

//var path = d3.geo.path();

//var svg = d3.select("body").append("svg")
//    .attr("width", width)
//    .attr("height", height);

//queue()
//    .defer(d3.json, "/Data/PCD.geojson")
//    //.defer(d3.json, "/mbostock/raw/4090846/us.json")
//    //.defer(d3.json, "us-state-centroids.json")
//    .await(ready);

//function ready(error, us, centroid) {
//    if (error) throw error;

//    svg.append("path")
//        .attr("class", "states")
//        .datum(topojson.feature(PCD, us.objects.states))
//        .attr("d", path);

//    svg.selectAll(".symbol")
//        .data(centroid.features.sort(function (a, b) { return b.properties.population - a.properties.population; }))
//      .enter().append("path")
//        .attr("class", "symbol")
//        .attr("d", path.pointRadius(function (d) { return radius(d.properties.population); }));
//}

function tc() {
    $.getJSON("/mun-pleb/Data/PCDMerged.geojson", function (data) {
        var mapData = [];
        var mapCategories = [];

        pcdm = L.geoJson(data, {
            style: style,
            name: "Pictou County Districts",
            onEachFeature: function (feature, layer) {

                var feat = feature.properties;
                var popupText = "<div id='container' style='min-width: 300px; height: 200px; margin: 0 auto'></div><h5 style='display: none;'>Pictou County</h5>"
                //var popupText = "<h5>Pictou County</h5><hr>"
                //+ "Yes: " + feat.YES + " votes</br>"
                //+ "No:  " + feat.NO + " votes</br>"
                //+ "Percentage Yes votes: " + (Number(feat.YES) / (Number(feat.YES) + Number(feat.NO)) * 100).toFixed(2) + "%</br>"
                //+ "Percentage No votes: " + (Number(feat.NO) / (Number(feat.YES) + Number(feat.NO)) * 100).toFixed(2) + "%</br>";

                allYesPCD += Number(feat.YES);
                allNoPCD += Number(feat.NO);

                layer.bindPopup(popupText)

                //var label = L.marker(layer.getBounds().getCenter(), {
                //    icon: L.divIcon({
                //        className: 'label',
                //        html: "<text style='background-color: #fff; color: black; padding: .4em; background-opacity: 6; border-radius: 2px'>District " + feature.properties.DISTNAME +"</text>",
                //        iconSize: [20, 4],

                //    })
                //}).addTo(map);

            }

        }).addTo(map);
        console.log("PCD: Yes- " + allYesPCD)
        console.log("PCD: No- " + allNoPCD)

    });

    //Pictou Wards
    $.getJSON("/mun-pleb/Data/PWMerged.geojson", function (data) {
        var mapData = [];
        var mapCategories = [];

        pwm = L.geoJson(data, {
            style: style,
            name: "Pictou Wards",
            onEachFeature: function (feature, layer) {
                var feat = feature.properties;
                var popupText = "<div id='container' style='min-width: 300px; height: 200px; margin: 0 auto'></div><h5 style='display: none;'>Pictou</h5>"
                //var popupText = "<h5>Pictou</h5><hr>"
                //+ "Yes: " + feat.YES + " votes</br>"
                //+ "No: " + feat.NO + " votes</br>"
                //+ "Percentage Yes votes: " + (Number(feat.YES) / (Number(feat.YES) + Number(feat.NO)) * 100).toFixed(2) + "%</br>"
                //+ "Percentage No votes: " + (Number(feat.NO) / (Number(feat.YES) + Number(feat.NO)) * 100).toFixed(2) + "%</br>";

                allYesPW += Number(feat.YES);
                allNoPW += Number(feat.NO);
                layer.bindPopup(popupText)
            }
        }).addTo(map);

        console.log("PW: Yes- " + allYesPW)
        console.log("PW: No- " + allNoPW)
    });

    //New Glasgow Wards
    $.getJSON("/mun-pleb/Data/NGWMerged.geojson", function (data) {
        var mapData = [];
        var mapCategories = [];

        ngwm = L.geoJson(data, {
            style: style,
            name: "New Glasgow Wards",
            onEachFeature: function (feature, layer) {
                var feat = feature.properties;
                var popupText = "<div id='container' style='min-width: 300px; height: 200px; margin: 0 auto'></div><h5 style='display: none;'>New Glasgow</h5>"
                //var popupText = "<h5>New Glasgow</h5><hr>"
                //+ "Yes: " + feat.YES + " votes</br>"
                //+ "No: " + feat.NO + " votes</br>"
                //+ "Percentage Yes votes: " + ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>"
                //+ "Percentage No votes: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>";

                allYesNGW += Number(feat.YES);
                allNoNGW += Number(feat.NO);
                layer.bindPopup(popupText)
            }
        }).addTo(map);

        console.log("NGW: Yes- " + allYesNGW)
        console.log("NGW: No- " + allNoNGW)
    });


    //Stellarton Wards
    $.getJSON("/mun-pleb/Data/SWMerged.geojson", function (data) {
        var mapData = [];
        var mapCategories = [];

        swm = L.geoJson(data, {
            style: style,
            name: "Stellarton Wards",
            onEachFeature: function (feature, layer) {
                var feat = feature.properties;
                var popupText = "<div id='container' style='min-width: 300px; height: 200px; margin: 0 auto'></div><h5 style='display: none;'>Stellarton</h5>"
                //+ "Yes: " + feat.YES + " votes</br>"
                //+ "No: " + feat.NO + " votes</br>"
                //+ "Percentage Yes votes: " + ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>"
                //+ "Percentage No votes: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%</br>";

                allYesSW += Number(feat.YES);
                allNoSW += Number(feat.NO);
                layer.bindPopup(popupText)

            }
        }).addTo(map);
        //hc();
        console.log("SW: Yes- " + allYesSW)
        console.log("SW: No- " + allNoSW)
    });
}

var legend = L.control({ position: 'topright' });
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML =
        '<select id="mapLayer">' +
            '<option>District/Ward</option>' +
            '<option>County/Town</option>' +
        '</select>';
    div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
    return div;
};
legend.addTo(map);

$("#mapLayer").change(function () {
    var layerGroup = this.value;
    if (layerGroup == "District/Ward") {
        map.removeLayer(pcdm);
        map.removeLayer(ngwm);
        map.removeLayer(swm);
        map.removeLayer(pwm);
        dw();
    }
    else {
        map.removeLayer(pcd);
        map.removeLayer(ngw);
        map.removeLayer(sw);
        map.removeLayer(pw);
        tc();
    }
})

dw();

//$(".target").change(function () {
//    alert("Handler for .change() called.");
//});



map.on('popupopen', function (e) {
    //$.ajax({
    //    type: "GET",
    //    url: "data.json"
    //})
    //  .done(function (data) {
    console.log(e.popup._source); // Layer instance
    console.log(e.popup._source.feature); // Layer's feature 
    console.log(e.popup._contentNode); // Popup content element
    var polyonName = e.popup._contentNode.children[1].textContent;
    console.log(polyonName);
    var feat = e.popup._source.feature.properties;

    var series = [{
        name: 'Yes',
        data: [feat.YES],
        color: '#567714'
    }, {
        name: 'No',
        data: [feat.NO],
        color: '#801515'
    }]


    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: polyonName + ' Voting Results'
        },
        //subtitle: {
        //    text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
        //},
        xAxis: {
            //categories: ["Yes", "No"],
            categories: [polyonName],
            title: {
                enabled: false
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Votes',
                align: 'middle'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' votes'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        var perc = this.series.name;
                        if (perc == "Yes") {
                            return "Yes: "+ ((feat.YES / (feat.YES + feat.NO)) * 100).toFixed(2) + "%";
                        }
                        else {
                            return "No: " + ((feat.NO / (feat.YES + feat.NO)) * 100).toFixed(2) + "%";
                        }
                        
                    }
                }
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: series
    });
      //});
});
