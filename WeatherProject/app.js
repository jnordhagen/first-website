const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const apiKey = "7cb02b74d63453fb7040cdea7e6a5824";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      res.write("<h1>Weather in " + weatherData.name + ": " + weatherData.weather[0].description + "</h1>");
      res.write("<p>Temperature: " + weatherData.main.temp + " degrees Fahrenheit</p>")
      res.write("<img src=http://openweathermap.org/img/wn/" + icon + "@2x.png>")
      res.send();
    })
  })
})

app.listen(port, function() {
  console.log("WeatherApp running on port " + port);
})
