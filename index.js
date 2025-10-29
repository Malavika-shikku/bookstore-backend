//import dotenv file
//const dotenv = require("dotenv")
//dotenv.config()
require('dotenv').config()

//import express server
const express = require('express')

//import cors
const cors = require('cors')

//import routes
const route = require('./routes')

//import db connection file
require('./databaseConnection')

//import application specific middleware
//const appMiddleware = require('./middlewares/appMiddleware')

//create server - express()
const bookstoreServer = express()

//server using cors
const allowedOrigins = [
  "http://localhost:5173",
  "https://bookstore-frontend-theta-black.vercel.app"  // ✅ your Vercel frontend
];

bookstoreServer.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(" Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


bookstoreServer.use(express.json())//parse json - middleware
//bookstoreServer.use(appMiddleware)
bookstoreServer.use(route)

//export the uploads folder
bookstoreServer.use('/uploads',express.static('./uploads'))
 
//export pdf upload
bookstoreServer.use('/pdfUploads',express.static('./pdfUploads'))

//create port
const PORT = process.env.PORT || 4000;


bookstoreServer.listen(PORT,()=>{
    console.log(`server running in port : ${PORT}`);
    
})
