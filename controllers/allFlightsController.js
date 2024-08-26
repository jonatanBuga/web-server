import axios from "axios";

const base_url = "https://data.gov.il/api/3/action/datastore_search";
const RESOURCE_ID = 'e83f763b-b7d7-479e-b172-ae981ddc6de5';
const LIMIT =300;


//getting number of all Flights
export const getAllFlightsNumber = async (req,res) =>{
    try {
        const response = await axios.get(base_url,{
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
export const getNumberFromCountry = async (req,res)=>{
    const country = req.query.country; 
    try {
        const response = await axios.get(base_url,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const specificCountry = flights.filter(flights=>flights['CHLOCCT']===country) //CHLOCCT gives us country name  

        res.json({
            "number":specificCountry.length
        });
    } catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}
//getting the number of delayed flights
export const delayedFlights = async (req,res)=>{
    try {
        const response = await axios.get(base_url,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        //for outbounde fligth
        const outboundFlights = flights.filter(flights=>flights['CHCINT'] && flights['CHCKZN']) //if both not empty=> outbound flight  
        let delayedOutboundNumber = 0;
        outboundFlights.forEach(flight =>{
            const estimatedTime = new Date(flight['CHSTOL']);
            const realTime = new Date(flight['CHPTOL']);

            const sameDay = estimatedTime.getUTCFullYear() === realTime.getUTCFullYear() && 
            estimatedTime.getUTCMonth() === realTime.getUTCMonth() && estimatedTime.getUTCDate() === realTime.getUTCDate();

            if(sameDay){
                if((realTime-estimatedTime)/(1000*60)>0)//means that fligth went after his estimated Time in minutes
                    delayedOutboundNumber+=1;
            }
        })



        res.json({
            "number of delayed flight":delayedOutboundNumber
        });
    } catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}
//getting popular destination city from tel aviv airport. return string of city
export const popularDestination = async (req,res)=>{
    try {
        const response = await axios.get(base_url,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });

        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const outboundFlights = flights.filter(flights=>flights['CHCINT'] && flights['CHCKZN']) //finding the outbound flights


        // map for eche city, {city:number of outbound flight}, CHLOC1T city name
        const cityMap = {}
        outboundFlights.forEach(flight => {
            const cityName = flight['CHLOC1T'];
            if(cityName){
                cityMap[cityName] = (cityMap[cityName] || 0)+1;//incress number of showing cityName
            }
        });


        //find the city with maximum outbound flight
        let cityName='';
        let maxOutbound =0;
        for(const city in cityMap){
            if(cityMap[city]>maxOutbound){
                maxOutbound = cityMap[city];
                cityName = city;
            }
        }



        res.json({
            "name":cityName,
        });
    } catch(err){
        console.error(err);
        res.status(500).json({error:"faild to fetch inbound flights"});
    }
}

export const quickGetaway = async(req,res)=>{
    try{
        const response = await axios.get(base_url,{
            params:{
                resource_id:RESOURCE_ID,
                limit:LIMIT
            }
        });


        const flights = response.data.result.records; // array of flights records ,each element is flight object.
        const outboundeFromIsrael = flights.filter(flight => flight['CHCINT'] && flight['CHCKZN']);//if both not empty=> outbound flight
        const inboundToIsrael = flights.filter(flight => !flight['CHCINT'] && !flight['CHCKZN']);//INBOUND

        let quickGetawayFlights = []
        outboundeFromIsrael.forEach(flightOut=>{
            const dateTimeOfFlightout = new Date(flightOut['CHPTOL']);
            inboundToIsrael.forEach(flightIn=>{
                const dateTimeOfFlightIn = new Date(flightIn['CHSTOL']);
                const sameDay = dateTimeOfFlightout.getUTCFullYear() === dateTimeOfFlightIn.getUTCFullYear() && 
                dateTimeOfFlightout.getUTCMonth() === dateTimeOfFlightIn.getUTCMonth() && dateTimeOfFlightout.getUTCDate() === dateTimeOfFlightIn.getUTCDate();
                

                const differenceBetween =(dateTimeOfFlightIn-dateTimeOfFlightout)/(1000 * 60 * 60) // in hours 
                if(flightOut['CHLOC1']===flightIn['CHLOC1']){
                    //consider same date for quick flight
                    if (sameDay){
                        //consider diffrence between flights, 21 is after 3 hours decrese of check in at airport
                        if(differenceBetween>0 && differenceBetween<21){
                            quickGetawayFlights.push({
                                "departure":flightOut['CHOPER']+flightOut['CHFLTN'],
                                "arrival":flightIn['CHOPER']+flightIn['CHFLTN'],
                                "country": flightOut['CHLOC1']+","+flightIn['CHLOC1'],
                                "date":dateTimeOfFlightout+','+dateTimeOfFlightIn
                            })
                        }
                    }
                }
                
            })
        })

        res.json({
            quickGetawayFlights
        });
    }
    catch(err){
        console.error(err);
        res.status(400).json({error:"faild to fetch inbound&outbound flights for get away"});
    }
}