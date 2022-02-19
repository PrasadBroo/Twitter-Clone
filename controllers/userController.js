const User = require("../models/User");
const {
    cloudinary
} = require("../services/cloudinary");
const {
    verifyName,
    verifyLocation,
    verifyBio,
    verifyWebsite,
    verifyUsername
} = require("../utils/validations");


module.exports.updateProfile = async (req, res, next) => {
    const {
        user
    } = res.locals;
    try {
        const {
            bcPic,
            profilePic,
            fullName,
            bio,
            website,
            location
        } = req.body;
        verifyName(fullName)
        verifyLocation(location)
        verifyWebsite(website)
        verifyBio(bio)
        if (!bcPic || !profilePic) {
            return res.status(500).send('Provide background and profile pic');
        }

        const bcPicResponse = await cloudinary.uploader.upload(bcPic, {
            upload_presset: 'background_pics',
            folder:'backgroundPics',
            public_id:user._id
        })
        const profilePicResponse = await cloudinary.uploader.upload(profilePic, {
            upload_presset: 'profile_pics',
            folder:'profilePics',
            public_id:user._id
        })
        const userUpdated = await User.updateOne({
            _id: user._id
        }, {
            $set :{
                fullName:fullName,
                bio:bio,
                website:website,
                location:location,
                avatar:profilePicResponse.secure_url,
                backgroundImage:bcPicResponse.secure_url,
            }

        })

        return res.send('success')
    } catch (error) {
        next(error)
    }
}
module.exports.fethUser = async(req,res,next)=>{
    const {username} = req.body;
    try {
        try {
            verifyUsername(username)
        } catch (error) {
            return res.status(500).send({error:'Invalid username provided'})
        }
        const user = await User.findOne({username},{password:0,__v:0,email:0})
        if(!user){
            return res.status(404).send({error:'Username does not exist'})
        }
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}