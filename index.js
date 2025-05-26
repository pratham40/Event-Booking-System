import { configDotenv } from 'dotenv';
configDotenv();
import express from 'express';
import morgan from 'morgan';
import {connectToDatabase} from "./config/dbConnection.js"
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"))


app.use("/api/v1/auth",authRoutes)

app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Api is working fine"
    })
})


app.listen(process.env.PORT || 3001, async() => {
    await connectToDatabase();
    console.log(`Server is running on port http://localhost:${process.env.PORT || 3001}`);
});