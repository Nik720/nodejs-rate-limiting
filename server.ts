import express from "express";
import { rateLimit } from "express-rate-limit";

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 Minute
    max: 1000,
    standardHeaders: true,
    message: 'Too many requests from this IP, please try again after an hour.'
});

// Apply the rate limiting middleware to all requests
app.use(limiter)



app.listen(3000, () => {
    console.log("Server is Successfully Running, and App is listening on port "+ 3000)
});


