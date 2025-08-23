import { v4 as uuidv4 } from 'uuid';
import Vehicle from '../models/vehicle.js';

export const getAllVehicles = async (req, res) => {
  const filters = req.query;
  const query = {};

  if (filters.type) query.type = { $regex: new RegExp(filters.type, 'i') };
  if (filters.status) query.status = { $regex: new RegExp(filters.status, 'i') };
  if (filters.location) query.location = { $regex: new RegExp(filters.location, 'i') };
  if (filters.seats) query.seats = Number(filters.seats);
  if (filters.registration_no) query.registration_no = { $regex: new RegExp(filters.registration_no, 'i') };

  // Range filters
  if (filters.minRate || filters.maxRate) {
    query.daily_rate = {};
    if (filters.minRate) query.daily_rate.$gte = Number(filters.minRate);
    if (filters.maxRate) query.daily_rate.$lte = Number(filters.maxRate);
  }

  if (filters.minMileage || filters.maxMileage) {
    query.mileage = {};
    if (filters.minMileage) query.mileage.$gte = Number(filters.minMileage);
    if (filters.maxMileage) query.mileage.$lte = Number(filters.maxMileage);
  }

  if (filters.minYear || filters.maxYear) {
    query.year = {};
    if (filters.minYear) query.year.$gte = Number(filters.minYear);
    if (filters.maxYear) query.year.$lte = Number(filters.maxYear);
  }

  // Features filter
  if (filters.features) {
    const featuresArray = filters.features.split(',').map(f => f.trim());
    query.features = { $all: featuresArray };
  }

  // Pagination & Sorting
  const limit = Number(filters.limit) || 10;
  const page = Number(filters.page) || 1;
  const skip = (page - 1) * limit;

  const sortField = filters.sortBy || 'createdAt';
  const sortOrder = filters.order === 'desc' ? -1 : 1;

  try {
    const vehicles = await Vehicle.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};


export const getVehicle = async (req, res) => {
  const vehicle = await Vehicle.findOne({ vehicle_id: req.params.id });
  if (!vehicle) return res.status(404).json({ error: 'Not found' });
  res.json(vehicle);
};

export const createVehicle = async (req, res) => {
  const vehicle = new Vehicle({ ...req.body, vehicle_id: uuidv4() });
  await vehicle.save();
  res.status(201).json(vehicle);
};

export const updateVehicle = async (req, res) => {
  const updated = await Vehicle.findOneAndUpdate(
    { vehicle_id: req.params.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
};

export const deleteVehicle = async (req, res) => {
  const deleted = await Vehicle.findOneAndDelete({ vehicle_id: req.params.id });
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.json(deleted);
};
