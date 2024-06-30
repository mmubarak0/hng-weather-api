#!/usr/bin/env node
/* This is my first project with express.js and node.js.
 I'm using VIM BTW.
 it's a simple server that fetches the client's
 IP address, location and the temperature in that location

 * Author: @ki2kid
*/

const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const port = 8080;
//const port = 3000;

require('dotenv').config();
app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  const vname = req.query.visitor_name || "visitor";
  const FallbackIP = "91.208.207.141";
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || FallbackIP;
  // We can't get the client's IP address in localhost
  if (ip.includes('::1') || ip.includes('127.0.0.1')) {
    ip = FallbackIP;
  }
  const ipinfo = `http://ipinfo.io/${ip}/json`;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const openweather = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  try {
    request(ipinfo, (err, response, body) => {
      if (err) {
        console.log(err);
      }
      const data = JSON.parse(body);
      const city = data.city;
      try {
        const openweatherUrl = `${openweather}&appid=${apiKey}&lat=${data.loc.split(',')[0]}&lon=${data.loc.split(',')[1]}`;

        request(openweatherUrl, (err, response, body) => {
          if (err) {
            console.log(err);
          }
          const data = JSON.parse(body);
          const temp = data.main.temp;
          return res.json({
            client_ip: ip,
            location: city,
            greeting: `Hello, ${vname} the temperature is ${temp.toFixed(2)} degrees celcius in ${city}` });
        });
      } catch (error) {
        console.log(error);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
