// Defines all routes that are private and accessible only by an ADMIN.

import { Router } from "express";
import { 
    createAgent, 
    getAllAgents, 
    getAllItineraries, 
    toggleAgentStatus 
} from "../controllers/admin.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";
import { USER_ROLES } from "../constants.js";

const router = Router();

// Apply JWT verification and Admin role authorization to all routes in this file
router.use(verifyJWT, authorizeRoles(USER_ROLES.ADMIN));

router.route("/agents").post(createAgent).get(getAllAgents);
router.route("/agents/:id/status").patch(toggleAgentStatus);

router.route("/itineraries").get(getAllItineraries);
// Add other admin-specific routes here (e.g., getting all customers, leads etc.)

export default router;

