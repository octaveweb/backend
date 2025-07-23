import asyncHandler from "../utils/asyncHAndler.js";
import {ApiError} from "../utils/Apierror.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudnary} from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/ApiResponce.js";

const registerUser = asyncHandler( async (req, res) => {
    // Gate user information {DONE}
    // validation - not empty {DONE}
    // chack if a user is already exist: username, email {DONE}
    // check for image, check for avatat {DONE}
    // uplode them to cloudinary, avatar cheack {DONE}
    // create user object - create entry in DB {DONE}
    // remove password and refresh token field from respponce {DONE}
    // cheack for user creation is NULL or "User Created" {DONE}
    // return responce {DONE}


  const {fullName, username, email, password} = req.body
    console.log("fullName: ", fullName,"username: ",username, "email: ", email, "password: ", password)
/* console.log(req.body);
output:
{
  fullName: 'Karan Swarnakar',
  email: 'karanswarnakar955@gmail.com',
  username: 'karan007',
  password: 'Pass#123'
}
*/
  /* 
  validation chack if fullname field  
  if (fullName == "") {
      throw new ApiError(400, "fullname is requried");
    }
  */

  // Validation
  if (
    [fullName, username, email, password].some((field)=> field?.trim() === "")) 
    {
      throw new ApiError(400, "All fields are required")
    }
  // Chack if a user is already exist: username, email
   const existedUser =  User.findOne({
      $or: [{ username }, { email }]
    })
    if (existedUser) {
      throw new ApiError(409, "User with username already exist");
    }
    /* console.log(existedUser);
    output:
    User with username already exist
    */

    // Check for image, check for avata
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatar){
      throw new ApiError(400, "avtar file is required");
    }
    // Uplode them to cloudinary 
   const avatar =  await uploadOnCloudnary(avatarLocalPath)
   const coverImage = await uploadOnCloudnary(coverImageLocalPath)
   // Again Check if avatar properly went or not becouse avatar is a REQUIRED field  
   if(!avatar){
      throw new ApiError(400, "avtar file is required");
    }
    // Create user object
   const user = await User.create({
      fullName,
      avatar:avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()
    })
});
// Remove password and refresh token field from respponce 
const createdUseer = await User.findById(user._id).select(
  "-password -refreshToken"
)
// Cheack for user creation is NULL or "User Created" 
if(!createdUseer){
  throw new ApiError(500,"Somthing went wrong while registering the user");
  
}
// Return responce
return res.status(201).json(
  new ApiResponce(200, createdUseer, "User register Successfully")
)
export {registerUser}