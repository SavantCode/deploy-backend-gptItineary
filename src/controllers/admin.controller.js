// Contains all business logic for Admin-only actions like managing agents and viewing all data.



import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ItineraryBasic } from "../models/itineraryBasic.model.js";
import { USER_ROLES } from "../constants.js";

// @desc    Create a new agent
// @route   POST /api/v1/admin/agents
// @access  Private (Admin)
const createAgent = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const agent = await User.create({
        name,
        email,
        password,
        role: USER_ROLES.AGENT,
    });

    const createdAgent = await User.findById(agent._id).select("-password -refreshToken");

    if (!createdAgent) {
        throw new ApiError(500, "Something went wrong while creating the agent");
    }

    return res.status(201).json(new ApiResponse(201, createdAgent, "Agent created successfully"));
});

// @desc    Get all agents
// @route   GET /api/v1/admin/agents
// @access  Private (Admin)
const getAllAgents = asyncHandler(async (req, res) => {
    const agents = await User.find({ role: USER_ROLES.AGENT }).select("-password -refreshToken");
    return res.status(200).json(new ApiResponse(200, agents, "Agents retrieved successfully"));
});

// @desc    Activate or deactivate an agent
// @route   PATCH /api/v1/admin/agents/:id/status
// @access  Private (Admin)
const toggleAgentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { isActive } = req.body; // Expecting { "isActive": true } or { "isActive": false }

    if (typeof isActive !== "boolean") {
        throw new ApiError(400, "Invalid status provided. 'isActive' must be a boolean.");
    }
    
    const agent = await User.findByIdAndUpdate(
        id,
        { $set: { isActive } },
        { new: true }
    ).select("-password -refreshToken");

    if (!agent) {
        throw new ApiError(404, "Agent not found");
    }

    const status = agent.isActive ? "activated" : "deactivated";
    return res.status(200).json(new ApiResponse(200, agent, `Agent account has been ${status}.`));
});

// @desc    Get all itineraries from all agents
// @route   GET /api/v1/admin/itineraries
// @access  Private (Admin)
const getAllItineraries = asyncHandler(async (req, res) => {
    const itineraries = await ItineraryBasic.find({}).populate("agent", "name email");

    return res.status(200).json(new ApiResponse(200, itineraries, "All itineraries retrieved successfully"));
});


export { createAgent, getAllAgents, toggleAgentStatus, getAllItineraries };