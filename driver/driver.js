const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.argv.slice(2)[0];

app.use(bodyParser.json());

const statusService = `http://localhost:8081`;

const parking = [
    { id: 0, name: 'ground parking' },
    {id: 1, name: 'underground parking'} 
  ];

const drivers = [
    {
        id: 10,
        model: "BMW",
        yearOfCar: '2001',
        parking: [0]
    },
    {
        id: 11,
        model: "LADA",
        yearOfCar: '2002',
        parking: [1]
    },
    {
        id: 12,
        model: "NISSAN",
        yearOfCar: '1996',
        parking: [0]
    },
    {
        id: 13,
        model: "MAZDA",
        yearOfCar: '1988',
        parking: [0]
    },
    {
        id: 14,
        model: "AUDI",
        yearOfCar: '2005',
        parking: [1]
    },
];

app.get('/drivers', (req, res) => {
    console.log('Returning drivers list');
    res.send(drivers);
});

app.get('/parking', (req, res) => {
    console.log('Returning parking list');
    res.send(parking);
  });
  
  app.post('/driver/**', (req, res) => {
    const driverId = parseInt(req.params[0]);
    const foundDriver = users.find(subject => subject.id === userId);
  
    if (foundDriver) {
        for (let attribute in foundUser) {
            if (req.body[attribute]) {
                foundDriver[attribute] = req.body[attribute];
                console.log(`Set ${attribute} to ${req.body[attribute]} in driver: ${driverId}`);
            }
        }
        res.status(202).header({Location: `http://localhost:${port}/driver/${foundDriver.id}`}).send(foundDriver);
    } else {
        console.log(`driver not found.`);
        res.status(404).send();
    }
  });
  
  
  console.log(`driver service listening on port ${port}`);
  app.listen(port);