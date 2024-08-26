import express from "express";
import {getNumberOfOutboundFlights,getNumberFromCountry} from '../controllers/outboundController.js';

const router = express.Router();

router.get('/amount',getNumberOfOutboundFlights);
router.get('/numberFromCountry',getNumberFromCountry);

export default router;