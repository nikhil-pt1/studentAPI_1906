const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/students").then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));;

const studentSchema=mongoose.Schema({
  name: String,
  address: String,
  Phone: Number, 
})

module.exports=mongoose.model("student",studentSchema)