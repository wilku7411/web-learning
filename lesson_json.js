"use strict";

const ISSAPIURL = "https://api.wheretheiss.at/v1/satellites/25544";

async function whereISS()
{
    const response = await fetch(ISSAPIURL);
    const data = await response.json();
    console.log(data);
    console.log(data.latitude);
    console.log(data.longitude);
}
whereISS();
