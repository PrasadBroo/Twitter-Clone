import axios from "axios";

export const postTheTweet = async (caption, pic) => {
    try {
        const response = await axios.post(`/api/tweet/post`, {
            caption,
            pic
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