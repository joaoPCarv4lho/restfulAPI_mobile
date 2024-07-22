import { registerUserService, getAllUsersService, updateUserByIDService, getUserByIDService} from '../services/user.service.js';
import { sendSuccesResponse, sendErrorResponse } from '../utils/response.util.js';

export async function register(req, res){
    const body = req.body;
    try {
        const user = await registerUserService(body);
        sendSuccesResponse(res, 201, "User created Successfully!", {user: {id: user._id, ...req.body}});
    }catch(e){
        sendErrorResponse(res, 400, e.message);
    }
};

export async function findAll(req, res){
    const idUser = req.userID;
    try{
        const users = await getAllUsersService();
        return res.send(users);
    }catch(e){
        res.status(404).send({ message: e.message });
    }
};

export async function findByID(req, res){
    const user = await getUserByIDService(req.params.id, req.userID);
    try{
        return res.send(user);
    }catch(e){
        sendErrorResponse(res, 400, e.message);
    }
};

export async function update(req, res){
    const body = req.body;
    const userId = req.userID;
    try{
        await updateUserByIDService(userId, body);

        return sendSuccesResponse(res, 200, "User Successfully updated!");
    }catch(e){
        sendErrorResponse(res, 400, e.message);
    }
};
