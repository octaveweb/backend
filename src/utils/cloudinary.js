import { v2 as cloudinary } from 'cloudinary';
import fs from fs;

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET// Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadOnCloudnary = async (localFilePath) => {
        try {
            if (!localFilePath) return null
            //uplode the file in clounary
            const responce = await cloudinary.uploader.upload(localFilePath,{
                resource_type: "auto"
            })
            // fill has been uplodded sucessfully
            console.log("fill has been uplodded sucessfully", responce.url);
            return responce;
            
        } catch (error) {
            fs.unlinkSync(localFilePath) //remove locally saved temporary file as the uplode operation got failed
            return null;
        }
     }
       
     export {uploadOnCloudnary}