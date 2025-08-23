import mongoose from 'mongoose';

const journeyLegSchema = new mongoose.Schema({
  modeOfTravel: {
    type: String,
    enum: ['Flight', 'Train', 'Bus', 'Car'],
    default: 'Flight',
  },
  fromCity: String,
  toCity: String,
  date: String,
  time: String,
  airline: String,
  flightNo: String,
  airport: String,
  departureTime: String,
  arrivalTime: String,
  stops: Number,
}, { _id: false });

const ItinerarySchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  nationality: { type: String, default: 'Indian' },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  totalTravelers: { type: Number, default: 1, min: 1 },
  totalDays: { type: Number, default: 1, min: 1 },
  tripOverviewTitle: String,
  tripOverviewDetails: String,
  journeyLegs: [journeyLegSchema],
}, { timestamps: true });

export default mongoose.model('Itinerary', ItinerarySchema);
