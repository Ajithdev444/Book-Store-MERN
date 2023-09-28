import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1 : Allow all origins with default of cors(*)
app.use(cors());
// option 2 : Allow custom origins
// app.use({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"],
// });

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connect to database");
    app.listen(PORT, () => {
      console.log(`App is listening ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
