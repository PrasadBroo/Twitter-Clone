import axios from "./axios";

export const updateUserProfile = async (
  bcPic,
  profilePic,
  fullName,
  bio,
  website,
  location
) => {
  try {
    const response = await axios.put(
      "/api/user/update/profile",
      {
        bcPic,
        profilePic,
        fullName,
        bio,
        website,
        location,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const fetchUserProfile = async (username) => {
  try {
    const response = await axios.post(
      "/api/user/get/profile",
      {
        username,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const followUser = async (userId) => {
  try {
    const response = await axios.post(`/api/user/${userId}/follow`, null, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
export const unfollowUser = async (userId) => {
  try {
    const response = await axios.post(`/api/user/${userId}/unfollow`, null, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserFollowers = async (userId, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userId}/followers`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserFollowings = async (userId, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userId}/followings`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchTheUserTweets = async (userid, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userid}/tweets`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchTheUserLikedTweets = async (userid, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userid}/tweets/liked`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchTheUserMediaTweets = async (userid, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/${userid}/tweets/media`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchUserFeedTweets = async (userid, offset = 0, signal) => {
  try {
    const response = await axios.post(
      `/api/user/${userid}/tweets/feed`,
      { offset },
      {
        signal: signal,
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchSuggstedUsers = async () => {
  try {
    const response = await axios.post(`/api/user/users_suggestions`, null, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const searchUsers = async (text, offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/search/users`,
      { term: text, offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getNotifications = async (offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/notifications`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getMentionsNotifications = async (offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/notifications/mentions`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchBookmarks = async (offset = 0) => {
  try {
    const response = await axios.post(
      `/api/user/bookmarks`,
      { offset },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const fetchNews = async () => {
  try {
    const response = await axios.get(
      "https://newsdata.io/api/1/news?apikey=pub_8595b1f504c4cc286b5e935c16322e731698&country=us,gb"
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
