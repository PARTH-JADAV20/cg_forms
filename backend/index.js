import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.config.js";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors())

connectDB().catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})