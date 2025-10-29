//import mongoose
const mongoose = require('mongoose')

//create schema
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
     author:{
        type:String,
        required:true
    },
     noOfPages:{
        type:Number,
        required:true
    },
     imageUrl:{
        type:String,
        required:true
        
    },
     price:{
        type:Number,
        required:true
    },
    dprice:{
        type:Number,
        required:true
    },
    abstract:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    uploading:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    userEmail:{
        type:String,
        required:true
    },
    brought:{
        type:[String],
        default:[]
    }

   
})

const books = mongoose.model("books",bookSchema)
module.exports = books
