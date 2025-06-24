import { loginUserService, registerUserService } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";

// post register user
export const registerUser = wrapAsync(async (req, res) => {
    // add jwt register
    const {name, email, password} = req.body;
    const {token, user} = await registerUserService(name, email, password);

    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ message: "successfully registered!"});
})

// login user
export const loginUser = wrapAsync(async (req, res) => {
   const {email, password} = req.body;
    const {token, user} = await loginUserService(email, password);
    
    req.user = user;
    // console.log("user: ",user)
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({user: user, message: "successfully login!"});
})

// middleware
export const getCurrentUser = wrapAsync(async (req, res) => {
    res.status(200).json({user: req.user});
})