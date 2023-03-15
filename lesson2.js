
"use strict";

async function fetchPicture(pictureName)
{
    // await mozemy uzyc bo jestesmy w async funkcji i grzecznie bedzie czekac
    const fetchResponse = await fetch(pictureName);
    const blob = await fetchResponse.blob();
    document.getElementById("picture").src = URL.createObjectURL(blob);
}

fetchPicture("something.jpg");