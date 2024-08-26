import axios from "axios";

const BASE_URL = "https://data.gov.il/api/3/action/datastore_search";
const RESOURCE_ID = 'e83f763b-b7d7-479e-b172-ae981ddc6de5';
const LIMIT =300;

//getting number of all outnbound Flights
export const getNumberOfOutboundFlights = async (req,res) =>{
    try {
        const response = await axios.get(BASE_URL,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const outboundFlights = flights.filter(flight=>flight['CHCINT'] && flight['CHCKZN']) //if both not empty=> outbound flight  
        res.json({
            "number":outboundFlights.length
        });
    } catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}

//getting the number of outbounding flights from specific country
export const getNumberFromCountry = async (req,res) =>{
    const country = req.query.country; 
    try{
        const response = await axios.get(BASE_URL,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const inboundFlights = flights.filter(flight => flight['CHLOCCT'] === country && (flight['CHCINT'] && flight['CHCKZN'])); //if CHCINT AND CHCKZN not empty=> outbound flight AND CHLOCCT gives us country

        res.json({
            "number":inboundFlights.length
        })
    }catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}


