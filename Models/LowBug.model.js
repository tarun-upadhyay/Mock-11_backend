const mongoose = require("mongoose");
const lowbugSchema = mongoose.Schema({
  title : String
});
const LowBugModel = mongoose.model("Lowbugs", lowbugSchema);
module.exports = { LowBugModel}