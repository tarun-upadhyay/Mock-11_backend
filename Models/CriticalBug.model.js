const mongoose = require("mongoose");
const criticalbugSchema = mongoose.Schema({
  title : String
});
const CriticalBugModel = mongoose.model("Criticalbugs", criticalbugSchema);
module.exports = { CriticalBugModel}