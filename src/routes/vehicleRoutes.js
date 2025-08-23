import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Vehicle from '../models/vehicle.js';

const router = express.Router();

// Get all vehicles (with optional filtering)
router.get('/', async (req, res) => {
  const filters = req.query;
  const query = {};

  // Apply filtering based on query params
  if (filters.type) query.type = filters.type;
  if (filters.status) query.status = filters.status;
  if (filters.location) query.location = filters.location;
  if (filters.seats) query.seats = Number(filters.seats);

  try {
    const vehicles = await Vehicle.find(query);
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single vehicle
router.get('/:id', async (req, res) => {
  const vehicle = await Vehicle.findOne({ vehicle_id: req.params.id });
  if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(vehicle);
});

// Add vehicle
router.post('/', async (req, res) => {
  const vehicle = new Vehicle({
    ...req.body,
    vehicle_id: uuidv4()
  });
  try {
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update vehicle
router.put('/:id', async (req, res) => {
  const updated = await Vehicle.findOneAndUpdate(
    { vehicle_id: req.params.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(updated);
});

// Delete vehicle
router.delete('/:id', async (req, res) => {
  const deleted = await Vehicle.findOneAndDelete({ vehicle_id: req.params.id });
  if (!deleted) return res.status(404).json({ error: 'Vehicle not found' });
  res.json(deleted);
});

export default router;
