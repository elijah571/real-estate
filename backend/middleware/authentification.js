import jwt from "jsonwebtoken";
import { User } from "./../models/userModel.js";

// Authentication middleware to verify the user token
export const auth = async (req, res, next) => {
    let token;

    // Get token from cookies
    token = req.cookies.token;

    if (token) {
        try {
            // Decode token and extract user ID
            const decodeToken = jwt.verify(token, process.env.JWT_SECRETE);
            
            // Find user by ID and exclude password
            req.user = await User.findById(decodeToken.id).select("-password");

            if (!req.user) {
                return res.status(404).json({ message: "User not found" });
            }

            
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "No authorization, invalid token" });
        }
    } else {
        return res.status(401).json({ message: "Authorization failed, no token" });
    }
};

// Middleware to authenticate admin user
export const authAdmin = async (req, res, next) => {
    // Check if user is authenticated and is an admin
    if (req.user && req.user.isAdmin) {
        return next();  
    } else {
        return res.status(403).json({ message: "Unauthorized, admin privileges required" });
    }
};
