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
    for(let item of responseAsJson)
    {
        const root = document.createElement("div");
        const coord = document.createElement("div");
        const time = document.createElement("div");

        coord.textContent = `${item.lat} ${item.lon}`;
        time.textContent = new Date(item.timestamp).toLocaleDateString();

        root.append(coord, time);
        document.body.append(root);
    }
}

async function trySteam()
{
    const steamAppId = document.getElementById("steamID").value;
    const AA = await fetch(`/externalApi/${steamAppId}`);
    const BB = await AA.json();

    const root = document.createElement("div");
    const steamAppData = document.createElement("div");

    steamAppData.textContent = CC;
    root.append(steamAppData);
    document.body.append(root);

    console.log(BB);
}