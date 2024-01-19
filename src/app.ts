import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productsRoute from "./routes/products";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/products", productsRoute)


mongoose.connect("YOUR_MONGO_CONNECTION_STRING").then(() => app.listen(3000, () => console.log("Listening on port 3000"))).catch((error) => console.log(error));
