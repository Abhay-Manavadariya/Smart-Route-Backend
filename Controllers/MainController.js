const VehicleInfoModel = require("../Models/VehicleInfo");
const PathModel = require("../Models/Path");

const submit_info = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const {
      vehicleType,
      vehicleNumber,
      vehicleMass,
      currentLocation,
      destinationLocation,
    } = req.body;

    if (
      !vehicleType ||
      !vehicleNumber ||
      !vehicleMass ||
      !currentLocation ||
      !destinationLocation
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingVehicle = await VehicleInfoModel.findOne({
      vehicle_number: vehicleNumber,
    });
    if (existingVehicle) {
      return res
        .status(409)
        .json({ message: "Vehicle with this number already exists." });
    }

    const existingPath = await PathModel.findOne({
      "start_location.latitude": currentLocation.lat,
      "start_location.longitude": currentLocation.lng,
      "end_location.latitude": destinationLocation.lat,
      "end_location.longitude": destinationLocation.lng,
    });

    let pathId;
    let vehicleId;

    if (existingVehicle) {
      vehicleId = existingVehicle._id;
    } else {
      const vehicle = new VehicleInfoModel({
        vehicle_type: vehicleType,
        vehicle_number: vehicleNumber,
        vehicle_mass: vehicleMass,
        user_id: userId,
      });

      const saveVehicle = await vehicle.save();
      vehicleId = saveVehicle._id;
    }

    if (existingPath) {
      pathId = existingPath._id;
    } else {
      const newPath = new PathModel({
        start_location: {
          latitude: currentLocation.lat,
          longitude: currentLocation.lng,
        },
        end_location: {
          latitude: destinationLocation.lat,
          longitude: destinationLocation.lng,
        },
      });

      const savedPath = await newPath.save();
      pathId = savedPath._id;
    }

    res
      .status(200)
      .json({ message: "Data submitted successfully! 🎉", pathId, vehicleId });
  } catch (error) {
    console.error("Error submitting info:", error);

    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { submit_info };
