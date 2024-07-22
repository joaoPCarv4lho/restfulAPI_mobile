import Product from "../models/Product.js";

export const createdProductRepositorie = (name, description, img, price, idUser) => Product.create({ name, description, img, price, user: idUser });

export const findAllProductRepositorie = (limit, offset) =>
    Product.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

export const countProductsRepositorie = () => Product.countDocuments();

export const findByIdProductRepositorie = (id) => Product.findById(id).populate("user")

export const searchByNameRepositorie = (name) =>
    Product.find({ name: { $regex: `${name || ""}`, $options: "i" } },).sort({ _id: -1}).populate("user");

export const byUserRepositorie = (id) => Product.find({ user: id}).sort({ _id: -1}).populate("user");

export const updateProductRepositorie = (
    id,
    name,
    description,
    img,
    price
) => Product.findOneAndUpdate(
    { _id: id },
    {name, description, img, price},
    { rawResult: true }
);

export const removeProductRepositorie = (id) => Product.findOneAndDelete({ _id: id});