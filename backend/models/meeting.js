const mongoose = require("mongoose");

const meetingSchema = mongoose.Schema({
  topic:{type:String,required:true},
  type:{type:Number,required:true},
  start_time:{type:String,required:true},
  duration:{type:Number},
  password :{type:String},
});

module.exports= mongoose.model('Meeting',meetingSchema);
