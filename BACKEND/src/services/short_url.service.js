import { generateNanoId } from "../utils/helper.js";   
import { getCustomShortUrl, saveShortUrl }  from "../dao/short_url.js";

// post
export const createShortUrlWithoutUser = async (longUrl) => {
    const shortUrl = generateNanoId(7); // Generate a random short URL ID
    if( !shortUrl ) {
        throw new Error("Failed to generate short URL");
    }
    await saveShortUrl( shortUrl, longUrl);
    return shortUrl;
}

export const createShortUrlWithUser = async (longUrl, userId, slug=null) => {
    const shortUrl = slug || generateNanoId(7); // Generate a random short URL ID

    const exist = await getCustomShortUrl(slug);
    if(exist) throw new Error ("Custome Slug already exist");

    await saveShortUrl(shortUrl, longUrl, userId);
    return  shortUrl;
}