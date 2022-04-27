require('dotenv').config();
const axios = require('axios');

module.exports.isAdultContent = async (image_url = null) => {
    try {
        if (!image_url) return false;
        const {
            data
        } = await axios({
            url: `https://api.moderatecontent.com/moderate/?key=${process.env.MODERATECONTENT_API_KEY}&url=${image_url}`,
            method: 'get',
        })
        return data.rating_index >2
    } catch (error) {
        return false;
    }
}