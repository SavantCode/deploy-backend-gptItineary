// Defines routes for itinerary management, accessible only by an AGENT.


import { Router } from "express";
import {
    createItinerary,
    deleteItinerary,
    getMyItineraries,
    updateItinerary,
} from "../controllers/itinerary.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";
import { USER_ROLES } from "../constants.js";

const router = Router();

// Apply JWT verification and Agent role authorization to all routes
router.use(verifyJWT, authorizeRoles(USER_ROLES.AGENT));

router.route("/").post(createItinerary).get(getMyItineraries);
router.route("/:id").put(updateItinerary).delete(deleteItinerary);

export default router;