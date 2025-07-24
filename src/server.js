import express from "express";
import dotenv from "dotenv";
import {initDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionsRoute.js"
import cors from "cors";

dotenv.config();

// Initialisation
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());
// app.use(rateLimiter)

// Routes
app.use('/api/transactions',transactionRoute)

app.get("/",(req,res)=>{
    res.send("API IS RUNNING");
})

// Server
initDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Running on PORT: ${PORT}`)
    });
});
