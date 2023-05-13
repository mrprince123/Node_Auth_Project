import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/user.js';
import taskRouter from './routes/task.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Just want to send the cookies to the front-end
})
);

// Using Routes
app.use("/api/v1/user", userRouter);
app.use('/api/v1/task', taskRouter);


app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>");
});


// This is for the custom error handeling using the ErrorMiddlware
app.use(errorMiddleware)


// This is called MVC - Model View Controller 




