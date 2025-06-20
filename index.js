const express=require("express");
const mongoose=require("mongoose");
const studentRoutes = require("./routes/student.routes");


const app=express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/students").then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/students', studentRoutes);

app.listen(4000,()=>console.log("server started on PORT 4000"));