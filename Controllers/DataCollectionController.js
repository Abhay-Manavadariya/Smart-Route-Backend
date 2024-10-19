const mongoose = require("mongoose");
const TripModel = require("../Models/Trip");
const GeoLocationDataModel = require("../Models/GeoLocationData");
const VehicleInfoModel = require("../Models/VehicleInfo");

const Data_Collection = async (req, res) => {
  try {
    const { locationHistory, pathId, userId, vehicleId } = req.body;
    const pathObjectId = new mongoose.Types.ObjectId(pathId);
    const vehicleObjectId = new mongoose.Types.ObjectId(vehicleId);
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const vehicle = await VehicleInfoModel.findById(vehicleObjectId);
    const mass = vehicle.vehicle_mass;

    let totalSpeed = 0;
    let totalKineticEnergy = 0;

    const updatedLocationHistory = locationHistory.map((location) => {
      const speed = location.speed || 0;
      totalSpeed += speed;
      const kineticEnergy = 0.5 * mass * Math.pow(speed, 2);
      totalKineticEnergy += kineticEnergy;
      return {
        ...location,
        kineticEnergy,
      };
    });

    const averageSpeed = totalSpeed / locationHistory.length; 
    const averageKineticEnergy =
      totalKineticEnergy / locationHistory.length;

    const trip = new TripModel({
      start_time: new Date(locationHistory[0].timestamp),
      end_time: new Date(locationHistory[locationHistory.length - 1].timestamp),
      path_id: pathObjectId,
      vehicle_id: vehicleObjectId,
      user_id: userObjectId,
    });

    const saveTrip = await trip.save();

    let tripId = saveTrip._id;

    const geoLocation = new GeoLocationDataModel({
      geolocation_data: updatedLocationHistory,
      trip_id: tripId,
      average_speed: averageSpeed,
      average_kinetic_energy: averageKineticEnergy,
    });

    await geoLocation.save();

    res.status(200).json({ message: "Data submitted successfully! 🎉" });
  } catch (error) {
    console.error("Error submitting info:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { Data_Collection };
