const { submit_info } = require("../Controllers/MainController");
const { Data_Collection } = require("../Controllers/DataCollectionController");
const { Auth } = require("../Middlewares/Auth");
const router = require("express").Router();

router.post("/submit_info", Auth, submit_info);
router.post("/data_collection", Auth, Data_Collection);

module.exports = router;
