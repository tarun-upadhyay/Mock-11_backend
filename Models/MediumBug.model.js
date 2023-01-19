const mongoose = require("mongoose");
const mediumbugSchema = mongoose.Schema({
  title : String
});
const MediumBugModel = mongoose.model("Mediumbugs", mediumbugSchema);
module.exports = { MediumBugModel}