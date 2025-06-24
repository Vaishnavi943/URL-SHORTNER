import { getShortUrl } from "../dao/short_url.js";
import { createShortUrlWithoutUser, createShortUrlWithUser} from "../services/short_url.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

// post
export const createShortUrl = wrapAsync( async (req, res) => {
        if(!req.body || !req.body.longUrl) {
            return res.status(400).send("Invalid request: longUrl is required");
        }
        const data = req.body;     // full-url, slug
        let shortUrl;
        if(req.user){
             shortUrl = await createShortUrlWithUser(data.longUrl, req.user._id, data.slug);
            res.status(200).json({shortUrl: process.env.APP_URL + shortUrl});
        }else{
            shortUrl = await createShortUrlWithoutUser(data.longUrl);
        }
        res.status(200).json({shortUrl: process.env.APP_URL + shortUrl});
});


// get
export const redirectFromShortUrl = wrapAsync (async (req, res) => {
        const {id} = req.params;
        const url = await getShortUrl(id);
        console.log(url);
        if (!url) {
            return res.status(404).send("Short URL not found");
        }
        res.redirect(url.full_url);
});

export const createCustomeShortUrl = wrapAsync(async (req, res) => {
    const {url, slug} = req.body;
    const shortUrl = await createShortUrlWithoutUser(url, slug);
    res.status(200).json({shortUrl: process.env.APP_URL + shortUrl});
})