const express = require("express");
const {MajorBugModel} = require("../Models/MajorBug.model")
const MajorbugRouter = express.Router();

MajorbugRouter.get("/", async (req, res) => {
  const bugs = await MajorBugModel.find({});
  res.send(bugs);
});

MajorbugRouter.post("/add", async (req, res) => {
  const payload = req.body;
  
   try {
    const new_bugs = new MajorBugModel(payload);
    await new_bugs.save();
    res.send({ msg: "Bug ADDED Successfull" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something WEnt wrong" });
  }
});


MajorbugRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await MajorBugModel.findByIdAndDelete({ _id: id });
  res.send({ msg: "Deleted Successfully" });
});
module.exports = { MajorbugRouter };
