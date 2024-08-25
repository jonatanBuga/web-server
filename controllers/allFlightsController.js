const axios = require("axios");

const BASE_URL = "https://data.gov.il/api/3/action/datastore_search";
const RESOURCE_ID = 'e83f763b-b7d7-479e-b172-ae981ddc6de5';
const LIMIT =300;


//getting number of all Flights
const getAllFlightsNumber = async (req,res) =>{
    try {
        const response = await axios.get(`${BASE_URL}`,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const outboundFlights = flights.filter(flights=>flights['CHCINT'] && flights['CHCKZN']) //if both not empty=> outbound flight  
        const inboundFlights = flights.filter(flights => !flights['CHCINT'] && !flights['CHCKZN']);//if both empty=> inbound flight 

        const total_amount = outboundFlights.length + inboundFlights.length
        res.json({
            "number":total_amount
        });
    } catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}
const getNumberFromCountry = async (req,res)=>{
    const country = req.query.country; 
    try {
        const response = await axios.get(`${BASE_URL}`,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const specificCountry = flights.filter(flights=>flights['CHLOCCT']===country) //CHLOCCT gives us country name  

        res.json({
            "country":country,
            "number":specificCountry.length
        });
    } catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}
//getting the number of delayed flights
const delayedFlights = (req,res)=>{

}
//getting popular destination city from tel aviv airport. return string of city
const popularDestination = async (req,res)=>{
    try {
        const response = await axios.get(`${BASE_URL}`,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const outboundFlights = flights.filter(flights=>flights['CHCINT'] && flights['CHCKZN']) //finding the outbound flights

        //build map for eche city, {city:number of outbound flight}
        let cityMap ={}
        outboundFlights.forEach(element => {
            
        })


        res.json({
            "number":outboundFlights
        });
    } catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}
module.exports = {getAllFlightsNumber,delayedFlights,popularDestination,getNumberFromCountry};