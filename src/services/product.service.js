import { 
    byUserRepositorie, 
    countProductsRepositorie, 
    createdProductRepositorie, 
    findAllProductRepositorie, 
    findByIdProductRepositorie, 
    removeProductRepositorie, 
    searchByNameRepositorie, 
    updateProductRepositorie 
} from '../repositories/product.repositories.js'
import { createPaginationLinks, validateProductData } from '../utils/productUtils.js'

export async function createdProductService (body, userId) {
    const newBody = validateProductData(body);
    const {name, description, img, price} = newBody;
    const product = await createdProductRepositorie(name, description, img, price, userId);
    if(!product) throw new Error("Error creating Product!");

    return product;
}

export async function findAllProductsService(limit, offset, currentUrl){
    limit = Number(limit);
    offset = Number(limit);

    if(!limit){
        limit = 5;
    }
    if(!offset){
        offset = 0;
    }
    
    const products = await findAllProductRepositorie(limit, offset);
    const total = await countProductsRepositorie();
    console.log(currentUrl);
    const paginationProducts = createPaginationLinks(currentUrl, limit, offset, total)
    if(products.length === 0) throw new Error("There are no registered products.")
    return{
        nextUrl: paginationProducts.nextUrl,
        previousUrl: paginationProducts.previousUrl,
        limit,
        offset,
        total,

        results: products.map((item) => ({
            id: item._id,
            description: item.description,
            name: item.name,
            img: item.img,
            price: item.price,
            createdAt: item.createdAt,
            user: item.user.name,
            username: item.user.username,
            userImg: item.user.img,
        })),
    };
}

export async function searchByNameProductService(name){
    const foundProducts = await searchByNameRepositorie(name);

    if(foundProducts.length === 0) throw new Error("There are no product with this name");

    return {
        foundProducts: foundProducts.map((item) => ({
            id: item._id,
            name: item.name,
            description: item.description,
            img: item.img,
            price: item.price,
            createdAt: item.createdAt,
            user: item.user.name,
            username: item.user.username,
            userImg: item.user.img,
        })),
    };
}

export async function findByIDProductService(id){
    const product = await findByIdProductRepositorie(id);
    if(!product) throw new Error("There are no product with this id");

    return{
        result: {
        id: product._id,
        name: product.name,
        description: product.description,
        img: product.img,
        price: product.price,
        createdAt: product.createdAt,
        user: product.user.name,
        username: product.user.username,
        userImg: product.user.img,
        }
    };
}

export async function byUserProductService(id){
    const products = await byUserRepositorie(id);

    return {
        result: products.map((item) => ({
            id: item._id,
            name: item.name,
            description: item.description,
            img: item.img,
            price: item.price,
            createdAt: item.createdAt,
            user: item.user.name,
            username: item.user.username,
            userImg: item.user.img,
        })),
    };
}

export async function updateProductService(body, idProduct, userIdLogged){
    const newBody = validateProductData(body);
    const {name, description, img, price} = newBody;

    const product = await findByIdProductRepositorie(idProduct);

    if(!product) throw new Error("Product not found!")
    if(String(product.user._id) !== String(userIdLogged)) throw new Error("You didn't update this post!");

    await updateProductRepositorie(idProduct, name, description, img, price);
}

export const removeProductService = async(id, userId) => {
    const product = await findByIdProductRepositorie(id);

    if(!product) throw new Error("Product not found!")
    if(String(product.user._id) !== String(userId)) throw new Error("You didn't delete this post!")

    await removeProductRepositorie(id);
}