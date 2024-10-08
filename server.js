const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const commentsRoute = require("./routes/comments");
const authRoute = require("./routes/auth");

app.get("/", (req, res)=>{
    res.send("Welcome")
})

app.use("/api/comments", commentsRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
