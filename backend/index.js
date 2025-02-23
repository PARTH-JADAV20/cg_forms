import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.config.js";
import userRoutes from "./routes/UserRoutes.js";
import passport from "passport";
import cookieSession from "cookie-session";
// import {passportSetup} from "./config/passport.config.js"

const app = express();
dotenv.config();

app.use(
    cookieSession({
        name:"session",
        keys:["google_forms"],
        maxAge:24*60*60*100,
    })
)

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8080;
app.use(cors())

connectDB().catch(err => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/users', userRoutes);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})