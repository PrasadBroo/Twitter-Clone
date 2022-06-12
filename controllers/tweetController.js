const Tweet = require('../models/Tweet');
const Hashtags = require('../models/Hashtags');
const Mentions = require('../models/Mentions');
const TweetLike = require('../models/TweetLikes');
const Retweet = require('../models/Retweet');
const Bookmark = require('../models/Bookmark');
const Notification = require('../models/Notification');
const User = require('../models/User')
const linkify = require('linkifyjs');
require('linkify-plugin-hashtag');
require('linkify-plugin-mention');
const Mongoose = require("mongoose");
const {
    cloudinary
} = require("../services/cloudinary");
const {
    retriveComments
} = require('../utils/controllerUtils');
const {
    isAdultContent
} = require('../services/moderatecontent');

module.exports.postTweet = async (req, res, next) => {
    const currentUser = res.locals.user;
    try {
        let {
            caption,
            pic,
            tweetid
        } = req.body;
        if (!pic) pic = null
        if (!caption) return res.send({
            error: 'tweet body can not be empty!'
        })
        // if tweetid presents verify if it exist then add tweet
        const isTweetIdExist = await Tweet.findOne({
            _id: tweetid
        });
        if (!isTweetIdExist && tweetid) {
            return res.status(400).send({
                error: 'Parent tweet does not exist'
            })
        }

        // add to tweet collection
        const tweet = await Tweet.create({
            user: currentUser._id,
            caption,
            in_reply_to_status_id: tweetid ? isTweetIdExist._id : null
        });
        if (isTweetIdExist) {
            Notification.create({
                sender: currentUser._id,
                receiver: isTweetIdExist.user,
                notificationType: 'comment',
                createdAt: Date.now(),
                data: {
                    tweetid: tweet._id
                }
            })
        }
        if (pic) {
            const tweetPicResponse = await cloudinary.uploader.upload(pic, {
                upload_presset: 'tweet_images',
                folder: 'tweet_images',
                public_id: tweet._id
            })
            const picShouldBeRemoved = await isAdultContent(tweetPicResponse.secure_url)
            if (picShouldBeRemoved) cloudinary.uploader.destroy(`tweet_images/${tweet._id}`) //

            await Tweet.updateOne({
                _id: tweet._id
            }, {
                $set: {
                    pic: !picShouldBeRemoved ? tweetPicResponse.secure_url : null
                }
            })
        }
        const tweetHashtags = new Set();
        const tweetMentions = new Set();
        const linkifyData = linkify.find(caption);
        linkifyData.forEach(e => {
            if (e.type === 'hashtag') {
                tweetHashtags.add(e.value)
            } else if (e.type === 'mention') {
                tweetMentions.add(e.value.slice(1))
            }
        })
        let temp = [...tweetMentions]
        let mentionedUsers = await Promise.all(temp.map(async e => {
            let user = await User.findOne({
                username: e
            }, {
                _id: 1
            });
            if (!user) return
            return ({
                user: user._id
            })
        }))

        mentionedUsers = mentionedUsers.filter(e => e)


        // check mentions 
        const MentionsUpdate = await Mentions.updateOne({
            tweet: tweet._id,
        }, {
            $push: {
                mentions: {
                    $each: [...mentionedUsers]
                }
            }
        }, {
            upsert: true
        });
        // check hashtags
        const hashtagsUpdate = await Hashtags.updateOne({
            tweet: tweet._id,
        }, {
            $push: {
                hashtags: {
                    $each: [...tweetHashtags]
                }
            }
        }, {
            upsert: true
        });
        // send notification for mentioned user
        mentionedUsers.forEach(user => {
            Notification.create({
                sender: currentUser._id,
                receiver: user.user,
                notificationType: 'mention',
                createdAt: Date.now(),
                data: {
                    tweetid: tweet._id
                }
            })
        })
        res.status(201).send(tweet)
    } catch (error) {
        next(error)
    }
}

module.exports.likeTweet = async (req, res, next) => {
    const tweetid = req.params.tweetid;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) {
            return res.status(400).send({
                error: 'please provide tweetid to like!'
            })
        }
        const tweet = await Tweet.findOne({
            _id: tweetid
        })
        if (!tweet) {
            return res.status(404).send({
                error: 'Tweet does not exist'
            });
        }
        const tweetLikeUpdate = await TweetLike.updateOne({
            tweet: tweetid,
            'likedBy.user': {
                $ne: currentUser._id
            }
        }, {
            $push: {
                likedBy: {
                    user: currentUser._id
                }
            }
        }, {
            upsert: true
        });

        Notification.create({
            sender: currentUser._id,
            receiver: tweet.user,
            notificationType: 'like',
            createdAt: Date.now(),
            data: {
                tweetid: tweet._id
            }
        })
        res.status(200).send('success');
    } catch (error) {
        next(error)
    }
}

