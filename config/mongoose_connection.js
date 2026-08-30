const mongoose = require("mongoose");
const config = require("config");
const debug = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(() => debug("MongoDB connected"))
  .catch((error) => debug("MongoDB connection failed", error.message));

module.exports = mongoose.connection;
