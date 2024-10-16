import { Request, Response } from 'express';
import { User } from '../interfaces/user';
import * as UserModel from '../models/user';
import * as bcrypt from 'bcrypt';
import * as dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    try {
        const login = await UserModel.userModel.findOne({ username });
        console.log(login);
        if(!login)
        {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }else
        {
            const isMatch = await bcrypt.compare(password, login.password);
            if(!isMatch){
                res.status(400).json({ error: 'La contraseña es incorrecta' });
            }else
            {
                const token = jwt.sign({username:login.username, name : login.name, lastname : login.lastname, identification : login.identification}, process.env.SEED_TOKEN! , { expiresIn: '12h'});
                res.status(200).json({ success : true, code : 200, message : 'Ha iniciado sesion exitosamente!', token : token });
            }
        }
  } catch (error) {
    res.status(500).json({ error: `${error}`});
    console.log(error);
  }
}

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
  