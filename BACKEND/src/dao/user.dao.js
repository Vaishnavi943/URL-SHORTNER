import User from "../models/user.model.js";
import urlSchema from "../models/shorturl.model.js";

export const getUserByEmail = async (email) => {
    return await User.findOne({email});
}

export const  getUserByEmailByPassword = async (email) => {
    return await User.findOne({email}).select('+password');
}

export const getUserById = async (id) => {
    return await User.findById(id);
}

// register user
export const createUser = async (name, email, password) => {
    const newUser = new User({ name, email, password });
    await newUser.save();
    return newUser;
}

// user urls
export const getAllUserUrlsDao = async (id) => {
   const urls =  await urlSchema.find({user: id})
   console.log("urls are", urls)
   return urls;
}

// delete user
// export const deleteUser = async(id) => {
//     const user = await User.findById(id);
//     if(!user) {
//         throw new Error ("user not found!");
//     }
//     await user.deleteOne();
//     return user;
// }