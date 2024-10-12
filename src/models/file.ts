import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    folderName: { type: String, required:true, maxLength: 25 },
    fileName:  { type: String, required:true, maxLength: 70 },
    description:  { type: String, required:true, maxLength: 100 },
    url: { type: String, required:true, maxLength: 150 },
    userReg:  { type: String, required:true, maxLength: 50 }
    /*
    username : { type: String, required:true, maxLength: 12 },
    password : { type: String, required:true, maxLength: 100 },
    identification : { type: String, required:true, maxLength: 14 },
    name : { type: String, required:true, maxLength: 20 },
    lastname : { type: String, required:true, maxLength: 20 },
    */
   
},
{
  timestamps: true,
  versionKey: false,
  collection: "files",
});

fileSchema.index({ fileName: 1 }, { unique: true, sparse: true });

export const FileModel = mongoose.model('File', fileSchema);