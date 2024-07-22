import { 
    createServiceRepository, 
    findAllServiceRepository, 
    findByIdServiceRepository, 
    updateServiceRepository 
} from '../repositories/user.repositories.js';
import { createToken } from '../utils/token.js';

export async function registerUserService(body){
    const {name, username, email, password} = body
        if (!name || !username || !email || !password) throw new Error("Submit for all fields for Registration!")

        const user = await createServiceRepository(body);
        if (!user) throw new Error("Error creating User!");

        const token = createToken(user._id)

        return token;
};

export async function getAllUsersService(){
        const users = await findAllServiceRepository();

        if (users.length === 0) throw new Error("There are no registered users!");
        return users;
};

export async function getUserByIDService(userIdParam, userIdLogged){
        let idParam ;
        if(userIdParam){
            userIdParam = userIdLogged;
            idParam = userIdParam;            
        }else{
            idParam = userIdParam;
        }

        if(!idParam) throw new Error("Send a in the parameters to search for the user!");
        const user = await findByIdServiceRepository(idParam);

        if(!user) throw new Error("User not found!")
        
        return user;
};

export async function updateUserByIDService(userId, userIdLogged, body){
    const { name, username, email, password, img } = body;
        if (!name && !username && !email && !password && !img) throw new Error("Submit at least one field for update!");

        const user = await findByIdServiceRepository(userId);

        if(user._id != userIdLogged) throw new Error("You cannot update this user!");
        if(password) password = await bcrypt.hash(password, 10);

        await updateServiceRepository(name, username, email, password, img, userId);

        return { message: "User Successfully updated!" }
};
