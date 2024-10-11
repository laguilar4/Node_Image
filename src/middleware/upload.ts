import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

/*
export const uploadImage = async(req:Request, res: Response, next:NextFunction):Promise<void> => 
{
  const { folderName } = req.body;
  console.log(req.body);
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, `src/documents/${folderName.toUpperCase()}`)
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
          cb(null, file.originalname )
        }
      })
      
    const upload = multer({ storage: storage });
    await upload.array('file', 10)(req, res, function (err) {
      });
}
*/