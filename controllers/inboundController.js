const axios = require("axios");

const BASE_URL = "https://data.gov.il/api/3/action/datastore_search";
const RESOURCE_ID = 'e83f763b-b7d7-479e-b172-ae981ddc6de5';
const LIMIT =300;


//getting number of all inbound Flights
const getNumberOfInboundFlights = async (req,res) =>{
    try {
        const response = await axios.get(`${BASE_URL}`,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const inboundFlights = flights.filter(flights => !flights['CHCINT'] && !flights['CHCKZN']
        );//if both empty=> inbound flight 

        res.json({
            "number":inboundFlights.length
        });
    } catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}
//getting the number of inbounding flights from specific country
const getNumberFromCountry = async (req,res) =>{
    const country = req.query.country; 
    try{
        const response = await axios.get(`${BASE_URL}`,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const inboundFlights = flights.filter(flights => flights['CHLOCCT'] === country && (!flights['CHCINT'] && !flights['CHCKZN']));////if CHCINT AND CHCKZN  empty=> inbound flight AND CHLOCCT gives us country 

        res.json({
            "country":country,
            "number":inboundFlights.length
        })
    }catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}


module.exports = {getNumberOfInboundFlights,getNumberFromCountry};