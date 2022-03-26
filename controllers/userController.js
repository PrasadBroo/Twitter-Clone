const User = require("../models/User");
const Followers = require("../models/Followers");
const Followings = require("../models/Followings");
const Tweet = require('../models/Tweet')
const TweetLike = require('../models/TweetLikes');
const {
    cloudinary
} = require("../services/cloudinary");
const {
    verifyName,
    verifyLocation,
    verifyBio,
    verifyWebsite,
    verifyUsername,
    isEmpty
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
        const userUpdated = await User.updateOne({
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
        const user = await User.findOne({
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
        const userDocument = await User.aggregate(pipeline);
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
        const userToFollow = await User.findById(useridToFollow);
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
module.exports.unfollowUser = async (req, res, next) => {
    const useridToUnFollow = req.params.userid;
    const currentUser = res.locals.user;
    try {
        const userToFollow = await User.findById(useridToUnFollow);
        if (!userToFollow) {
            return res
                .status(400)
                .send({
                    error: 'Could not find a user with that id :('
                });
        }
        // check if user already followed user
        const isUnFollowedUser = await Followers.findOne({
            user: useridToUnFollow,
            'followers.user': {
                $in: [currentUser._id]
            }
        }).count()


        if (isUnFollowedUser) {
            const followerUpdate = await Followers.updateOne({
                user: useridToUnFollow,
            }, {
                $pull: {
                    followers: {
                        user: currentUser._id
                    }
                }
            }, );
            // update curretnt user following
            // see if user is already following somehow
            const isfollowingUser = await Followings.findOne({
                user: currentUser._id,
                'followings.user': {
                    $in: [useridToUnFollow]
                }
            }).count()

            if (!isfollowingUser) {
                return res.status(500).send({
                    error: 'You are already unfollowing the user somehow!'
                })
            }
            // update current user followings
            const followingsUpdate = await Followings.updateOne({
                user: currentUser._id,

            }, {
                $pull: {
                    followings: {
                        user: useridToUnFollow
                    }
                }
            });

        } else {
            return res.status(200).send({
                error: 'You are already unfollowing this user'
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
                $facet: {
                    users: [{
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
                            },
                        },

                    ],
                    count: [{
                            $match: {
                                user: Mongoose.Types.ObjectId(userid)
                            },
                        },
                        {
                            $addFields: {
                                count: {
                                    $size: '$followers'
                                }
                            },
                        },
                        {
                            $project: {
                                count: 1,
                            }
                        },

                    ]
                },

            },
            {
                $project: {
                    count: {
                        $arrayElemAt: ['$count', 0]
                    },
                    users: {
                        $arrayElemAt: ['$users', 0]
                    },
                }
            }, {
                $project: {
                    count: '$count.count',
                    users: '$users.users'
                }
            }
        ]
        const data = await Followers.aggregate(pipeline)

        if (isEmpty(data[0])) {
            return res.send({
                users: [],
                count: 0
            })
        }
        let users = data[0].users;
        users = await Promise.all(users.map(async user => {
            const isFollowing = await Followers.findOne({
                user: user._id,
                'followers.user': {
                    $in: [currentUser._id]
                }
            })
            user.isFollowing = Boolean(isFollowing);
        }))



        return res.status(200).send(data[0])
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
                $facet: {
                    users: [{
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
                        },

                        {
                            $project: {
                                'users._id': 1,
                                'users.username': 1,
                                'users.avatar': 1,
                                'users.fullName': 1,
                            },
                        },

                    ],
                    count: [{
                            $match: {
                                user: Mongoose.Types.ObjectId(userid)
                            },
                        },
                        {
                            $addFields: {
                                count: {
                                    $size: '$followings'
                                }
                            },
                        },
                        {
                            $project: {
                                count: 1,
                            }
                        },

                    ]
                },

            },
            {
                $project: {
                    count: {
                        $arrayElemAt: ['$count', 0]
                    },
                    users: {
                        $arrayElemAt: ['$users', 0]
                    },
                }
            }, {
                $project: {
                    count: '$count.count',
                    users: '$users.users'
                }
            }
        ]
        const data = await Followings.aggregate(pipeline)
        //check if user followers exist 
        // check if current user following any user
        // handel deafualt case in pipeline and handel errors
        if (isEmpty(data[0])) {
            return res.send({
                users: [],
                count: 0
            })
        }
        let users = data[0].users;
        users = await Promise.all(users.map(async user => {
            const isFollowing = await Followers.findOne({
                user: user._id,
                'followers.user': {
                    $in: [currentUser._id]
                }
            })
            user.isFollowing = Boolean(isFollowing);
        }))

        return res.status(200).send(data[0])
    } catch (error) {
        next(error)
    }
}

module.exports.getUserTweets = async (req, res, next) => {
    const userid = req.params.userid;
    const currentUser = res.locals.user;
    try {
        const pipeline = [{
            $facet: {
                tweets: [{
                        $match: {
                            user: Mongoose.Types.ObjectId(userid)
                        },

                    },
                    {
                        $lookup: {
                            from: 'users',
                            localField: 'user',
                            foreignField: '_id',
                            as: 'user',

                        }
                    },
                    {
                        $unwind: '$user'
                    },
                    {
                        $limit: 10,
                    },
                    {
                        $lookup: {
                            from: 'tweetlikes',
                            localField: '_id',
                            foreignField: 'tweet',
                            as: 'likes'
                        }
                    },
                    {
                        $addFields: {
                            likes: {
                                $cond: [{
                                        $eq: ["$likes", []]
                                    },
                                    [{
                                        likedBy: []
                                    }], '$likes'
                                ]
                            }
                        }
                    },

                    {
                        $unwind: '$likes'
                    },
                    {
                        $addFields: {
                            isLiked: {
                                $in: [Mongoose.Types.ObjectId(currentUser._id), '$likes.likedBy.user']
                            }
                        }
                    },
                    {
                        $addFields: {
                            likesCount: {
                                $size: '$likes.likedBy'
                            }
                        }
                    },

                    {
                        $project: {
                            __v: 0,
                            'user.password': 0,
                            'user.bio': 0,
                            'user.email': 0,
                            'user.website': 0,
                            'user.location': 0,
                            'user.backgroundImage': 0,
                            'user,__v': 0,
                            likes: 0,

                        }
                    }
                ],
                tweetsCount: [{
                    $match: {
                        user: Mongoose.Types.ObjectId(userid)
                    }
                }, {
                    $count: 'count'
                }, ],

            }
        }, {
            $unwind: '$tweetsCount'
        }, {
            $project: {
                tweets: 1,
                count: '$tweetsCount.count'
            }
        }];
        const data = await Tweet.aggregate(pipeline)
        const result = data.length === 0 ? {
            tweets: [],
            count: 0
        } : data[0]
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
}

module.exports.getUserLikedTweets = async (req, res, next) => {
    const userid = req.params.userid;
    const currentUser = res.locals.user;
    try {
        const pipeline = [{
                $facet: {
                    tweets: [{
                            $match: {
                                $expr: {
                                    $in: [
                                        Mongoose.Types.ObjectId(userid), '$likedBy.user'
                                    ]
                                }
                            }
                        }, {
                            $lookup: {
                                from: 'tweets',
                                localField: 'tweet',
                                foreignField: '_id',
                                as: 'tweet'
                            }
                        }, {
                            $unwind: {
                                path: '$tweet'
                            }
                        }, {
                            $lookup: {
                                from: 'users',
                                localField: 'tweet.user',
                                foreignField: '_id',
                                as: 'user'
                            }
                        }, {
                            $unwind: {
                                path: '$user'
                            }
                        }, {
                            $addFields: {
                                'tweet.user': '$user'
                            }
                        },
                        {
                            $addFields: {
                                'tweet.likesCount': {
                                    $size: '$likedBy'
                                }
                            }
                        },
                        {
                            $addFields: {
                                'tweet.isLiked': {
                                    $in: [Mongoose.Types.ObjectId(currentUser._id), '$likedBy.user']
                                },
                            }
                        }, {
                            $replaceRoot: {
                                newRoot: "$tweet"
                            }
                        },
                        {
                            $project: {
                                __v: 0,
                                'user.password': 0,
                                'user.bio': 0,
                                'user.email': 0,
                                'user.website': 0,
                                'user.location': 0,
                                'user.backgroundImage': 0,
                                'user.__v': 0,

                            }
                        }
                    ],
                    tweetsCount: [{
                        $match: {
                            $expr: {
                                $in: [
                                    Mongoose.Types.ObjectId(userid), '$likedBy.user'
                                ]
                            }
                        }
                    }, {
                        $count: 'count'
                    }, ],
                }
            }, {
                $addFields: {
                    tweetsCount: {
                        $arrayElemAt: ['$tweetsCount', 0]
                    }
                }
            },
            {
                $project: {
                    tweets: 1,
                    count: '$tweetsCount.count'
                }
            }


        ];
        const likedTweets = await TweetLike.aggregate(pipeline)
        res.status(200).send(likedTweets[0])
    } catch (error) {
        next(error)
    }
}

module.exports.getUserMediaTweets = async (req, res, next) => {
    const userid = req.params.userid;
    const currentUser = res.locals.user;
    try {
        const pipeline = [{
                $facet: {
                    tweets: [{
                            $match: {
                                user: Mongoose.Types.ObjectId(userid),
                                pic: {
                                    $ne: null
                                }
                            }
                        }, {
                            $lookup: {
                                from: 'users',
                                localField: 'user',
                                foreignField: '_id',
                                as: 'user'
                            }
                        }, {
                            $unwind: {
                                path: '$user'
                            }
                        }, {
                            $addFields: {
                                'user': '$user'
                            }
                        },
                        {
                            $project: {
                                __v: 0,
                                'user.password': 0,
                                'user.bio': 0,
                                'user.email': 0,
                                'user.website': 0,
                                'user.location': 0,
                                'user.backgroundImage': 0,
                                'user.__v': 0,
                            }
                        },
                        {
                            $lookup: {
                                from: 'tweetlikes',
                                localField: '_id',
                                foreignField: 'tweet',
                                as: 'tweetLikes'
                            }
                        }, {
                            $unwind: '$tweetLikes'
                        },
                        {
                            $addFields: {
                                tweetLikes: '$tweetLikes.likedBy'
                            }
                        },
                        {
                            $addFields: {
                                isLiked: {
                                    $in: [Mongoose.Types.ObjectId(currentUser._id), '$tweetLikes.user']
                                }
                            }
                        },
                        


                    ],
                    tweetsCount: [{
                        $match: {
                            user: Mongoose.Types.ObjectId(userid),
                            pic: {
                                $ne: null
                            }
                        }
                    }, {
                        $count: 'count'
                    }, ],
                }
            },
            {
                $addFields: {
                    tweetsCount: {
                        $arrayElemAt: ['$tweetsCount', 0]
                    }
                }
            },
            {
                $project: {
                    tweets: 1,
                    count: '$tweetsCount.count'
                }
            }


        ];
        const likedTweets = await Tweet.aggregate(pipeline)
        if(!("count" in likedTweets[0])){
            likedTweets[0].count=0
        }
        res.status(200).send(likedTweets[0])
    } catch (error) {
        console.log(error)
        next(error)
    }
}