const Tweet = require('../models/Tweet');
const Mongoose = require("mongoose");
const filters = ['top', 'live', 'images', 'video']
module.exports.searchTweets = async (req, res, next) => {
    let {
        query,
        filter,
        offset
    } = req.body;

    try {
        const currentUser = res.locals.user;
        if (isNaN(offset)) {
            offset = 0
        }
        if (!query || !filter) {
            return res.status(500).json({
                error: 'Provide require params'
            })
        }
        if (!filters.includes(filter)) {
            return res.status(400).json({
                error: 'Invalid filter given'
            })
        }
        const pipeline = [{
                $match: {
                    caption: {
                        $regex: new RegExp(query)
                    },
                },

            },
            {
                $skip: offset
            },
            {
                $limit: 5,
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
                $lookup: {
                    from: 'followers',
                    localField: 'user._id',
                    foreignField: 'user',
                    as: 'userFollowers'
                }
            },
            {
                $addFields: {
                    userFollowers: {
                        $cond: [{
                                $eq: ["$userFollowers", []]
                            },
                            [{
                                followers: []
                            }], '$userFollowers'
                        ]
                    }
                }
            },
            {
                $unwind: '$userFollowers'
            },
            {
                $addFields: {
                    userFollowers: '$userFollowers.followers'
                }
            },
            {
                $addFields: {
                    isFollowing: {
                        $in: [currentUser._id, '$userFollowers.user']
                    }
                }
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
                $lookup: {
                    from: 'tweets',
                    localField: '_id',
                    foreignField: 'in_reply_to_status_id',
                    as: 'tweetReplies'
                }
            },
            {
                $addFields: {
                    replyCount: {
                        $size: '$tweetReplies'
                    }
                }
            },

            {
                $lookup: {
                    from: 'retweets',
                    localField: '_id',
                    foreignField: 'tweet',
                    as: 'retweets'
                }
            },
            {
                $addFields: {
                    retweets: {
                        $cond: [{
                                $eq: ["$retweets", []]
                            },
                            [{
                                users: []
                            }], '$retweets'
                        ]
                    }
                }
            },
            {
                $unwind: {
                    path: '$retweets',
                    preserveNullAndEmptyArrays: true,
                }
            },
            {
                $addFields: {
                    retweetCount: {
                        $size: '$retweets.users'
                    }
                }
            },
            {
                $addFields: {
                    isRetweeted: {
                        $in: [Mongoose.Types.ObjectId(currentUser._id), '$retweets.users.user']
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
                    tweetReplies: 0,
                    retweets: 0,
                    userFollowers: 0,
                }
            }
        ]
        const liveFilter = {
            $sort:{createdAt:-1}
        }
        const imagesFilter = {
            $match: {
                caption: {
                    $regex: new RegExp(query)
                },
                pic: {
                    $ne: null
                }
            },

        }
        if(filter == 'live'){
            pipeline.splice(1,0,liveFilter)
        }
        else if(filter == 'images'){
            pipeline.splice(0,0,imagesFilter)
        }
        const tweets = await Tweet.aggregate(pipeline);
        res.status(200).json(tweets)
    } catch (error) {
        next(error)
    }
}