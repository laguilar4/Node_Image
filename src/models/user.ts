import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : { type: String, required:true, maxLength: 12 },
    password : { type: String, required:true, maxLength: 100 },
    identification : { type: String, required:true, maxLength: 14 },
    name : { type: String, required:true, maxLength: 20 },
    lastname : { type: String, required:true, maxLength: 20 },
   
},
{
  timestamps: true,
  versionKey: false,
  collection: "users",
});

userSchema.index({ identification: 1 }, { unique: true, sparse: true });

export const userModel = mongoose.model('User', userSchema);