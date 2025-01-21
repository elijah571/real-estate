import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import { generate_token } from "../utils/generate_token_and_cookies.js";

// Create User
export const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashPassword
        });

        await user.save();

        res.status(201).json( user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExist = await User.findOne({ email }); 
        if (userExist) {
            const correctPassword = await bcrypt.compare(password, userExist.password); 

            if (correctPassword) {
                await generate_token(res, userExist._id)
                return res.status(200).json({ message: "User logged in successfully" });
            } else {
                return res.status(401).json({ message: "Invalid password" });
            }
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
// Log Out User
export const logOutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
    
    res.status(200).json({ message: "User logged out successfully" });
};
export const adminUser = async (req, res) => {
    try {
        // Check if the admin user already exists
        const existingAdmin = await User.findOne({ email: "elijahfx43@gmail.com" });
        if (existingAdmin) {
            console.log('Admin user already exists');
            return res.status(400).json({ message: 'Admin user already exists' });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash('123456789', 10);

        // Create the admin user
        const adminUser = new User({
            name: "Elijah",
            email: "elijahfx43@gmail.com",
            password: hashPassword,
            isAdmin: true, // Assuming you have an isAdmin field in your schema
        });

        // Save the user to the database
        await adminUser.save();

        console.log('Admin user created successfully');
        res.status(201).json({ message: 'Admin user created successfully' });
    } catch (error) {
        console.error('Error creating admin user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



