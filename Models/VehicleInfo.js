const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleInfoSchema = new Schema(
  {
    vehicle_number: { type: String, required: true, unique: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle_type: { type: String, enum: ["car", "bike"], required: true },
    vehicle_mass: { type: Number, required: true },
  },
  { timestamps: true }
);

const VehicleInfoModels = mongoose.model("VehicleInfo", VehicleInfoSchema);
module.exports = VehicleInfoModels;
