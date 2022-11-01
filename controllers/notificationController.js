const Notification = require('../models/Notification');
const ObjectId = require('mongoose').Types.ObjectId;
const Mongoose = require('mongoose');

module.exports.retrieveNotifications = async (req, res, next) => {
  const currentUser = res.locals.user;
  let {
    offset
  } = req.body;

  try {
    const notifications = await Notification.aggregate([{
        $match: {
          receiver: ObjectId(currentUser._id),
          notificationType:{$ne:'mention'}
        },
      },
      {
        $skip: offset
      },
      {
        $limit: 20
      },
      {
        $sort: {
          createdAt: -1
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'sender',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'receiver',
          foreignField: '_id',
          as: 'receiver',
        },
      },
      {
        $unwind: '$sender',
      },
      {
        $unwind: '$receiver',
      },
      {
        $project: {
          read: true,
          notificationType: true,
          isFollowing: true,
          createdAt: true,
          data: true,
          'sender.username': true,
          'sender.fullName': true,
          'sender.avatar': true,
          'sender._id': true,
          'receiver._id': true,
          'sender.isVerified': true
        },
      },
    ]);

    const mentions = notifications.filter(e => e.notificationType === 'mention');

    return res.send(notifications);
  } catch (err) {
    next(err);
  }
};
module.exports.retrieveMentonsNotifications = async (req, res, next) => {
  const currentUser = res.locals.user;
  let {
    offset
  } = req.body;

  try {
    const notifications = await Notification.aggregate([{
        $match: {
          receiver: ObjectId(currentUser._id),
          notificationType: 'mention'
        },
      },
      {
        $skip: offset
      },
      {
        $limit: 20
      },
      {
        $sort: {
          date: -1
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'sender',
          foreignField: '_id',
          as: 'sender',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'receiver',
          foreignField: '_id',
          as: 'receiver',
        },
      },
      {
        $unwind: '$sender',
      },
      {
        $unwind: '$receiver',
      },
      {
        $project: {
          read: true,
          notificationType: true,
          isFollowing: true,
          createdAt: true,
          data: true,
          'sender.username': true,
          'sender.fullName': true,
          'sender.avatar': true,
          'sender._id': true,
          'receiver._id': true,
          'sender.isVerified': true
        },
      },
      {
        $lookup: {
          from: 'tweets',
          localField: 'data.tweetid',
          foreignField: '_id',
          as: 'data.tweet'
        }
      },
      {
        $unwind:{
          path: "$data.tweet",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
            from: 'users',
            localField: 'data.tweet.user',
            foreignField: '_id',
            as: 'data.tweet.user',

        }
    },
    {
        $unwind: '$data.tweet.user'
    },
    {
        $lookup: {
            from: 'followers',
            localField: 'data.tweet.user._id',
            foreignField: 'user',
            as: 'data.tweet.userFollowers'
        }
    },
    {
        $addFields: {
            'data.tweet.userFollowers': {
                $cond: [{
                        $eq: ["$data.tweet.userFollowers", []]
                    },
                    [{
                        followers: []
                    }], '$data.tweet.userFollowers'
                ]
            }
        }
    },
    {
        $unwind: '$data.tweet.userFollowers'
    },
    {
        $addFields: {
            'data.tweet.userFollowers': '$data.tweet.userFollowers.followers'
        }
    },
    {
        $addFields: {
            'data.tweet.isFollowing': {
                $in: [currentUser._id, '$data.tweet.userFollowers.user']
            }
        }
    },
    {
        $lookup: {
            from: 'tweetlikes',
            localField: 'data.tweet._id',
            foreignField: 'tweet',
            as: 'data.tweet.likes'
        }
    },
    {
        $addFields: {
            'data.tweet.likes': {
                $cond: [{
                        $eq: ["$data.tweet.likes", []]
                    },
                    [{
                        likedBy: []
                    }], '$data.tweet.likes'
                ]
            }
        }
    },

    {
        $unwind: '$data.tweet.likes'
    },
    {
        $addFields: {
            'data.tweet.isLiked': {
                $in: [Mongoose.Types.ObjectId(currentUser._id), '$data.tweet.likes.likedBy.user']
            }
        }
    },
    {
        $addFields: {
            'data.tweet.likesCount': {
                $size: '$data.tweet.likes.likedBy'
            }
        }
    },
    {
        $lookup: {
            from: 'tweets',
            localField: 'data.tweet._id',
            foreignField: 'in_reply_to_status_id',
            as: 'data.tweet.tweetReplies'
        }
    },
    {
        $addFields: {
            'data.tweet.replyCount': {
                $size: '$data.tweet.tweetReplies'
            }
        }
    },

    {
        $lookup: {
            from: 'retweets',
            localField: 'data.tweet._id',
            foreignField: 'tweet',
            as: 'data.tweet.retweets'
        }
    },
    {
        $addFields: {
            'data.tweet.retweets': {
                $cond: [{
                        $eq: ["$data.tweet.retweets", []]
                    },
                    [{
                        users: []
                    }], '$data.tweet.retweets'
                ]
            }
        }
    },
    {
        $unwind: {
            path: '$data.tweet.retweets',
            preserveNullAndEmptyArrays: true,
        }
    },
    {
        $addFields: {
            'data.tweet.retweetCount': {
                $size: '$data.tweet.retweets.users'
            }
        }
    },
    {
        $addFields: {
            'data.tweet.isRetweeted': {
                $in: [Mongoose.Types.ObjectId(currentUser._id), '$data.tweet.retweets.users.user']
            }
        }
    },

    {
        $project: {
            'data.tweet.__v': 0,
            'data.tweet.user.password': 0,
            'data.tweet.user.bio': 0,
            'data.tweet.user.email': 0,
            'data.tweet.user.website': 0,
            'data.tweet.user.location': 0,
            'data.tweet.user.backgroundImage': 0,
            'data.tweet.user.__v': 0,
            'data.tweet.likes': 0,
            'data.tweet.tweetReplies': 0,
            'data.tweet.retweets': 0,
            'data.tweet.userFollowers': 0,
        }
    }




    ]);

    return res.send(notifications);
  } catch (err) {
    next(err);
  }
};
module.exports.readNotifications = async (req, res, next) => {
  const currentUser = res.locals.user;

  try {
    await Notification.updateMany({
      receiver: currentUser._id
    }, {
      read: true
    });
    return res.send();
  } catch (err) {
    next(err);
  }
};