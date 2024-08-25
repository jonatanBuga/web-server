const express = require("express");
const router = express.Router();
const path = require("path");
const {getAllFlightsNumber,delayedFlights,popularDestination} = require('../controllers/allFlightsController');


router.get('/amount',getAllFlightsNumber);
router.get('/delayedNumber',delayedFlights);
router.get('/popular',popularDestination);
module.exports = router;