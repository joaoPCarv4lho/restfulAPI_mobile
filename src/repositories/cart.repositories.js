import User from "../models/User.js";

export const addCartRepositorie = (userId, id, name, description, img, price) =>
    User.findOneAndUpdate(
        { _id: userId, "cart.id" : {$nin: [id]} }, 
        { $push: { cart: { id, name, description, img, price } } }
    );

export const findByCartRepositorie = (idUser, idProduct) => User.updateOne({ _id: idUser }, { $pull:{ cart:{ id: idProduct } } });

export const purchaseProductRepositorie = (id, points) => User.findOneAndUpdate({ _id: id }, {points});

export const removeProductsToCartRepositorie = (id, cart, historic) => User.findOneAndUpdate({_id: id}, { cart, historic }); 