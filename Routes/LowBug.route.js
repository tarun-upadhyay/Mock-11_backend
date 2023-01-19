const express = require("express");
const {LowBugModel} = require("../Models/LowBug.model")
const LowbugRouter = express.Router();

LowbugRouter.get("/", async (req, res) => {
  const bugs = await LowBugModel.find({});
  res.send(bugs);
});

LowbugRouter.post("/add", async (req, res) => {
  const payload = req.body;
  
   try {
    const new_bugs = new LowBugModel(payload);
    await new_bugs.save();
    res.send({ msg: "Bug ADDED Successfull" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something WEnt wrong" });
  }
});


LowbugRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await LowBugModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  });

module.exports = { LowbugRouter };
