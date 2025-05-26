import {Router} from "express"
import { getProfile, login, logout, register } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();


router.post("/register",register)

router.post("/login",login)

router.get("/logout",verifyJWT,logout)

router.get("/me",verifyJWT,getProfile)


export default router;