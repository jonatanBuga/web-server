const express = require("express");
const router = express.Router();
const path = require("path");
const {getNumberOfOutboundFlights,getNumberFromCountry} = require('../controllers/outboundController');



router.get('/amount',getNumberOfOutboundFlights);
router.get('/numberFromCountry',getNumberFromCountry);

module.exports = router;