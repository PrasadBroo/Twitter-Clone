import axios from "axios";

export const postTheTweet = async (caption, pic,tweetid) => {
    try {
        const response = await axios.post(`/api/tweet/post`, {
            caption,
            pic,
            tweetid:tweetid
        }, {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const likeTheTweet = async (tweetid) => {
    try {
        const response = await axios.post(`/api/tweet/${tweetid}/like`, null, {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}
export const unlikeTheTweet = async (tweetid) => {
    try {
        const response = await axios.post(`/api/tweet/${tweetid}/unlike`, null, {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const fetchTheTweet = async(tweetid)=>{
    try {
        const response = await axios.post(`/api/tweet/${tweetid}`, null, {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  postTheTweetReply = async(tweetText, tweetPic,tweetid)=>{
    try {
        const response = await axios.post(`/api/tweet/post/${tweetid}/reply`, {
            tweetText,
            tweetPic,
        }, {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  postTheRetweet = async(tweetid)=>{
    try {
        const response = await axios.post(`/api/tweet/post/${tweetid}/retweet`, null, {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  deleteTheRetweet = async(tweetid)=>{
    try {
        const response = await axios.delete(`/api/tweet/post/${tweetid}/retweet/delete`,  {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}

export const  searchTweets = async(query,filter)=>{
    try {
        const response = await axios.post(`/api/search/tweets/`,{
            query,
            filter
        } , {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
}