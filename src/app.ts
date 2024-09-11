import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index';
import errorMiddleware from './middleware/error.middleware';
const app = express();

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.use(errorMiddleware);

export default app;