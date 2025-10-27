const express = require("express");
const dotenv = require("dotenv");
import  transactionRouter from "../src/routes/transactionRoutes";
import  categoryRouter from "./routes/categoryRoutes";
import userRouter from "./routes/userRoutes";
import accountRouter from "./routes/accountRoutes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/transactions", transactionRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/accounts", accountRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on the Port ${PORT}`);
});
