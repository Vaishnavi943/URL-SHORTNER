import { createUser, getUserByEmail, getUserByEmailByPassword} from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

// register user
export const registerUserService = async(name, email, password) => {
    const user = await getUserByEmail(email);
    if(user) {
        throw new ConflictError ("user already exist!");
    }
    const newUser = await createUser(name, email, password)
    const token = await signToken({id: newUser._id});
    return {token, user};
}

// login user
export const loginUserService = async(email, password) => {
    const user = await getUserByEmailByPassword(email);
    if(!user ) {
        throw new Error ("invalid Credentials!");
    }
    const passwordValid = await user.comparePassword(password);
    if(!passwordValid) {
        throw new Error ("invalid Credentials!");
    }
    const token = await signToken({id: user._id});
    return {token, user};
}