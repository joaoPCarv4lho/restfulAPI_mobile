import { loginRepositorie, dailyReward } from '../repositories/auth.repositories.js';
import { generateDateFormat, saveLastLogin } from '../utils/rewardAuthentication.js';
import { createToken } from '../utils/token.js';
import bcrypt from 'bcryptjs';

let points = 50;

export async function loginService(email, password) {
    const user = await loginRepositorie(email);
    if(!user) throw new Error("Wrong password or username");

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if(!passwordIsValid) throw new Error("Invalid Password!")

    const token = createToken(user._id)
    const date = generateDateFormat();
    const userLogged = await saveLastLogin(date, user);
    const {firstIsLogin, differentDay} = userLogged;
    
    if(firstIsLogin){
        await dailyReward(user._id, points);
        return {token, message: `Parabéns! Você recebeu ${points} pontos como recompensa de login diário.`};
    }
    if(!differentDay){
        return {token, message: "Você já recebeu sua recompensa de login hoje."};
    }
    
    points += user.points;
    await dailyReward(user._id, points);
    return token
}