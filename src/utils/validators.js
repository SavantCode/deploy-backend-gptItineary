// src/utils/validators.js
import Joi from 'joi';

export const validateItineraryCreate = (body) => Joi.object({
  clientName: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required(),
  phone: Joi.string().optional(),
  nationality: Joi.string().optional(),
  totalTravelers: Joi.number().integer().min(1).optional(),
  totalDays: Joi.number().integer().min(1).optional(),
  tripOverviewTitle: Joi.string().optional(),
  tripOverviewDetails: Joi.string().optional(),
}).validate(body);

export const validateFlightSuggest = (body) => Joi.object({
  fromCity: Joi.string().min(1).required(),
  toCity: Joi.string().min(1).required(),
  date: Joi.date().iso().required(),
}).validate(body);

export const validateFlightSelect = (body) => Joi.object({
  legIndex: Joi.number().integer().min(0).required(),
  selectedFlight: Joi.object({
    modeOfTravel: Joi.string().optional(),
    fromCity: Joi.string().optional(),
    toCity: Joi.string().optional(),
    date: Joi.date().iso().optional(),
    time: Joi.string().optional(),
    airline: Joi.string().optional(),
    flightNo: Joi.string().optional(),
    airport: Joi.string().optional(),
    departureTime: Joi.string().optional(),
    arrivalTime: Joi.string().optional(),
    stops: Joi.number().optional(),
    duration: Joi.number().optional(),
  }).required(),
}).validate(body);


