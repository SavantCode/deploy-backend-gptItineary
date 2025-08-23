// Handles itinerary management, ensuring agents can only access their own data.


import mongoose from "mongoose";
import { ItineraryBasic } from "../models/itineraryBasic.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// @desc    Create a new itinerary
// @route   POST /api/v1/itineraries
// @access  Private (Agent)
const createItinerary = asyncHandler(async (req, res) => {
    const { title, destination, customer, duration, details } = req.body;

    const newItinerary = await ItineraryBasic.create({
        title,
        destination,
        customer,
        duration,
        details,
        agent: req.user._id, // Assign ownership to the logged-in agent
    });

    return res.status(201).json(new ApiResponse(201, newItinerary, "Itinerary created successfully"));
});

// @desc    Get all itineraries for the logged-in agent
// @route   GET /api/v1/itineraries
// @access  Private (Agent)
const getMyItineraries = asyncHandler(async (req, res) => {
    const itineraries = await ItineraryBasic.find({ agent: req.user._id });
    return res.status(200).json(new ApiResponse(200, itineraries, "Agent's itineraries retrieved successfully"));
});

// @desc    Update an itinerary
// @route   PUT /api/v1/itineraries/:id
// @access  Private (Agent)
const updateItinerary = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, destination, customer, duration, details } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid itinerary ID");
    }

    const itinerary = await ItineraryBasic.findById(id);

    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found");
    }

    // Crucial Security Check: Ensure the agent owns this itinerary
    if (itinerary.agent.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Forbidden: You are not authorized to update this itinerary");
    }

    const updatedItinerary = await ItineraryBasic.findByIdAndUpdate(
        id,
        { $set: { title, destination, customer, duration, details } },
        { new: true, runValidators: true }
    );

    return res.status(200).json(new ApiResponse(200, updatedItinerary, "Itinerary updated successfully"));
});

// @desc    Delete an itinerary
// @route   DELETE /api/v1/itineraries/:id
// @access  Private (Agent)
const deleteItinerary = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid itinerary ID");
    }

    const itinerary = await ItineraryBasic.findById(id);

    if (!itinerary) {
        throw new ApiError(404, "Itinerary not found");
    }

    // Crucial Security Check: Ensure the agent owns this itinerary
    if (itinerary.agent.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Forbidden: You are not authorized to delete this itinerary");
    }

    await ItineraryBasic.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, {}, "Itinerary deleted successfully"));
});

export {
    createItinerary,
    getMyItineraries,
    updateItinerary,
    deleteItinerary,
};