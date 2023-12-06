const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors());
const dotenv = require('dotenv');

dotenv.config({path: './config.env'})

const mongo_uri = "mongodb+srv://fixlCars:Carsreseller24@cluster0.djecj.mongodb.net/?retryWrites=true&w=majority"
// const mongo_uri = "mongodb://localhost:27017/automaniCars"

const connectDB = async () => {
  await mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  });
  console.log('db connected..!');
};

connectDB()


app.use(express.json())

const carRouter = require('./routes/carRoute')
const contactUsRouter = require('./routes/contactUsRoute')
const homeRouter = require('./routes/homeRoute')
const userRouter = require('./routes/adminRoute')
const serviceRouter = require('./routes/serviceRoute')
const enquiryRouter = require('./routes/enquiryRoute')
const sellRouter=require("./routes/sellCarRoute")
const newsletterRouter=require("./routes/newsletterRoute")

app.use('/cars', carRouter)
app.use('/contactUs', contactUsRouter)
app.use('/home', homeRouter)
app.use('/admin', userRouter)
app.use('/service', serviceRouter)
app.use('/enquiry', enquiryRouter)
app.use('/sell',sellRouter)
app.use('/newsletter',newsletterRouter)

if(process.env.NODE_ENV == "production"){
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server started')
  console.log(`app is running on port ${PORT}`);
})



