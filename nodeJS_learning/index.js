const express    = require("express");
const datastore  = require("nedb");
const fetch      = require("node-fetch");

const database = new datastore("database.db");
database.loadDatabase();

class serverResponse
{
    constructor(status, request = undefined)
    {
        this.status = status;
        this.received = request;
    }

    status = 'Success';
    received = null;
}

const app = express();
app.listen(3000, ()=>console.log("listening using port 3000"));
app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

app.post("/api", (request, response)=>{
    console.log("POST Request received!");
    let dataEntry = request.body;
    dataEntry.timestamp = Date.now();
    console.log(dataEntry);
    database.insert(dataEntry);

    response.json(new serverResponse("Success", dataEntry));
}); 

app.get("/api", (request, response) => {
    console.log("GET Request received!");
    database.find({}, (err, data)=>
    {
        response.json(data);
    })
});

app.get("/externalApi/:steamAppId", async (request, response)=>{
    console.clear();
    console.log("App details requested");
    //const hots = "https://www.hotslogs.com/api/Data/Heroes";
    //const Steam = "https://api.store.steampowered.com/appreviews/420?json=1";
    //const Steam = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=3";

    //const teamFortress = "https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=3";
    //const HAS = "https://api.store.steampowered.com/appreviews/11155330?json=1";
    const AppDetails = `http://store.steampowered.com/api/appdetails/?appids=${request.params.steamAppId}`
    //const HAS = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
    const AA = await fetch(AppDetails
         ,{
             'ContentType':'application/x-www-form-urlencoded'
         }
    );
    const BB = await AA.json();
    console.log(BB);
    response.json(BB);
})

app.get("/externalApi/reviews/:steamAppId", async (request, response)=>{
    
    console.clear();
    console.log("===Reviews requested===");

    let reviewsCounter = 0;
    let iterationCounter = 0;
    let previousCursor = undefined;
    let currentCursor = "*";
    let allReviews = [];
    let cursorHistory = [];
    cursorHistory.push([previousCursor, currentCursor]);

    while(true)
    {
        let appReviews;
        // if(currentCursor === undefined)
        // {
        //     console.log("==============================================First batch==============================================");
        //     appReviews = `https://store.steampowered.com/appreviews/${request.params.steamAppId}?json=1`;
        // }
        // else
        // {
            console.log(`("==============================================Batch number ${parseInt(iterationCounter++)}==============================================`);
            appReviews = `https://store.steampowered.com/appreviews/${request.params.steamAppId}?json=1&cursor=${encodeURIComponent(currentCursor)}`;
        //}

        const reviews = await fetch(appReviews ,{
            'ContentType':'application/x-www-form-urlencoded'
        });
        const reviews_json = await reviews.json();

        allReviews.push(reviews_json);
        //console.log(review_json);

        previousCursor = currentCursor;
        currentCursor = reviews_json.cursor;  
        if(previousCursor == currentCursor)
        {
            break;
        }

        console.log(currentCursor);
        cursorHistory.push(currentCursor);

        for(let item of reviews_json.reviews)
        {
            console.log(reviewsCounter++);
            console.log(item.review);
        }
    }

    console.log("cursorHistory");
    console.log(cursorHistory);
    console.log("=============");

    response.json(allReviews);
})