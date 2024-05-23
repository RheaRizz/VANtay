const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/create-van', async (req, res) => {
  const { standby_time, departure_time, destination, driver_name, vanName, licensePlate, capacity } = req.body;

  try {
    // Create van entry
    const van = await prisma.van.create({
      data: {
        model: vanName,
        plate_no: licensePlate,
        capacity: parseInt(capacity),
        userId: 1, // Replace with actual userId if needed
      },
    });

    // Create trip entry
    const trip = await prisma.trip.create({
      data: {
        standby_time: new Date(standby_time),
        departure_time: new Date(departure_time),
        destination,
        driver_name,
        vanId: van.id,
      },
    });

    respond.status(201).json({ van, trip });
  } catch (error) {
    console.error(error);
    respond.status(500).json({ error: 'Failed to create van and trip' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
