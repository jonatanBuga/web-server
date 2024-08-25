const express = require("express");
const router = express.Router();
const path = require("path");
const {getNumberOfInboundFlights,getNumberFromCountry} = require('../controllers/inboundController');



router.get('/amount',getNumberOfInboundFlights);
router.get('/numberFromCountry',getNumberFromCountry);

module.exports = router;