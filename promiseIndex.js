const port = 1234;
const express = require("express");
const axios = require('axios');

var app = express();

app.get('/:continent', (req, res) => {
    const continent = req.params.continent;
    axios.get('https://restcountries.eu/rest/v2/region/'+continent)
    .then(function (response) {
        const data = response.data;
        const country = data[11].name;
        return axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`)
    })
    .then(function (response1){
        const data = response1.data;
        const capital = data[0].capital;
        return axios.get(`https://restcountries.eu/rest/v2/capital/${capital}`)
    })
    .then(function (response2){
        const data = response2.data;
        res.send({
            name:data[0].name,
            capital:data[0].capital,
            timeZone : data[0].timezones[0],
        })
    })
    .catch(function (error) {
        console.log(error);
    });
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});