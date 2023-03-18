const express    = require("express");
const datastore  = require("nedb");

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
app.listen(3232, ()=>console.log("listening using port 3232"));
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