import axios from "axios";



export const updateUserProfile = async (bcPic, profilePic, fullName, bio, website, location) => {
    try {
        const response = await axios.put('/api/user/update/profile', {
            bcPic,
            profilePic,
            fullName,
            bio,
            website,
            location
        }, {

            headers: {
                authorization: localStorage.getItem('token'),
            },

        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const fetchUserProfile = async (username) => {
    try {
        const response = await axios.post('/api/user/get/profile', {
            username
        }, {

            headers: {
                authorization: localStorage.getItem('token'),
            },

        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error)
    }
}
export const followUser = async (userId) => {
    try {
      const response = await axios.post(`/api/user/${userId}/follow`, null, {
        headers: {
            authorization: localStorage.getItem('token'),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  export const getUserFollowers = async (userId) => {
    try {
      const response = await axios.post(`/api/user/${userId}/followers`, null, {
        headers: {
            authorization: localStorage.getItem('token'),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  export const getUserFollowings = async (userId) => {
    try {
      const response = await axios.post(`/api/user/${userId}/followings`, null, {
        headers: {
            authorization: localStorage.getItem('token'),
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };