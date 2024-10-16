import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import { File } from '../interfaces/file';
import * as FileModel from '../models/file';

export const saveImage = async (req: Request, res: Response, next: NextFunction) : Promise<void>  => {
    try {
        const { folderName, description, userReg } = req.body;
        const files = req.files;
        let dataFile: File[] = [];
        if (Array.isArray(files) && files.length > 0) {
            const _dir = `src/documents/${folderName.toUpperCase()}`;

            const savedFiles = await Promise.all(files.map(async (file) => {
                const { filename } = file;
                try {
                    const newFile: File = {
                        folderName: folderName,
                        fileName: filename,
                        description: description,
                        userReg: userReg,
                        url: `http://localhost:7000/api/docportal/files/documents/${folderName.toUpperCase()}/${filename}`
                    };
                    dataFile.push(newFile);
                } catch (error) {
                    throw new Error(`Error al guardar el archivo: ${filename}. Error: ${error}`);
                }
            }));
           
            dataFile = dataFile.filter(file => file);
            try {
                const dataResponse = await FileModel.FileModel.insertMany(dataFile);
                
                console.log(dataResponse);
                
               //res.send(dataResponse);
                
               
               res.status(200).json({
                    success: true,
                    message: 'Archivos guardados correctamente',
                    files:dataResponse
                    
                });
                
                
            } catch (error) {
                res.status(500).json({ success: false, message: 'Error al guardar los datos del archivo', error: error });
            }
            /*
            res.status(200).json({
                success: true,
                message: 'Archivos guardados correctamente',
                files: dataResponse
            });
            */
            
        } else {
            res.status(400).json({ success: false, message: 'No se encontraron archivos' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error en el servidor', error: error });
    }
};