module.exports.unlikeTweet = async (req, res, next) => {
    const tweetid = req.params.tweetid;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) {
            return res.status(400).send({
                error: 'please provide tweetid to UNlike!'
            })
        }
        const tweetLikeUpdate = await TweetLike.updateOne({
            tweet: tweetid,
            'likedBy.user': {
                $eq: currentUser._id
            }
        }, {
            $pull: {
                likedBy: {
                    user: currentUser._id
                }
            }
        });
        res.status(200).send('success');
    } catch (error) {
        next(error)
    }
}

module.exports.fetchTweet = async (req, res, next) => {
    const tweetid = req.params.tweetid;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) return res.status(400).send({
            error: 'Invalid tweetid'
        })

        const tweet = await Tweet.findOne({
            _id: tweetid
        });
        if (!tweet) return res.status(404).send({
            error: 'Invalid tweetid'
        })

        const pipeline = [{
                $facet: {
                    tweet: [{
                            $match: {
                                _id: Mongoose.Types.ObjectId(tweetid),
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
                                likesCount: {
                                    $size: '$tweetLikes'
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'bookmarks',
                                localField: '_id',
                                foreignField: 'tweet',
                                as: 'bookmarks'
                            }
                        }, {
                            $addFields: {
                                isBookmarked: {
                                    $in: [
                                        Mongoose.Types.ObjectId(currentUser._id), '$bookmarks.user'
                                    ]
                                }
                            }
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
                                },
                                isRetweeted: {
                                    $in: [Mongoose.Types.ObjectId(currentUser._id), '$retweets.users.user']
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
                            $addFields: {
                                isLiked: {
                                    $in: [Mongoose.Types.ObjectId(currentUser._id), '$tweetLikes.user']
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'tweets',
                                localField: 'in_reply_to_status_id',
                                foreignField: '_id',
                                as: 'hasParentTweet'
                            }
                        },
                        {
                            $addFields: {
                                hasParentTweet: {
                                    $cond: [{
                                            $eq: ["$hasParentTweet", []]
                                        },
                                        [{
                                            user: null
                                        }], '$hasParentTweet'
                                    ]
                                }
                            }
                        },
                        {
                            $unwind: '$hasParentTweet'
                        },
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'hasParentTweet.user',
                                foreignField: '_id',
                                as: 'hasParentTweet.user'
                            }
                        },
                        {
                            $lookup: {
                                from: 'tweets',
                                localField: 'hasParentTweet._id',
                                foreignField: 'in_reply_to_status_id',
                                as: 'hasParentTweet.tweetReplies'
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.replyCount': {
                                    $size: '$hasParentTweet.tweetReplies'
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'bookmarks',
                                localField: 'hasParentTweet._id',
                                foreignField: 'tweet',
                                as: 'hasParentTweet.bookmarks'
                            }
                        }, {
                            $addFields: {
                                'hasParentTweet.isBookmarked': {
                                    $in: [
                                        Mongoose.Types.ObjectId(currentUser._id), '$hasParentTweet.bookmarks.user'
                                    ]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'tweetlikes',
                                localField: 'hasParentTweet._id',
                                foreignField: 'tweet',
                                as: 'hasParentTweet.tweetLikes'
                            }
                        }, {
                            $addFields: {
                                'hasParentTweet.tweetLikes': {
                                    $cond: [{
                                            $eq: ["$hasParentTweet.tweetLikes", []]
                                        },
                                        [{
                                            likedBy: []
                                        }], '$hasParentTweet.tweetLikes'
                                    ]
                                }
                            }
                        },
                        {
                            $unwind: {
                                path: '$hasParentTweet.tweetLikes',
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.tweetLikes': '$hasParentTweet.tweetLikes.likedBy'
                            }
                        },
                        {
                            $lookup: {
                                from: 'retweets',
                                localField: 'hasParentTweet._id',
                                foreignField: 'tweet',
                                as: 'hasParentTweet.retweets'
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.retweets': {
                                    $cond: [{
                                            $eq: ["$hasParentTweet.retweets", []]
                                        },
                                        [{
                                            users: []
                                        }], '$hasParentTweet.retweets'
                                    ]
                                }
                            }
                        },
                        {
                            $unwind: {
                                path: '$hasParentTweet.retweets',
                                preserveNullAndEmptyArrays: true,
                            }
                        },
                        {
                            $lookup: {
                                from: 'followers',
                                localField: 'hasParentTweet.user._id',
                                foreignField: 'user',
                                as: 'hasParentTweet.userFollowers'
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.userFollowers': {
                                    $cond: [{
                                            $eq: ["$hasParentTweet.userFollowers", []]
                                        },
                                        [{
                                            followers: []
                                        }], '$hasParentTweet.userFollowers'
                                    ]
                                }
                            }
                        },
                        {
                            $unwind: '$hasParentTweet.userFollowers'
                        },
                        {
                            $addFields: {
                                'hasParentTweet.userFollowers': '$hasParentTweet.userFollowers.followers'
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.isFollowing': {
                                    $in: [currentUser._id, '$hasParentTweet.userFollowers.user']
                                }
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.retweetCount': {
                                    $size: '$hasParentTweet.retweets.users'
                                },
                                'hasParentTweet.isRetweeted': {
                                    $in: [Mongoose.Types.ObjectId(currentUser._id), '$hasParentTweet.retweets.users.user']
                                }
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.isLiked': {
                                    $in: [Mongoose.Types.ObjectId(currentUser._id), '$hasParentTweet.tweetLikes.user']
                                }
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.likesCount': {
                                    $size: '$hasParentTweet.tweetLikes'
                                }
                            }
                        },
                        {
                            $addFields: {
                                'hasParentTweet.user': {
                                    $arrayElemAt: ['$hasParentTweet.user', 0]
                                }
                            }
                        },

                        {
                            $project: {
                                tweetLikes: 0,
                                tweetReplies: 0,
                                retweets: 0,
                                userFollowers: 0,
                                bookmarks: 0,
                                'hasParentTweet.userFollowers': 0,
                                'hasParentTweet.retweets': 0,
                                'hasParentTweet.tweetReplies': 0,
                                'hasParentTweet.tweetLikes': 0,
                                __v: 0,
                                'hasParentTweet.user.password': 0,
                                'hasParentTweet.user.bio': 0,
                                'hasParentTweet.user.email': 0,
                                'hasParentTweet.user.website': 0,
                                'hasParentTweet.user.location': 0,
                                'hasParentTweet.user.backgroundImage': 0,
                                'hasParentTweet.user.__v': 0,
                                'hasParentTweet.bookmarks': 0
                            }
                        }



                    ],
                }
            },
            {
                $project: {
                    tweet: {
                        $arrayElemAt: ['$tweet', 0]
                    },
                }
            }


        ];
        const data = await Tweet.aggregate(pipeline);
        const comments = await retriveComments(tweetid, currentUser)
        data[0].tweet.replies = comments;
        res.status(200).send(data[0])
    } catch (error) {
        next(error)
    }
}

module.exports.postTweetReply = async (req, res, next) => {
    const parentTweetId = req.params.tweetid;
    const currentUser = res.locals.user;
    try {
        let {
            tweetText,
            tweetPic
        } = req.body;
        if (!tweetPic) tweetPic = null
        if (!tweetText) return res.send({
            error: 'tweet body can not be empty!'
        })


    } catch (error) {

    }
}
module.exports.postRetweet = async (req, res, next) => {
    const {
        tweetid
    } = req.params;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) return res.status(400).send({
            error: 'Invalid tweetid'
        })
        const tweet = await Tweet.findOne({
            _id: tweetid
        });
        if (!tweet) return res.status(404).send({
            error: 'Tweet does not exist'
        })
        const retweetUpdate = await Retweet.updateOne({
            tweet: tweetid,
            'users.user': {
                $ne: currentUser._id
            }
        }, {
            $push: {
                users: {
                    user: currentUser._id
                }
            }
        }, {
            upsert: true
        });
        Notification.create({
            sender: currentUser._id,
            receiver: tweet.user,
            notificationType: 'retweet',
            createdAt: Date.now(),
            data: {
                tweetid
            }
        })
        res.status(201).send('Success')
    } catch (error) {
        next(error)
    }
}
module.exports.fetchTweetComments = async (req, res, next) => {
    try {
        const tweetid = req.params.tweetid;
        const currentUser = res.locals.user;

        if (!tweetid) return res.status(400).send({
            error: 'Invalid tweetid'
        })

        const tweet = await Tweet.findOne({
            _id: tweetid
        });
        if (!tweet) return res.status(404).send({
            error: 'Tweet does not exist'
        })

        const pipeline = [{
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
                        }, {
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
                    ],
                    as: 'replies'
                }
            },
            {
                $project: {
                    replies: 1
                }
            }
        ]
    } catch (error) {

    }
}

