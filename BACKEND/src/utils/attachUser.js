import { verifyToken } from "./helper.js";
import { getUserById } from "../dao/user.dao.js";

export const attachUser = async(req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.accessToken;
    if(!token) {
        return next();
    }
    try {
        const decoded = await verifyToken(token);
        const user = await getUserById(decoded);
        if(!user) {
            return next();
        }
        req.user = user;
        next()
    }catch(error){
        return next();
    }
}