
const getAllFlightsNumber = (req,res) =>{
    res.json({
        "number":"17"
    })
}

const delayedFlights = (req,res)=>{
    res.json({
        "number":"200"
    })
}

const popularDestination = (req,res)=>{
    res.json({
        "city":"london"
    })
}
module.exports = {getAllFlightsNumber,delayedFlights,popularDestination};