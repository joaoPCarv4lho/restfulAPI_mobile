import User from  '../models/User.js';

const loginRepositorie = (email) => User.findOne({email: email}).select("+password");
const updateToken = (id, token) => User.findOneAndUpdate( { _id: id }, { token: token } );
const savedLastLoginDate = (id, lastLogin) => User.findOneAndUpdate( { _id: id }, { lastLogin: lastLogin });
const dailyReward = (id, points) => User.findOneAndUpdate( { _id: id }, { points } );

export { loginRepositorie, dailyReward, savedLastLoginDate, updateToken };