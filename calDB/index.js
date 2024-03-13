var Express = require("express");
var Mongoclient=require ("mongodb"). MongoClient; 
var cors=require("cors"); 
const multer=require ("multer");

var app=Express();
app.use(cors());

var CONNECTION_STRING="";

var DATABASENAME=" todoappdb" ;
var database;

app. listen (5038, ()=>{

    Mongoclient. connect (CONNECTION_STRING, (error, client)=>{
        database=client.db (DATABASENAME);
        console.log("Mongo DB Connection Successful")
    })
})