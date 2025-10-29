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
bookstoreServer.use(cors({
  origin: [
    "http://localhost:5173",              // for local development
    "https://bookstore-final.netlify.app" // ✅ your deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
