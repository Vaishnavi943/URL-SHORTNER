import express from 'express';
import dotenv from 'dotenv';
dotenv.config("./.env"); 
import connectDB from './src/config/mongo.config.js';
import shortUrlRoute from './src/routes/shortUrl.route.js';
import authRoutes from './src/routes/auth.route.js';
import userRoutes from './src/routes/user.route.js';
import { redirectFromShortUrl } from './src/controller/short_url.controller.js';
import errorHandler from './src/utils/errorHandler.js';
import cors from 'cors';
import { attachUser } from './src/utils/attachUser.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json())     // body parser
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(attachUser);

// POST = create route
app.use("/api/auth", authRoutes)
app.use("/api/create", shortUrlRoute)

// all user urls
app.use("/api/user", userRoutes);

// GET = Redirection
app.get("/:id", redirectFromShortUrl)



// error handler
app.use(errorHandler);

app.listen(3000, () => {
    connectDB()
    console.log("server is running on http://localhost:3000");
})