const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require('morgan')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status - :response-time ms'))
const port = process.env.PORT || 5001;


app.get("/", function (req, res) {
    res.send("This is a simple Express Web Api.");
  });

//A sample API endpoint to showcase the POC
/**
 * Version 1 of the Check In Api
 * Req Body: Array of Passenger Details
 * Functionality/Purpose: Similuate checking in each passenger
 * Response : Status of checking in all the passengers
 */

app.post("/checkIn", async function (req, res) {
    var passengers = req.body
    for(let passenger of passengers){
        await new Promise((r) =>  setTimeout(r,2000) );
        console.log(`Successfully Check in Passenger ${passenger.passengerId} - ${passenger.name}`)
    }
    return res.status(200).send({
        success: true,
        errors:[],
        message: "Successfully check in all the passengers"
    })
  });

//A sample API endpoint to showcase the POC
/**
 * Version 2 of the Check In Api
 * Req Body: Array of Passenger Details
 * Functionality/Purpose: Similuate checking in each passenger asynchrously
 * Response : Status of checking in all the passengers
 */
app.post("/checkIn", async function (req, res) {
    var passengers = req.body
    var checkIn$Array =[];

    for(let passenger of passengers){
      var checkIn$ = new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Successfully Check in Passenger ${passenger.passengerId} - ${passenger.name}`);
          resolve();
        }, 2000);
      });
      checkIn$Array.push(checkIn$)
    }
    await Promise.all(checkIn$Array)
    return res.status(200).send({
        success: true,
        errors:[],
        message: "Successfully check in all the passengers"
    })
  });


app.listen(port,() => {
    // print a message when the server starts listening
    console.log(`Server starting on port ${port}`);
  });