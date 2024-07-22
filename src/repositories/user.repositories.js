import User from "../models/User.js";

export const createServiceRepository = (body) => User.create(body);

export const findAllServiceRepository = () => User.find();

export const findByIdServiceRepository = (id) => User.findById(id);

export const updateServiceRepository = (name, username, email, password, img, userId) =>
    User.findOneAndUpdate(
        { _id: userId }, 
        { 
            name, 
            username, 
            email, 
            password, 
            img
        },
        { rawResult: true }
    );

