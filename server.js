require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const path = require("path");

const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const dbConnect = require("./config/dbConnect");

dbConnect();
app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/", require("./routes/rootRoute"));
app.use("/books", require("./routes/booksRoute"));

app.all("*", (req, res) => {
  res.status(401);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404Page.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "Requsted page is not found" });
  } else {
    res.type("txt").send("No Data Found!!!");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Database Connected Successfully");
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err.hostname);
});
