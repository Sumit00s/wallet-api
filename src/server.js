import express from "express";
import dotenv from "dotenv";
import {initDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js"
import cors from "cors";

import job from "./config/cron.js";

dotenv.config();

// Initialisation
const app = express();
const PORT = process.env.PORT;

if(process.env.NODE_ENV === "production") job.start();

// middleware
app.use(cors());
app.use(express.json());
// app.use(rateLimiter)

// Routes
app.use('/api/transactions',transactionRoute)

app.get("/api/health",(req,res)=>{
    res.status(200).json({status:"ok"})
})

// Server
initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Running on PORT: ${PORT}`)
    });
});
