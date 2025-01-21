import express from "express";
import { adminUser, createUser, logOutUser, loginUser } from "../controllers/user_controller.js";

export const userRoute = express.Router()
//admin user Route
userRoute.post('/admin', adminUser)
//Signup Route
userRoute.post('/signup', createUser);
//Login Route
userRoute.post('/login', loginUser)
//Logout Route
userRoute.post('/logout', logOutUser)
