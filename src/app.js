const express = require("express")
const app = express()
const mongoose = require('mongoose')
const port  = 3001
const cors = require('cors')
const userRoute = require('../routes/user')
const rsvpRoute = require("../routes/rsvp")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin:[ 'Front end address goes here' ],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
}))

app.use("/events/", eventRouter);
app.use("/events/", userRoute);
app.use("/events/", rsvpRoute);



mongoose.connect("Mongodb uri goes here").then(()=>{
    // if server is connected to mongo db atlas
    app.listen(port, ()=>{
        console.log(`db connected & server running on port ${port}`)
    })
}).catch(err=>{
    // if there was an error in connecting to mongo db atlas start server only
    app.listen(port, ()=>{
        console.log(`server running on port ${port}`)
    })
})
