

const getNumberOfInboundFlights = (req,res) =>{
    res.json({
        "number":"10"
    })
}

const getNumberFromCountry = (req,res) =>{
    res.json({
        "contry":"19"
    })
}


module.exports = {getNumberOfInboundFlights,getNumberFromCountry};