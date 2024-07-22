import { 
    createdProductService, 
    findAllProductsService, 
    searchByNameProductService, 
    byUserProductService, 
    updateProductService, 
    findByIDProductService, 
    removeProductService 
} from '../services/product.service.js'
import { sendErrorResponse, sendSuccesResponse } from '../utils/response.util.js';

export async function createProduct(req, res){
    const body = req.body;
    const userId = req.userID
    try{
        const product = await createdProductService(body, userId);
        sendSuccesResponse(res, 201, "Product created Successfully!", {product: {name: product.name, ...req.body, user: product.user._id}});
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }

}

export async function findAll(req, res){
    const {limit, offset} = req.query;
    const currentUrl = req.baseUrl;

    try{
        const products = await findAllProductsService(limit, offset, currentUrl);
        return res.send(products)
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }
}

export async function searchByName(req, res){
    const { name } = req.query;
    try{
        const foundProducts = await searchByNameProductService(name);

        return res.send(foundProducts)
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }
}

export async function findByID(req, res){
    const {id} = req.params;
    try{
        const product = await findByIDProductService(id);

        return res.send(product);
    }catch(e){
        sendErrorResponse(res, 404, e.message);
    }
}

export async function byUser(req, res){
    const id = req.userID;
    try{
        const products = await byUserProductService(id);
        return res.send(products);
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }
}

export async function update(req, res){
    const body = req.body;
    const {id} = req.params;
    const userId = req.userID;
    try{
        await updateProductService(body, id, userId);
        sendSuccesResponse(res, 200, "Product successfully updated!")
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }
}

export async function remove(req, res){
    const {id} = req.params;
    const userId = req.userID;
    try{
        await removeProductService(id, userId);
        sendSuccesResponse(res, 200, "Product successfully Deleted!")
    }catch(e){
        sendErrorResponse(res, 500, e.message);
    }
}