import express, { Express } from "express";
import dotenv from "dotenv";
import { ticketRouter } from "../src/routes/ticketRoutes";
import { userRouter } from "../src/routes/userRoutes";
import { vanRouter } from "../src/routes/vanRoutes";
import { tripRouter } from "../src/routes/tripRoutes";
import authRouter from "../src/routes/authRoutes"
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
app.use(express.json());

app.use("/api/ticket", ticketRouter);
app.use("/api/user", userRouter);
app.use("/api/van", vanRouter);
app.use("/api/trip", tripRouter);
app.use("/api", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
