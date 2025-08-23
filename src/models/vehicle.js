import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicle_id: { type: String, required: true, unique: true },
  make: String,
  model: String,
  year: Number,
  type: String,
  seats: Number,
  transmission: String,
  fuel_type: String,
  mileage: Number,
  registration_no: String,
  status: String,
  location: String,
  daily_rate: Number,
  image_url: String,
  features: [String],
  last_serviced: Date
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
