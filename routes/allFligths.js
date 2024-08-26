import express from "express";
import {getAllFlightsNumber,delayedFlights,popularDestination,getNumberFromCountry,quickGetaway} from '../controllers/allFlightsController.js';

const router = express.Router();

router.get('/amount',getAllFlightsNumber);
router.get('/numberFromCountry',getNumberFromCountry);
router.get('/delayedNumber',delayedFlights);
router.get('/popular',popularDestination);
router.get('/quickFlight',quickGetaway);


export default router;