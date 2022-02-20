const UserModel = require("../models/User");
const Followers = require("../models/Followers");
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
            folder: 'backgroundPics',
            public_id: user._id
        })
        const profilePicResponse = await cloudinary.uploader.upload(profilePic, {
            upload_presset: 'profile_pics',
            folder: 'profilePics',
            public_id: user._id
        })
        const userUpdated = await UserModel.updateOne({
            _id: user._id
        }, {
            $set: {
                fullName: fullName,
                bio: bio,
                website: website,
                location: location,
                avatar: profilePicResponse.secure_url,
                backgroundImage: bcPicResponse.secure_url,
            }

        })

        return res.send('success')
    } catch (error) {
        next(error)
    }
}
module.exports.fethUser = async (req, res, next) => {
    const {
        username
    } = req.body;
    try {
        try {
            verifyUsername(username)
        } catch (error) {
            return res.status(500).send({
                error: 'Invalid username provided'
            })
        }
        const user = await UserModel.findOne({
            username
        }, {
            password: 0,
            __v: 0,
            email: 0
        })
        if (!user) {
            return res.status(404).send({
                error: 'Username does not exist'
            })
        }
        return res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}
module.exports.followUser = async (req, res, next) => {
    const useridToFollow = req.params.userid;
    const currentUser = res.locals.user;
    try {
        const userToFollow = await UserModel.findById(useridToFollow);
        if (!userToFollow) {
            return res
                .status(400)
                .send({
                    error: 'Could not find a user with that id :('
                });
        }
        // check if user already followed user
        const isFollowedUser = await Followers.findOne({user:useridToFollow,'followers.user':{$in:[currentUser._id]}}).count()
        // if not make follow him :)
        if(!isFollowedUser){
            const followerUpdate = await Followers.updateOne({
                user: useridToFollow,
                'followers.user': {
                    $ne: currentUser._id
                }
            }, {
                $push: {
                    followers: {
                        user: currentUser._id
                    }
                }
            },{upsert:true});
            // update curretnt user following

        }

        
        return res.status(500).send({error:'You are already following the user'})

    } catch (error) {
        next(error)
    }
}