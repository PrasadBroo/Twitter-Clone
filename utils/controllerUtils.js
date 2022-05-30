const Mongoose = require("mongoose");
const Tweet = require('../models/Tweet');

module.exports.retriveComments = async (tweetid,currentUser,offset=0) => {
    if (isNaN(offset)) {
        offset = 0
    }
    try {

        const pipeline = [
            {
                $match: {
                    _id: Mongoose.Types.ObjectId(tweetid),
                }
            },
            {
                $lookup: {
                    from: 'tweets',
                    let: {
                        tweetId: '$_id'
                    },
                    pipeline: [{
                            $match: {
                                "$expr": {
                                    "$eq": ["$in_reply_to_status_id", "$$tweetId"]
                                }
                            }
                        },{
                            $skip:offset
                        },
                        {
                            $limit: 10
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'user',
                                foreignField: '_id',
                                as: 'user'
                            }
                        },
                        {
                            $addFields: {
                                user: {
                                    $arrayElemAt: ['$user', 0]
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
                                from: 'tweetlikes',
                                localField: '_id',
                                foreignField: 'tweet',
                                as: 'tweetLikes'
                            }
                        }, {
                            $addFields: {
                                tweetLikes: {
                                    $cond: [{
                                            $eq: ["$tweetLikes", []]
                                        },
                                        [{
                                            likedBy: []
                                        }], '$tweetLikes'
                                    ]
                                }
                            }
                        },
                        {
                            $unwind: {
                                path: '$tweetLikes',
                                preserveNullAndEmptyArrays: true
                            }
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
                        {
                            $addFields: {
                                likesCount: {
                                    $size: '$tweetLikes'
                                }
                            }
                        },
                        {
                            $lookup:{
                                from: 'retweets',
                                localField: '_id',
                                foreignField: 'tweet',
                                as: 'retweets'
                              }
                        },
                        {
                            $addFields:{
                                retweets:{$cond: [{
                                    $eq: ["$retweets", []]
                                },
                                [{
                                    users: []
                                }], '$retweets'
                            ]}
                            }
                        },
                        {
                            $unwind:{
                                path:'$retweets',
                                preserveNullAndEmptyArrays:true,
                            }
                        },
                        {
                            $addFields:{
                                retweetCount:{$size:'$retweets.users'},
                                isRetweeted: {
                                    $in: [Mongoose.Types.ObjectId(currentUser._id), '$retweets.users.user']
                                }
                            }
                        },
                        {
                            $project:{
                                tweetLikes:0,
                                tweetReplies:0,
                                retweets:0,
                                'user.password': 0,
                                'user.bio': 0,
                                'user.email': 0,
                                'user.website': 0,
                                'user.location': 0,
                                'user.backgroundImage': 0,
                                'user.__v': 0,
                                'tweetReplies': 0,
                                'tweetLikes': 0,
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
                    as: 'replies'
                }
            },
            {
                $project:{
                    replies:1
                }
            }
        ]
        const data = await Tweet.aggregate(pipeline);
        return data[0].replies;
    } catch (error) {
        throw new Error(error)
    }
}