module.exports.deleteRetweet = async (req, res, next) => {
    const {
        tweetid
    } = req.params;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) return res.status(400).send({
            error: 'Invalid tweetid'
        })
        const tweet = await Tweet.findOne({
            _id: tweetid
        });
        if (!tweet) return res.status(404).send({
            error: 'Tweet does not exist'
        })
        const retweetUpdate = await Retweet.updateOne({
            tweet: tweetid,
            'users.user': {
                $in: currentUser._id
            }
        }, {
            $pull: {
                users: {
                    user: currentUser._id
                }
            }
        }, );
        res.status(200).send('Success')
    } catch (error) {
        next(error)
    }
}

module.exports.fetchTweetReplies = async (req, res, next) => {
    let {
        offset
    } = req.body;
    const tweetid = req.params.tweetid;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) return res.status(400).send({
            error: 'Invalid tweetid'
        })

        const tweet = await Tweet.findOne({
            _id: tweetid
        });
        if (!tweet) return res.status(404).send({
            error: 'Invalid tweetid'
        })
        const replies = await retriveComments(tweetid, currentUser, offset)
        res.send(replies)
    } catch (error) {
        next(error)
    }
}

module.exports.bookmarkTweet = async (req, res, next) => {
    const {
        tweetid
    } = req.params;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) return res.status(400).send({
            error: 'Invalid tweetid'
        })

        const tweet = await Tweet.findOne({
            _id: tweetid
        });
        if (!tweet) return res.status(404).send({
            error: 'Tweet does not exist'
        })

        const isAlreadyBookmarked = await Bookmark.findOne({
            user: currentUser._id,
            tweet: tweet._id
        });
        if (isAlreadyBookmarked) return res.status(400).send({
            error: 'Tweet already bookmarked'
        })
        await Bookmark.create({
            user: currentUser._id,
            tweet: tweet._id
        })
        res.status(200).send('success')
    } catch (error) {
        next(error)
    }
}

module.exports.removeBookmarkedTweet = async (req, res, next) => {
    const {
        tweetid
    } = req.params;
    const currentUser = res.locals.user;
    try {
        if (!tweetid) return res.status(400).send({
            error: 'Invalid tweetid'
        })

        const tweet = await Tweet.findOne({
            _id: tweetid
        });
        if (!tweet) return res.status(404).send({
            error: 'Tweet does not exist'
        })

        const isBookmarked = await Bookmark.findOne({
            user: currentUser._id,
            tweet: tweet._id
        });
        if (!isBookmarked) return res.status(400).send({
            error: 'Bookmark tweet fisrt'
        })
        await Bookmark.deleteOne({
            user: currentUser._id,
            tweet: tweet._id
        })
        res.status(200).send('success')
    } catch (error) {
        next(error)
    }
}

module.exports.fetchBookmarks = async (req, res, next) => {
    let {
        offset
    } = req.body;
    const currentUser = res.locals.user;
    try {
        if (isNaN(offset)) {
            offset = 0
        }

        const pipeline = [{
                '$match': {
                    'user': currentUser._id
                }
            },
            {
                $skip: offset
            },
            {
                $limit: 10
            },
            {
                '$lookup': {
                    'from': 'tweets',
                    'localField': 'tweet',
                    'foreignField': '_id',
                    'as': 'tweet'
                }
            }, {
                '$unwind': {
                    'path': '$tweet',
                    'preserveNullAndEmptyArrays': true
                }
            }, {
                '$replaceRoot': {
                    'newRoot': '$tweet'
                }
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
                    from: 'bookmarks',
                    localField: '_id',
                    foreignField: 'tweet',
                    as: 'bookmarks'
                }
            }, {
                $addFields: {
                    isBookmarked: {
                        $in: [
                            Mongoose.Types.ObjectId(currentUser._id), '$bookmarks.user'
                        ]
                    }
                }
            },
            {
                $project: {
                    bookmarks: 0
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
        const bookmarks = await Bookmark.aggregate(pipeline)
        res.status(200).send(bookmarks)
    } catch (error) {
        next(error)
    }
}

module.exports.fetchRandomTweets = async (req, res, next) => {
    const currentUser = res.locals.user;

    try {
        const pipeline = [{
                $sample: {
                    size: 10
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
                    from: 'bookmarks',
                    localField: '_id',
                    foreignField: 'tweet',
                    as: 'bookmarks'
                }
            }, {
                $addFields: {
                    isBookmarked: {
                        $in: [
                            Mongoose.Types.ObjectId(currentUser._id), '$bookmarks.user'
                        ]
                    }
                }
            },
            {
                $project: {
                    bookmarks: 0
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


        const data = await Tweet.aggregate(pipeline)
        res.send(data)
    } catch (error) {
        next(error)
    }
}