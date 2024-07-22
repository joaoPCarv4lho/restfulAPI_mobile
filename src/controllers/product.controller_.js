import { 
    createdProductService, 
    findAllProductService, 
    countProducts, 
    searchByNameService, 
    byUserService, 
    updateProductService, 
    findByIdProductService, 
    removeProductService 
} from '../services/product.service.js'

export const createProduct = async (req, res) => {
    try{
        const { name, description, img, price} = req.body;
        if(!name || !description || !img || !price){
            res.status(400).send({ message: "Submit for all fields for registration Product!" })
        }
        const product = await createdProductService({
            name,
            description,
            img,
            price,
            user: req.userID,
        });
        if(!product){
            return res.status(400).send({ message: "Error creating Product!" });
        }

        res.status(201).send({ 
            message: "Product created Succesfully!",
            product:{
                name,
                description,
                img,
                price
            }
        })
    }catch(e){
        res.status(500).send({ message: e.message });
    }

}

export const findAll = async (req, res) => {
    try{
        let {limit, offset} = req.query;
    limit = Number(limit);
    offset = Number(limit);

    if(!limit){
        limit = 5;
    }
    if(!offset){
        offset = 0;
    }
    

    const products = await findAllProductService(limit, offset);
    const total = await countProducts();
    const currentUrl = req.baseUrl;
    console.log(currentUrl);
    const next = offset + limit;
    const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;
    if(products.length === 0){
        return res.status(400).send({ message: "There are no registered products." })
    }
    res.send({
        nextUrl,
        previousUrl,
        limit,
        offset,
        total,

        results: products.map((item) => ({
            id: item.id,
            description: item.description,
            name: item.name,
            img: item.img,
            price: item.price,
            createdAt: item.createdAt,
            user: item.user.name,
            username: item.user.username,
            userImg: item.user.img,
        })),
    });
    }catch(e){
        res.status(500).send({ message: e.message });
    }
}

export const searchByName = async (req, res) => {
    try{
        const { name } = req.query;

        const products = await searchByNameService(name);

        if(products.length === 0){
            return res.status(400).send({ message: "There are no product with this name"});
        }

        return res.send({
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
        })
    }catch(e){
        res.status(500).send({ message: e.message });
    }
}

export const byUser = async(req, res) => {
    try{
        const id = req.userID;
        const products = await byUserService(id);

        return res.send({
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
        });
    }catch(e){
        res.status(500).send({ message: e.message });
    }
}

export const findByID = async(req, res) => {
    try{
        const {id} = req.params;
        const product = await findByIdProductService(id);

        return res.send({
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
        });
    }catch(e){
        res.status(500).send({ message: e.message });
    }
}

export const update = async(req, res) => {
    try{
        const {name, description, img, price} = req.body;
        const {id} = req.params;
        if(!name && !description && !img && !price){
            res.status(400).send({ message: "Submit all fields for update!" });
        }

        const product = await findByIdProductService(id);

        console.log(typeof product.user._id, typeof req.userID);

        if(String(product.user._id) !== String(req.userID)){
            return res.status(400).send({ message: "You didn't update this post!" });
        }

        await updateProductService(id, name, description, img, price);
        return res.status(200).send({ message: "Product successfully updated!" });
    }catch(e){
        res.status(500).send({ message: e.message });
    }
}

export const remove = async(req, res) => {
    try{
        const {id} = req.params;
        const product = await findByIdProductService(id);

        if(String(product.user._id) !== String(req.userID)){
            return res.status(400).send({ message: "You didn't delete this Product!" });
        }

        await removeProductService(id);
        return res.status(200).send({ message: "Product successfully deleted!" });
    }catch(e){
        res.status(500).send({ message: e.message });
    }
}