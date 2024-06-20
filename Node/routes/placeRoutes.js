const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

router.get('/', placeController.getAllPlaces);
router.get("/", placeController.getAllPlaces);
router.get("/:id", placeController.getPlaceById);
router.patch("/:id", placeController.updatePlace);
router.delete("/:id", placeController.deletePlace);

module.exports = router;
