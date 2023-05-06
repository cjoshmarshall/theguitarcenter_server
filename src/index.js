const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const path = require("path");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => db.connection.readyState)
  .then(() => console.log("Database Connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/guitars", require("./routes/productRoute"));
app.use("/api/orders", require("./routes/orderRoute"));
app.use("/api/newsletter", require("./routes/newsletterRoute"));

// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client/build/index.html"));
//   });
// }

app.get("/", (req, res) => res.send("Server Running"));

// * Local Server
// app.listen(process.env.PORT || 3006, () => {
//   console.log("Connected");
// });

module.exports = app;
