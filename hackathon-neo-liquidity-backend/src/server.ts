import express, { NextFunction, Request, Response } from "express";
import envConfigs from "./config/envConfig";
import connectDb from "./config/connectDb";
import poolRoutes from "./routes/poolRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import bridgeRoutes from "./routes/bridgeRoutes";
import ledgerRoutes from "./routes/ledgerRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
const allowedOrigins = ["http://localhost:3000"];

// CORS middleware configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowedOrigins array
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use CORS middleware with the configured options
app.use(cors(corsOptions));
connectDb();
app.use("/api/pool", poolRoutes);
app.use("/api/bridge", bridgeRoutes);
app.use("/api/ledger", ledgerRoutes);
app.use("/api/token", tokenRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    message,
  });
});

app.listen(envConfigs.port, () => {
  console.log("Server is running on port: ", envConfigs.port);
});
