import { loginService } from '../services/auth.service.js';
import { sendSuccesResponse, sendErrorResponse } from '../utils/response.util.js';

export async function login(req, res){
    const { email, password } = req.body;

    const Return = await loginService(email, password);
    try{
        const { message, token, user } = Return;
        sendSuccesResponse(res, 200, message, token, ...user) 
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }

}