import express from "express";
import {getNumberOfInboundFlights,getNumberFromCountry} from '../controllers/inboundController.js';

const router = express.Router();

router.get('/amount',getNumberOfInboundFlights);
router.get('/numberFromCountry',getNumberFromCountry);

export default router;