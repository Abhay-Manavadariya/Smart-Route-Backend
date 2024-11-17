const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const geoLocationDataSchema = new Schema(
  {
    trip_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    geolocation_data: [],
    average_speed: {
      type: Number,
      default: 0,
    },
    average_kinetic_energy: {
      type: Number,
      default: 0,
    },
    distance: {
      type: Number,
    },
  },
  { timestamps: true }
);

const GeoLocationData = mongoose.model(
  "GeoLocationData",
  geoLocationDataSchema
);
module.exports = GeoLocationData;
