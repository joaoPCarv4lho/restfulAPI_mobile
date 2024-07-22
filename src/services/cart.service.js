import { 
    addCartRepositorie, 
    removeProductsToCartRepositorie, 
    purchaseProductRepositorie, 
    findByCartRepositorie 
} from '../repositories/cart.repositories.js';
import { findByIdProductRepositorie } from '../repositories/product.repositories.js';
import { findByIdServiceRepository } from '../repositories/user.repositories.js';

export async function addCartService(id, userId){
    const product = await findByIdProductRepositorie(id);

    if(!product) throw new Error("Product not found!");
    if(product.user._id === userId){
        throw new Error("This product was created by you");
    } 

    await addCartRepositorie(userId, id, product.name, product.description, product.img, product.price);
    return { message: "Product added to the cart successfully!" }
}

export async function purchaseService(idUser){
        let total = 0;
        const newCart = [];
        
        const user = await findByIdServiceRepository(idUser);
        const cart = user.cart;
        const pointUser = user.points;

        if(cart.length < 0){
            return res.send({ message: "Add at least one item to cart" })
        }
        for(let i=0; i < cart.length; i++){
            total += cart[i].price;
        }
        if(pointUser < total){
            return res.status(400).send({ message: "Insufficient points for purchase!" });
        }
        const balance = pointUser - total;
        
        await removeProductsToCartRepositorie(idUser, newCart, cart);
        await purchaseProductRepositorie(idUser, balance);

        return { message: "Purchase made successfully!"}
}

export async function removeProductService(idProduct, idUser){
        const product = await findByCartRepositorie(idUser, idProduct);
        console.log(product);
        if(product.modifiedCount === 0){
            return res.status(404).send({ message: "Product not found!" });
        }
        return { message: "Product removed from cart successfully!" };
}