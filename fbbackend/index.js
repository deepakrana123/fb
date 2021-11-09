const express = require("express");

const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute =require("./routes/posts");
const cons=require("./routes/conv");
const bodyParser=require('body-parser');
const multer = require('multer');
const path = require("path");
const consRoute = require("./routes/conversation");
const messagesRoute = require("./routes/messages");

dotenv.config();


mongoose.connect(process.env.MONGO_URL,
   {useNewUrlParser: true, useUnifiedTopology: true},err=>
 {  if(err){
        console.log(err); 
    }
    else{
        console.log("monogodb connect")
    }
 });
 

// middleware

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json())

app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/conversations", consRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/conv", cons);

app.get("/",(req,res)=>{
    res.send("welcome to page");
})



app.listen(8800,()=>{
    
    console.log("Backend server is running");
})