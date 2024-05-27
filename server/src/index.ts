
import express, { Express } from "express";
import dotenv from "dotenv";
import ticketRouter from "./routes/ticketRoutes";
import userRouter from "./routes/userRoutes";
import vanRouter from "./routes/vanRoutes";
import tripRouter from "./routes/tripRoutes";
import authRouter from "./routes/authRoutes";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/ticket", ticketRouter);
app.use("/api/user", userRouter);
app.use("/api/van", vanRouter);
app.use("/api/trip", tripRouter); 
app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { app }; 