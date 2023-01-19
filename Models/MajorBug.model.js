const mongoose = require("mongoose");
const majorbugSchema = mongoose.Schema({
  title : String
});
const MajorBugModel = mongoose.model("Majorbugs", majorbugSchema);
module.exports = { MajorBugModel}