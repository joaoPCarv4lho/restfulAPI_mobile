import { createService, findAllService, updateService} from '../services/user.service.js';

export const register = async (req, res) => {
    try {
        const { name, username, email, password, img } = req.body;
        if (!name || !username || !email || !password) {
            res.status(400).send({ message: "Submit for all fields for Registration!" });
        }

        const user = await createService(req.body);
        if (!user) {
            return res.status(400).send({ message: "Error creating User!" });
        }

        res.status(201).send({
            message: "User created Succesfuly!",
            user: {
                id: user._id,
                name,
                username,
                email,
                img,
            },
        });
    }catch(e){
        res.status(500).send({ message: e.message });
    }
};

export const findAll = async (req, res) => {
    try{
        const users = await findAllService();

        if (users.length === 0) {
            return res.status(404).send({ message: "There are no registered users!" });
        }
        res.send(users);
    }catch(e){
        res.status(500).send({ message: e.message });
    }
};

export const findByID = async (req, res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(e){
        res.status(500).send({ message: e.message });
    }
};

export const update = async (req, res) => {
    try{
        const { name, username, email, password, img } = req.body;
        if (!name && !username && !email && !password && !img) {
            res.status(400).send({ message: "Submit at least one field for update!" });
        }

        const { id, user } = req;
        await updateService(id, name, username, email, password, img);
        res.send({ message: "User Succesfully updated!" });
    }catch(e){
        res.status(500).send({ message: e.message }); 
    }
};
