const express = require("express");
const dotenv = require("dotenv");
const transactionRouter = require("../src/routes/transactionRoutes");
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/transactions", transactionRouter);

app.use(errorHandler);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on the Port ${PORT}`);
});
