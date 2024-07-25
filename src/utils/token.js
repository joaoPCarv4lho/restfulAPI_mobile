import jwt from "jsonwebtoken";
import "dotenv/config";

export function createToken (id){
    const token = jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400});
    return token
}