//import http from "http";
import express from "express";
import inboundRoute from "./routes/inbound.js"
import outboundRoute from "./routes/outbound.js";
import allFlights from "./routes/allFligths.js";
const PORT = 6500
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



app.listen(PORT,()=> console.log("server running on port:",PORT));