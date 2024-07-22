import { loginService } from '../services/auth.service.js';
import { sendSuccesResponse, sendErrorResponse } from '../utils/response.util.js';

export async function login(req, res){
    const { email, password } = req.body;

    try{
        const token = await loginService(email, password);
        sendSuccesResponse(res, 200, "Login Successfully!", token);
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }

}