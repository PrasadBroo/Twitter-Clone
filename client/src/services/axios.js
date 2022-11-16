import axios from "axios";

export const setupInterceptors =(navigate)=>{
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    
    const redirectToLoginCodes = [400,401,403]
    if (redirectToLoginCodes.includes(error.response.status)){
      navigate('/')
    }
    return Promise.reject(error);
  })
}

export default axios;