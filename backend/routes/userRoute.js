import express from "express";
import { adminUser, createUser, deleteUser, getUserById, getUsers, logOutUser, loginUser, updateUserProfile } from "../controllers/user_controller.js";
import { upload } from "../middleware/upload.js";
import { auth, authAdmin } from "./../middleware/authentification.js";

export const userRoute = express.Router()
//admin user Route
userRoute.post('/admin', adminUser)
// POST Route for creating a user with avatar upload
userRoute.post('/signup', upload.single('avatar'), createUser);
//Login Route
userRoute.post('/login', loginUser)
//Logout Route
userRoute.post('/logout', logOutUser)
//Update user
userRoute.put('/update/:userId', auth, upload.single('avatar'), updateUserProfile);
//Get users
userRoute.get('/', auth, authAdmin, getUsers)
userRoute.get('/:userId', auth, authAdmin, getUserById)
//Delete User
userRoute.delete('/:userId', auth, authAdmin, deleteUser)
