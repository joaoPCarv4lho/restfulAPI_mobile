import { loginService } from '../services/auth.service.js';
import { sendSuccesResponse, sendErrorResponse } from '../utils/response.util.js';

export async function login(req, res){
    const { email, password } = req.body;

    const user = await loginService(email, password);
    try{
        const { name, email, img, username, points, token } = user;
        sendSuccesResponse(res, 200, message, {name, email, img, username, points, token});
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }

}