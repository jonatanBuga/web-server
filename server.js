const http = require("http");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8000; //env using for deployment
const inboundRoute = require("./routes/inbound");
const outboundRoute = require("./routes/outbound");
const allFlights = require("./routes/allFligths");
//setup app
const app = express()

//middleware
app.use(express.json()); // for json

//routes
app.use('/inbound',inboundRoute);
app.use('/outbound',outboundRoute);
app.use('/allFlights',allFlights);



app.get('/',(req,res)=>{
    res.send('inbound and outbound flights from tel aviv');
})



app.listen(PORT,()=> console.log(`server running on port:${PORT}`));