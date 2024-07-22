import User from  '../models/User.js';

const loginRepositorie = (email) => User.findOne({email: email}).select("+password");
const savedLastLoginDate = (id, lastLogin) => User.findOneAndUpdate( { _id: id }, { lastLogin })
const dailyReward = (id, points) => User.findOneAndUpdate( { _id: id }, { points } );

export { loginRepositorie, dailyReward, savedLastLoginDate };