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
    response.json(BB);
    console.log(BB);
})