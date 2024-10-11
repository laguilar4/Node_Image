import { Request, Response } from 'express';
import { User } from '../interfaces/user';
import * as UserModel from '../models/user';
import * as bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

export const saveUser = async (req: Request, res: Response): Promise<void> => {
    const { name, identification, lastname, username, password } = req.body;
    const passcrypt = await bcrypt.hash(password.trim(), 10);
    const user : User =  { username: username.trim().toLowerCase(), password: passcrypt, identification: identification.trim(), name: name.trim().toUpperCase(),lastname: lastname.trim().toUpperCase()} ;
    const newUser = new UserModel.userModel(user);
    try {
        const saveUser = await newUser.save();
        if(saveUser)
        {
            /*
            const seed_token = process.env.SEED_TOKEN || 'TOKEN2024...++';
            const token = jwt.sign({ foo: 'bar' }, seed_token, { expiresIn: '24h'});
            */
            //const token = jwt.sign({ 'userId' }, seed_token, { expiresIn: '24h' , algorithm: 'RS256'});
            //const token = jwt.sign({ 'userId' }, process.env.SEED_TOKEN, { expiresIn: '24h' });
            res.status(200).json(saveUser
            /*
            {
                success : true,
                code : 200,
                message : 'Se ha creado exitosamente el usuario',
                data : saveUser,
                token : token
            }
                */
        );
        }else
        {
            res.status(400).json(saveUser);
        }
        //return res.status(200).json(saveUser);
    } catch (error) {
        res.status(400).json({success: false, code: 400, message: 'Error al guardar el usuario', error: `${error}`});
        //return res.status(400).json({success: false, code: 400, message: 'Error al guardar el usuario', error: `${error}`});
    }
};
  