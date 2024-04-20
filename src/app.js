const express = require("express")
const app = express()
const mongoose = require('mongoose')
const port  = 3001
const cors = require('cors')
require('dotenv').config()
const userRoute = require('../routes/user')
const rsvpRoute = require("../routes/rsvp")
const eventRouter = require('../routes/eventsRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin:[ 'Front end address goes here' ],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))

app.use("/events", eventRouter);
app.use(userRoute);
app.use(rsvpRoute);

app.use(
	cors({
		origin: ["Front end address goes here"],
		methods: ["POST", "GET", "PATCH", "DELETE"],
		credentials: true,
	})
);

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    // if server is connected to mongo db atlas
    app.listen(port, ()=>{
        console.log(`db connected & server running on port ${port}`)
    })
}).catch(err=>{
    console.log(err)
    // if there was an error in connecting to mongo db atlas start server only
    app.listen(port, ()=>{
        console.log(`server running on port ${port}`)
    })
})