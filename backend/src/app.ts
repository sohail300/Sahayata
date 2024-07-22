import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/conn";
import userRoute from "./routes/user";
import adminRoute from "./routes/admin";
import districtRoute from "./routes/district";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/district", districtRoute);

app.get("/", (req: Request, res: Response) => {
  console.log("Healthy Server");
  res.send("Healthy Server");
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log(`Server is listening at port 3000`);
});
