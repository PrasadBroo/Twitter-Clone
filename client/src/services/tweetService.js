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


