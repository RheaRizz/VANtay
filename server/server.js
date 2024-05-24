const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = 5000;

app.use(bodyParser.json());

app.post('/api/create-van', async (req, res) => {
  const { vanName, licensePlate, driverName, capacity, standby_time, departure_time, destination } = req.body;

  try {
    const van = await prisma.van.create({
      data: {
        model: vanName,
        plate_no: licensePlate,
        capacity,
        user: {
          connect: {
            id: 1, // Assuming a user ID of 1 for now
          }
        },
        trips: {
          create: {
            standby_time: new Date(standby_time),
            departure_time: new Date(departure_time),
            destination,
            driver_name: driverName
          }
        }
      }
    });
    res.status(201).json(van);
  } catch (error) {
    console.error('Error creating van:', error);
    res.status(500).json({ error: 'Failed to create van' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
