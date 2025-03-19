//importing--requring
const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");

const cookieParser = require("cookie-parser");

require("dotenv").config();

//middlewares
const corsOptions = {credentials: true}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/images', express.static('public/images'));


//importing or requring routes
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const reviewRoutes = require('./routes/review');

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/feed", feedbackRoutes);
app.use("/api/review", reviewRoutes);

//mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    //start server
    app.listen(process.env.PORT, () => {
      console.log("DB $ Server connected Sucessfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
  
