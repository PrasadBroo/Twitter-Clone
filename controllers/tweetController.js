const Tweet = require('../models/Tweet');
const Hashtags = require('../models/hashtags')
const linkify = require('linkifyjs');
require('linkify-plugin-hashtag');
module.exports.postTweet = async(req,res,next)=>{
    const currentUser = res.locals.user;
    try {
        let {caption,pic} = req.body;
        if(!pic)pic=null
        if(!caption)return res.send({error:'tweet body can not be empty!'})
        // add to tweet collection
        const tweet = await Tweet.create({user:currentUser._id,caption,pic});
        const tweetHashtags = new Set();
        const hashtags = linkify.find(caption);
        hashtags.forEach(e=>{if(e.type === 'hashtag'){tweetHashtags.add(e.value)}})
        
        
        // check mentions 
        // check hashtags
        const hashtagsUpdate = await Hashtags.updateOne({
            tweet: tweet._id,
        }, {
            $push: {
                hashtags: {$each:[...tweetHashtags]}
            }
        }, {
            upsert: true
        });
        // send notification for mentioned user
        res.send()
    } catch (error) {
        next(error)
        console.log(error)
    }
}
