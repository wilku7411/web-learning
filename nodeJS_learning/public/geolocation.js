"use strict";

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