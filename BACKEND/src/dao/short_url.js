import urlSchema from "../models/shorturl.model.js";
import { ConflictError } from "../utils/errorHandler.js";

// post
export const saveShortUrl = async( shortUrl, longUrl, userId) => {
    console.log(userId)
    try{
        console.log("1st")
        const newURL = new urlSchema({
                full_url: longUrl,
                short_url: shortUrl,
    })
    if (userId) {
        newURL.user = userId;
    }
    await newURL.save();
    }catch(err){
        if(err.code == 11000){
            throw new ConflictError("Failed to save short URL");
        }
        throw new Error(err);    
    }   
}


// get
export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url: shortUrl}, {$inc:{clicks: 1}});
    
};


export const getCustomShortUrl= async(slug) => {
    return await urlSchema.findOne({short_url: slug});
}