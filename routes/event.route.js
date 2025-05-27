import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {authorizedRoles} from "../middleware/role.middleware.js";

const router = Router();


router.get("/",verifyJWT,getAllEvents)

router.post("/create",verifyJWT,authorizedRoles("admin"),createEvent)

router.put("/update/:id",verifyJWT,authorizedRoles("admin"),updateEvent)

router.delete("/delete/:id",verifyJWT,authorizedRoles("admin"),deleteEvent)

router.get("/:id",verifyJWT,authorizedRoles("admin"),getEventById)

export default router;