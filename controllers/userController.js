const UserModel = require("../models/User");
const Followers = require("../models/Followers");
const Followings = require("../models/Followings");
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
const Mongoose = require("mongoose");


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
    const currentUser = res.locals.user;
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
        }).lean()

        if (!user) {
            return res.status(500).send({
                error: 'User does not exist'
            })
        }
        const pipeline = [{
                $match: {
                    _id: Mongoose.Types.ObjectId(user._id)
                }
            },
            {
                $lookup: {
                    from: 'followers',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'userFollowers'
                }
            },
            {
                $lookup: {
                    from: 'followings',
                    localField: '_id',
                    foreignField: 'user',
                    as: 'userFollowings'
                }
            }, {
                $addFields: {
                    userFollowers: {
                        $cond: [{
                                $eq: ["$userFollowers", []]
                            },
                            [
                                []
                            ], '$userFollowers'
                        ]
                    }
                },
            },
            {
                $addFields: {
                    userFollowings: {
                        $cond: [{
                                $eq: ["$userFollowings", []]
                            },
                            [
                                []
                            ], '$userFollowings'
                        ]
                    }
                }
            },
            {
                $unwind: '$userFollowings'
            },
            {
                $unwind: '$userFollowers'
            },
            {
                $addFields: {
                    followersCount: {
                        $size: '$userFollowers.followers'
                    },
                    followingsCount: {
                        $size: '$userFollowings.followings'
                    }
                }
            },
            {
                $project: {
                    'password': 0,
                    '__v': 0,
                    userFollowers: 0,
                    userFollowings: 0,
                }
            }
        ]
        const userDocument = await UserModel.aggregate(pipeline);
        const isCurrentUserFollowing = await Followers.findOne({
            user: user._id,
            'followers.user': {
                $in: [currentUser._id]
            }
        }, {
            user: 1
        })
        userDocument[0].isFollowing = Boolean(isCurrentUserFollowing);
        if (!user) {
            return res.status(404).send({
                error: 'Username does not exist'
            })
        }
        return res.status(200).send(userDocument[0])
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
        const isFollowedUser = await Followers.findOne({
            user: useridToFollow,
            'followers.user': {
                $in: [currentUser._id]
            }
        }).count()
        // if not make follow him :)
        if (!isFollowedUser) {
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
            }, {
                upsert: true
            });
            // update curretnt user following
            // see if user is already following somehow
            const isfollowingUser = await Followings.findOne({
                user: currentUser._id,
                'followings.user': {
                    $in: [useridToFollow]
                }
            }).count()

            if (isfollowingUser) {
                return res.status(500).send({
                    error: 'You are already following the user somehow!'
                })
            }
            // update current user followings
            const followingsUpdate = await Followings.updateOne({
                user: currentUser._id,
                'followings.user': {
                    $ne: useridToFollow
                }
            }, {
                $push: {
                    followings: {
                        user: useridToFollow
                    }
                }
            }, {
                upsert: true
            });

        } else {
            return res.status(200).send({
                error: 'You are already following this user'
            })
        }


        return res.status(200).send('success')

    } catch (error) {
        next(error)
    }
}

module.exports.getFollowers = async (req, res, next) => {
    const userid = req.params.userid;
    const currentUser = res.locals.user;
    try {
        if (!userid) {
            return res.status(400).send({
                error: 'Please provide userid'
            })
        }
        const pipeline = [{
                $match: {
                    user: Mongoose.Types.ObjectId(userid)
                },
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        userId: '$followers.user'
                    },
                    pipeline: [{
                            $match: {
                                // Using the $in operator instead of the $eq
                                // operator because we can't coerce the types
                                $expr: {
                                    $in: ['$_id', '$$userId']
                                },
                            },
                        },
                        {
                            $limit: 5
                        }
                    ],
                    as: 'users',
                }
            }, {
                $lookup: {
                    from: 'followers',
                    localField: 'users._id',
                    foreignField: 'user',
                    as: 'userFollowers',
                },

            }, {
                $addFields: {
                    count: {
                        $size: '$followers'
                    }
                }
            }, {
                $addFields: {
                    userFollowers: {
                        $cond: [{
                                $eq: ["$userFollowers", []]
                            },
                            [
                                []
                            ], '$userFollowers'
                        ]
                    }
                },
            },
            {
                $project: {
                    'users._id': 1,
                    'users.username': 1,
                    'users.avatar': 1,
                    'users.fullName': 1,
                    userFollowers: 1,
                    count: 1,
                },
            },
        ]
        const user = await Followers.aggregate(pipeline)

        //check if user followers exist 
        // check if current user following any user
        const isUserFollowedAnyOneUser = []
        user[0].userFollowers.forEach(user => {
            const isFollowed = user.followers.find(e => e.user.equals(currentUser._id));
            // user not followed 
            if(isFollowed === undefined)return
            // user followed
            if (isFollowed) isUserFollowedAnyOneUser.push(user.user.toString())
        })

        // now add isFollowing property
        user[0].users.forEach(user => {
            if (isUserFollowedAnyOneUser.includes(user._id.toString())) {
                user.isFollowing = true;
            } else {
                user.isFollowing = false;
            }
        })
        const result = {
            count: user[0].count,
            users: user[0].users
        }
        return res.status(200).send(result)
    } catch (error) {
        next(error)
    }
}


module.exports.getFollowings = async (req, res, next) => {
    const userid = req.params.userid;
    const currentUser = res.locals.user;
    try {
        if (!userid) {
            return res.status(400).send({
                error: 'Please provide userid'
            })
        }
        const pipeline = [{
                $match: {
                    user: Mongoose.Types.ObjectId(userid)
                },
            },
            {
                $lookup: {
                    from: 'users',
                    let: {
                        userId: '$followings.user'
                    },
                    pipeline: [{
                            $match: {
                                // Using the $in operator instead of the $eq
                                // operator because we can't coerce the types
                                $expr: {
                                    $in: ['$_id', '$$userId']
                                },
                            },
                        },
                        {
                            $limit: 5
                        }
                    ],
                    as: 'users',
                }
            }, {
                $lookup: {
                    from: 'followers',
                    localField: 'users._id',
                    foreignField: 'user',
                    as: 'userFollowers',
                },

            }, {
                $addFields: {
                    count: {
                        $size: '$followings'
                    }
                }
            },
            {
                $project: {
                    'users._id': 1,
                    'users.username': 1,
                    'users.avatar': 1,
                    'users.fullName': 1,
                    userFollowers: 1,
                    count: 1,
                },
            },
        ]
        const user = await Followings.aggregate(pipeline)
        //check if user followers exist 
        // check if current user following any user
        // handel deafualt case in pipeline and handel errors
        const isUserFollowedAnyOneUser = []
        user[0].userFollowers.forEach(user => {
            const isFollowed = user.followers.find(e => e.user.equals(currentUser._id)).user.toString();
            if (isFollowed) isUserFollowedAnyOneUser.push(user.user.toString())
        })
        // now add isFollowing property
        user[0].users.forEach(user => {
            if (isUserFollowedAnyOneUser.includes(user._id.toString())) {
                user.isFollowing = true;
            } else {
                user.isFollowing = false;
            }
        })

        const result = {
            count: user[0].count,
            users: user[0].users
        }
        return res.status(200).send(result)
    } catch (error) {
        next(error)
    }
}