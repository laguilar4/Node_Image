import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import { File } from '../interfaces/file';
import * as FileModel from '../models/file';

export const saveImage = async(req:Request, res:Response, next:NextFunction):Promise<void> => 
{
    const { folderName, fileName, description, userReg } = req.body;
    const files = req.files;
    //console.log(files);
    if(Array.isArray(files))
        {
            const _dir = `src/documents/${folderName.toUpperCase()}`;
           
            files.forEach(async (file) =>
                {
                    const { filename } = file;
                    if (fs.existsSync(`${_dir}/${filename}`)){
                        try {
                            const file : File = { 
                                folderName : folderName, 
                                fileName : filename, 
                                description : description, 
                                userReg : userReg, 
                                url: `http://localhost:7000/api/docportal/files/documents/${folderName.toUpperCase()}/${filename}` 
                            };
                            const newFile = new FileModel.FileModel(file);
                            const saveFile = await newFile.save();
                            if(saveFile)
                            {
                                res.status(200).json(saveFile);
                            }else
                            {
                                res.status(400).json(saveFile);
                            }
                        } catch (error) {
                            res.status(400).json({success: false, code: 400, message: 'Error al guardar el archivo', error: `${error}`});
                        }
                    }else
                    {

                    }
                });
            }else{
                console.log('No se encontraron archivos');
            }
    /*
    console.log(req.body);
    console.log(req.files);
    */
}