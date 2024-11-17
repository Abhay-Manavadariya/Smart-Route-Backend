const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleInfo",
      required: true,
    },
    path_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Path",
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const TripModel = mongoose.model("Trip", tripSchema);
module.exports = TripModel;
