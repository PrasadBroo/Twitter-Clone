
import { searchTheTweets } from '../../services/tweetService';
import { FETCHING_TWEETS_STARTED,FETCHING_TWEETS_FAILED,FETCHING_TWEETS_SUCCESS } from './searchSlice';

// export const searchTweets = async(query,filterType='top')=>(dispatch)=>{
//     console.log('yup')
//     try {
//         if(!query || !filterType){
//             throw new Error('No query provided')
//         }
//         dispatch(FETCHING_TWEETS_STARTED())
//         const tweets = searchTheTweets(query,filterType);
//         console.log(tweets)
//         dispatch(FETCHING_TWEETS_SUCCESS(tweets))
//     } catch (error) {
//         cogoToast.error(error.message);
//         dispatch(FETCHING_TWEETS_FAILED(error.message))
//     }
// }