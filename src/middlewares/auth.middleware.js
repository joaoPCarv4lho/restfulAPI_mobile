import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { findByIdServiceRepository } from '../repositories/user.repositories.js';



export function authMiddleware(req, res, next){
        const authorization = req.headers.authorization;
        if(!authorization){
            return res.status(401).send({ message: "The token was not informed!" });
        }
    
        const parts = authorization.split(" ");
        if(parts.length !== 2){
            return res.status(401).send({ message: "Invalid Token" });
        }
    
        const [schema, token] = parts;
        if(!/^Bearer$/i.test(schema)){
            return res.status(401).send({ message: "Malformatted Token!" });
        }
    
        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded)=> {
            if(error){
                return res.status(401).send({ message: "Invalid Token!" });
            };
            const user = await findByIdServiceRepository(decoded.id);
            
            if (!user || !user._id){
                return res.status(401).send({ message: "Invalid Token!" });
            }
            req.userID = user._id;
            return next();
        });
}