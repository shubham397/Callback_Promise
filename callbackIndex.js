const port = 1234;
const express = require("express");
const http = require('https');

var app = express();
//get API
app.get('/:continent', (req, res) => {
    const continent = req.params.continent;
    http.get('https://restcountries.eu/rest/v2/region/'+continent, function(response) {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            const detail = JSON.parse(str);
            const country = detail[11].name;
            http.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`, function(response1) {
                var str = ''
                response1.on('data', function (chunk) {
                    str += chunk;
                });

                response1.on('end', function () {
                    const detail = JSON.parse(str);
                    const capital = detail[0].capital;
                    http.get(`https://restcountries.eu/rest/v2/capital/${capital}`, function(response2) {
                        var str = ''
                        response2.on('data', function (chunk) {
                            str += chunk;
                        });

                        response2.on('end', function () {
                            const detail = JSON.parse(str);
                            res.send({
                                name:detail[0].name,
                                capital:detail[0].capital,
                                timeZone : detail[0].timezones[0],
                            });
                        });
                    })
                });
            })
        });
    })
  })

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
