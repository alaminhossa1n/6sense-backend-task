import express, { Application } from "express";
import { categoryRoutes } from "./app/modules/Category/category.routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { productRoutes } from "./app/modules/Product/product.routes";

const app: Application = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use(globalErrorHandler);

export default app;
