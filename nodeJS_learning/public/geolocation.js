"use strict";

function goToCollection()
{
    window.location = "/collection.html";
}

async function getPositionCallback(position)
{
    console.log(position);
        
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    document.getElementById('lat').textContent = lat;
    document.getElementById('lng').textContent = lon;

    const data = {lat, lon};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const responseData = await response.json();
    console.log(responseData);
}

function sentGeolocationToServer()
{
    if("geolocation" in navigator)
    {
        console.log("Geolocation POST requested");
        navigator.geolocation.getCurrentPosition(getPositionCallback);
    }
    else
    {
        console.log("Failed to access geolocation from navigator!");
    }
}

async function getGeolocationCollectionFromServer()
{
    const response = await fetch("/api");
    const responseAsJson = await response.json();
    console.log(responseAsJson);
}

async function trySteam()
{
    const Steam = "http://store.steampowered.com/appreviews/2284900?json=1";
    const AA = await fetch(Steam);
    const BB = AA.json();
    console.log(BB);
}