"use strict";

const ISSAPIURL = "https://api.wheretheiss.at/v1/satellites/25544";
const Steam = "http://store.steampowered.com/appreviews/2284900?json=1";

const map = L.map('mapka').setView([0.0, 0.0], 2);
const marker = L.marker([0.0, 0.0]).addTo(map);

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const tiles = L.tileLayer(tileUrl, {attribution});
tiles.addTo(map);


async function whereISS()
{
    const response = await fetch(ISSAPIURL);
    const data = await response.json();
    console.log(data);
    const latlng = [data.latitude, data.longitude];
    marker.setLatLng(latlng);
    map.flyTo(latlng);
}

// retrieve data about ISS
whereISS();
// refresh data every 2sec
setInterval(whereISS, 2000);