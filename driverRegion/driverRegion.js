const express = require('express');
const port = process.argv.slice(2)[0];
const request = require('request');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const parkingService = 'http://localhost:8082';

const regions = [
    {
        id: 10,
        type: "Belarus",
        assignedParkings: 0
    },
    {
        id: 11,
        type: "Russia",
        assignedParkings: 0
    },
    {
        id: 12,
        type: "Another world",
        assignedParkings: 0
    },
];



app.get('/regions', (req, res) => {
    console.log('Returning regions list');
    res.send(regions);
});

app.post('/assignment', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${parkingService}/parkings/${req.body.parkingId}`,
        body: `{
          
      }`
    }, (err, driverResponse, body) => {
        if (!err) {
            const regionId = parseInt(req.body.regionId);
            const region = regions.find(subject => subject.id === regionId);
            region.assignedParkings = req.body.parkingId;
            res.status(202).send(region);
        } else {
            res.status(400).send({ problem: `region Service responded with issue ${err}` });
        }
    });
});




console.log(`parking service listening on port ${port}`);
app.listen(port);