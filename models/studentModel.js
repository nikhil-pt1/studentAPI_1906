const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/students").then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));;

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
   Phone: {
    type: Number,
    required: [true, "Phone number is required"],
  validate: {
      validator: function(v) {
        return /^[6-9]\d{9}$/.test(v); // basic Indian phone number pattern
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
});
module.exports=mongoose.model("student",studentSchema)