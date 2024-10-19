const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pathSchema = new Schema(
  {
    start_location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    end_location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

const Path = mongoose.model("Path", pathSchema);
module.exports = Path;
