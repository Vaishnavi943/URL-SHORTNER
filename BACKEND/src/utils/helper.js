import jsonwebtoken from "jsonwebtoken"
import { nanoid } from "nanoid"

export const generateNanoId = (length) => {
    return nanoid(length); // Generates a random short URL ID of length 7
}

export const signToken = (payload) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {expiresIn: "1h"});
}

export const verifyToken = (token) => {
    const decoded =  jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET)
    console.log(decoded.id)
    return decoded.id
}