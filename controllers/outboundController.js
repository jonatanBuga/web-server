
const getNumberOfOutboundFlights = (req,res) =>{
    res.json({
        "number":"7"
    })
}

//getting the number of outbounding flights frn specific country
const getNumberFromCountry = (req,res) =>{
    res.json({
        "contry":"22"
    })
}


module.exports = {getNumberOfOutboundFlights,getNumberFromCountry};