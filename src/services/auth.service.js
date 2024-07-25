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
    
    const token = createToken(user._id)
    await updateToken(idUser, token);
    
    const date = generateDateFormat();
    const userLogged = await saveLastLogin(date, user);
    const {firstIsLogin, differentDay} = userLogged;
    console.log(firstIsLogin, differentDay)
    if(firstIsLogin){
        await dailyReward(idUser, points);
        return { message: `Parabéns! Você recebeu ${points} pontos como recompensa de login diário.`, user};
    }
    if(!differentDay){
        return { message: "Você já recebeu sua recompensa de login hoje.", user};
    }
    
    points += user.points;
    await dailyReward(idUser, points);
    return {user}
}