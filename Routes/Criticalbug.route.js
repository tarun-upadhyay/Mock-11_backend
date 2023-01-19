const express = require("express");
const { CriticalBugModel } = require("../Models/CriticalBug.model");
const CriticalbugRouter = express.Router();

CriticalbugRouter.get("/", async (req, res) => {
  const bugs = await CriticalBugModel.find({});
  res.send(bugs);
});

CriticalbugRouter.post("/add", async (req, res) => {
  const payload = req.body;
  const bugs = await CriticalBugModel.find({});
console.log(bugs.length)
  try {
    const new_bugs = new CriticalBugModel(payload);
    await new_bugs.save();
    res.send({ msg: "Bug ADDED Successfull" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something WEnt wrong" });
  }
});


CriticalbugRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await CriticalBugModel.findByIdAndDelete({ _id: id });
  res.send({ msg: "Deleted Successfully" });
});

module.exports = { CriticalbugRouter };
