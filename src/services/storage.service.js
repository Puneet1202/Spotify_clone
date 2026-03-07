

import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

export async function uploadFile(file){
    try{
        const result = await imagekit.files.upload({
            file,
            fileName:"music_"+Date.now(),
            folder:"yt-complete-backend/music"
        })
        return result;
    }catch(error){
        console.log(error);
        return error;
    }
}
