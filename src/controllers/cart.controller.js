import { 
    addCartService, 
    removeProductService, 
    purchaseService, 
} from '../services/cart.service.js';
import { sendSuccesResponse, sendErrorResponse } from '../utils/response.util.js';

export async function addCart(req, res){
    try{
        const {id} = req.params;
        const userId = req.userID;
        await addCartService(id, userId);
        sendSuccesResponse(res, 201, "Product added to the cart successfully");
    }catch(e){
        sendErrorResponse(res, 500, e.message );
    }
}

export async function purchase(req, res){
    try{
        const idUser = req.userID;
        await purchaseService(idUser);
        sendSuccesResponse(res, 200, "Purchase made successfully!");
    }catch(e){
        sendErrorResponse(res, 500, e.message );
    }
}

export async function removeProduct(req, res){
    try{
        const { id } = req.params;
        const idUser = req.userID;
        await removeProductService(id, idUser);
        sendSuccesResponse(res, 200, "Product removed from cart successfully!")
    }catch(e){
        res.status(500).send({ message: e.message });
    }
}