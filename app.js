const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , (req , res) =>{
    res.sendFile(__dirname + "/index.html");
});
app.post("/" , (req , res)=>{
    let query = req.body.city;
    // console.log(query);
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=fd2c037f53f026efbb11b5e59ec8a312&units=metric"
    https.get( url , (response )=>{
        response.on("data" , (data)=>{
            data = JSON.parse(data);
            res.write("<h1>"+data.weather[0].description+"</h1>");
            res.write(`<h1>${data.main.temp} degree celcius </h1>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`);
            res.send();

        })
    });
    // console.log(url);
});
app.listen(3000 , ()=>{
    console.log("server started");
});