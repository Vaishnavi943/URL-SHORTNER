import wrapAsync from "../utils/tryCatchWrapper.js";
import { getAllUserUrlsDao } from "../dao/user.dao.js";


export const getAllUserUrls = wrapAsync(async (req, res) => {
    const {__id} = req.user;
    const urls = await getAllUserUrlsDao(__id);
    res.status(200).json({message: "success", urls})
})

