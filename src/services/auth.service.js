import { loginRepositorie, dailyReward, updateToken } from '../repositories/auth.repositories.js';
import { generateDateFormat, saveLastLogin } from '../utils/rewardAuthentication.js';
import { createToken } from '../utils/token.js';
import bcrypt from 'bcryptjs';

let points = 50;

export async function loginService(email, password) {
    const user = await loginRepositorie(email);
    if(!user) throw new Error("Wrong password or username");

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if(!passwordIsValid) throw new Error("Invalid Password!")

    const idUser = user._id;
    
    const token = createToken(idUser)
    await updateToken(idUser, token);

    return user
}