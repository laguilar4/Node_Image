import multer from 'multer';
import { NextFunction, Request, response, Response } from 'express';
import * as fs from 'fs';
import path from 'path';

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
  const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif|pdf|docx|doc|xlsx/; // filetypes you will accept
      const mimetype = filetypes.test(file.mimetype); // verify file is == filetypes you will accept
      const extname = filetypes.test(path.extname(file.originalname)); // extract the file extension
      // if mimetype && extname are true, then no error
      if(mimetype && extname){
          return cb(null, true);
      }
      // if mimetype or extname false, give an error of compatibilty
      return Error;
  }
});
  await upload.array('file', 10)(req, res, async function (err) {
    const { folderName } = req.body;
    const files = req.files;
    if(Array.isArray(files))
    {
      const _dir = `src/documents/${folderName.toUpperCase()}`;
      if (!fs.existsSync(_dir)){
        fs.mkdirSync(_dir);
      }
      await Promise.all(files.map(async (file) =>
        {
          const { filename } = file;
          try {
            if (!fs.existsSync(`${_dir}/${filename}`)){
              fs.rename(`temp/${filename}`, `${_dir}/${filename}`, function(err){
                if(err){
                  console.log(err);
                }
                
              });
              next();
            }else
            {
              res.status(400).json({success: false, code: 400, message: 'El archivo que tratas de subir ya se encuentra guardado'});
            }
          } catch (error) {
            res.status(400).json({success: false, code: 400, message: error});
          }
        }));
       
    }else{
      console.log('No se encontraron archivos');
    }
  })
}
