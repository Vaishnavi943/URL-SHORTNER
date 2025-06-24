import axiosInstance from '../utils/axiosInstance.js';

// post
// export const createShortUrl = async (longUrl, slug) => {
//     const { data } = await axiosInstance.post("/api/create", {longUrl, slug});
//     return data.shortUrl;
// }


// post
export const createShortUrl = async (data) => {
    const { data: response } = await axiosInstance.post("/api/create/", data);
    return response.shortUrl;
}