const express = require('express')
const app = express()
const web = require('./routes/web')


//temporary file store karne ke liye
const fileUpload= require("express-fileupload");
//Temp file uploader
app.use(fileUpload({useTempFiles: true}));

//for communication express js to react js
const cors = require('cors')
app.use(cors())

//cookie store token get
const cookieParser = require('cookie-parser')
app.use(cookieParser())

//json to object convert code
app.use(express.json())

//for env file
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})


const connectDB = require('./db/connectdb')
connectDB()//for connection with mongo db



app.use('/api',web)


app.listen(process.env.PORT,console.log(`server is runnning localhost: ${process.env.PORT}`))