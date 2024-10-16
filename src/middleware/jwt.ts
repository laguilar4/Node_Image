import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";

export const jwtVerify = async (req:Request, res:Response, next:NextFunction):Promise<void> => 
{
    dotenv.config();
    const token : string | undefined = req.header('auth-token');
    if(!token){
        res.status(401).json({error: 'Acceso denegado'});
    }else
    {
        try {
            jwt.verify(token, process.env.SEED_TOKEN!, (err, decoded) => {
                if (err) {
                  return res.status(401).json({ message: 'Token inválido o expirado' });
                }
                console.log(decoded);
                next();
              });
        } catch (error){
            res.status(400).json({error: 'Token no valido, acceso denegado'})
        }
    }
    
}