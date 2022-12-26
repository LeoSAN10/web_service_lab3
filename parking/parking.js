const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.argv.slice(2)[0];
const request = require('request');

app.use(bodyParser.json());

const driversService = 'http://localhost:8081';

const parkings = [
    {
        id: 10,
        cost: "39",
        type: "ground parking",
        assignedDrivers: 0
    },
    {
        id: 11,
        cost: "50",
        type: "underground parking",
        assignedDrivers: 0
    },
];

app.get('/parkings', (req, res) => {
    console.log('Returning parkings list');
    res.send(parkings);
});

app.post('/assignment', (req, res) => {
    request.post({
        headers: { 'content-type': 'application/json' },
        url: `${driversService}/user/${req.body.driverId}`,
        body: `{
          
      }`
    }, (err, driverResponse, body) => {
        if (!err) {
            const parkingId = parseInt(req.body.parkingId);
            const parking = parkings.find(subject => subject.id === parkingId);
            parking.assignedDrivers = req.body.driverId;
            res.status(202).send(parking);
        } else {
            res.status(400).send({ problem: `driver Service responded with issue ${err}` });
        }
    });
});

app.post('/parking/**', (req, res) => {
    const parkingId = parseInt(req.params[0]);
    const foundParking = parkings.find(subject => subject.id === parkingId);
  
    if (foundParking) {
        for (let attribute in foundParking) {
            if (req.body[attribute]) {
                foundParking[attribute] = req.body[attribute];
                console.log(`Set ${attribute} to ${req.body[attribute]} in parking: ${parkingId}`);
            }
        }
        res.status(202).header({Location: `http://localhost:${port}/parking/${foundParking.id}`}).send(foundParking);
    } else {
        console.log(`parking not found.`);
        res.status(404).send();
    }
  });


console.log(`parking service listening on port ${port}`);
app.listen(port);

