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


const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter)

// Routes with /api 
app.get('/api/user', (req, res) => {
    res.json("Requesting for User details");
})
app.post('/api/user/1', (req, res) => {
    res.json("Trying to update user");
})


// We can create multiple rule for different api, 
// below rule only allow user to create account 5 times within 1 hour from same IP address
const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.post('/create-account', createAccountLimiter, (req, res) => {
    res.json("account created");
})



app.listen(3000, () => {
    console.log("Server is Successfully Running, and App is listening on port "+ 3000)
});


