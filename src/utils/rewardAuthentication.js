import { savedLastLoginDate } from '../repositories/auth.repositories.js'

let date
let month
let year
let dateFormat


let firstIsLogin = false;
let differentDay = false;

export function generateDateFormat(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentDate = new Date();

    date = currentDate.getDate();
    month = months[currentDate.getMonth()];
    year = currentDate.getFullYear();
    dateFormat = `${month} ${date}, ${year}`;

    return dateFormat;
}

export async function saveLastLogin (date, user){
    const idUser = user._id;
    const lastLogin = user.lastLogin;

    if(!lastLogin){
        firstIsLogin = true;
        await savedLastLoginDate(idUser, date);
        return {firstIsLogin, differentDay};
    }

    if(lastLogin !== date){
        differentDay = true;
        await savedLastLoginDate(idUser, date);
        return {firstIsLogin, differentDay};
    }
    
    return {firstIsLogin, differentDay};
}