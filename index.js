//Server

require('dotenv').config();
const express = require('express');
const fetch = require("node-fetch");
const app = express();

app.listen(3000, () => { console.log('litening at 3000') });
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));



app.get('/weather/:latlon', async (request, response) => {
    const wheather_api = process.env.API_KEY;

    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];

    const weather_url = `https://api.darksky.net/forecast/${wheather_api}/${lat},${lon}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    const data = {
        weather: weather_data,
        air_quality: aq_data
    }


    response.json(data);


});


