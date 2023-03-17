const express = require("express");

const app = express();
app.listen(3232, ()=>console.log("listening using port 3232"));
app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

app.post("/api", (request, response)=>{
    console.log("Request received!");
    console.log(request.body);
    response.json(
        {
            staus: 'Success',
            received: request.body
        }
    )
}); 