import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/connectDb.js";
import { orderRoute } from "./routes/order_route.js";
import { propertyRoute } from "./routes/propertyRoute.js";
import { userRoute } from "./routes/userRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// API routes
app.use('/api/user', userRoute);
app.use('/api/properties', propertyRoute); 
app.use('/api/order', orderRoute)

app.listen(PORT, () => {
  console.log('Server is running on port:', PORT);
});
