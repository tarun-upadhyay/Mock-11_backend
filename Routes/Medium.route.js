const express = require("express");
const {MediumBugModel} = require("../Models/MediumBug.model")
const MediumbugRouter = express.Router();

MediumbugRouter.get("/", async (req, res) => {
  const bugs = await MediumBugModel.find({});
  res.send(bugs);
});

MediumbugRouter.post("/add", async (req, res) => {
  const payload = req.body;
  
   try {
    const new_bugs = new MediumBugModel(payload);
    await new_bugs.save();
    res.send({ msg: "Bug ADDED Successfull" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something WEnt wrong" });
  }
});


MediumbugRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await MediumBugModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  });
module.exports = { MediumbugRouter };
