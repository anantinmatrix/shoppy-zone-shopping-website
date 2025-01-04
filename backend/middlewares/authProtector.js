import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config/config.js';
import userModel from '../models/userModel.js'


export const authProtector = async (req, res, next) => {
    try{

        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({message: 'please login first'})
        }
        const token = authorization.replace('Bearer ', '');
        const payload = jwt.verify(token,JWT_KEY)
        const user = await userModel.findOne({'_id': payload.userId})
        if(!user){
            return res.status(401).json({message: 'please login first'})
        }
        req.user = user;
        next()
    }
    catch(err){
        res.status(401).json({message: 'please login first'})
    }
}