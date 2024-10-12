import multer from 'multer';
import { NextFunction, Request, response, Response } from 'express';
import * as fs from 'fs';

export const uploadImage = async (req:Request, res:Response, next:NextFunction):Promise<void> => 
{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
  const upload = multer({ storage: storage });
  await upload.array('file', 10)(req, res, async function (err) {
    const { folderName } = req.body;
    const files = req.files;
    //const arrayFiles = req.files![0];
    if(Array.isArray(files))
    {
      const _dir = `src/documents/${folderName.toUpperCase()}`;
      if (!fs.existsSync(_dir)){
        fs.mkdirSync(_dir);
      }
      await files.forEach((file) =>
        {
          const { filename } = file;
          fs.rename(`temp/${filename}`, `${_dir}/${filename}`, function(err){
          });
        });
        next();
    }else{
      console.log('No se encontraron archivos');
    }
    
    //console.log(.filename);
    
    /*
    if(arrayFiles != undefined)
    {
      for(let i = 0; i >= arrayFiles.length; i++)
      {

      }
    }
    */
    /*
    if(arrayFiles != undefined)
    {
      arrayFiles.forEach(() =>{})
    }
    *
    /*
    fs.rename(`temp${filename}`, _dir, function(err){
    });
    */
  })
}
