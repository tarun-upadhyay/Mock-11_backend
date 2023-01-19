const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { UsersModel } = require("./Models/Users.model");
const { connection } = require("./Config/db");
const { MajorbugRouter } = require("./Routes/Major.route");
const { CriticalBugModel } = require("./Models/CriticalBug.model");
const { CriticalbugRouter } = require("./Routes/Criticalbug.route");
const { LowbugRouter } = require("./Routes/LowBug.route");
const { MediumbugRouter } = require("./Routes/Medium.route");
const { auth } = require("./Middlewares/authentication");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to home");
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const check = await UsersModel.findOne({ email });
  if (check) {
    res.send("Already had registerd plz login");
  } else {
    try {
      bcrypt.hash(password, 6, async function (err, hash) {
        const user = new UsersModel({ email, password: hash });
        await user.save();
        res.send("Sign Up Successfull");
      });
    } catch (e) {
      console.log(e);
      res.send({ msg: "Something went wrong contact admin" });
    }
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await UsersModel.find({ email });
    if (user.length > 0) {
      const h_p = user[0].password;
      bcrypt.compare(password, h_p, function (err, result) {
        if (result) {
          const token = jwt.sign({ userId: user[0]._id }, "MOCK");
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.send({ msg: "User Not found Plz Signup First" });
    }
  } catch (er) {
    res.send("Something went wrong, please try again later");
  }
});
app.use(auth)
app.use("/major", MajorbugRouter);
app.use("/critical", CriticalbugRouter);
app.use("/low", LowbugRouter);
app.use("/medium", MediumbugRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB Successfully");
  } catch (e) {
    console.log("Error to connecting db");
    console.log(e);
  }
  console.log(`listing on ${process.env.PORT}`);
});
