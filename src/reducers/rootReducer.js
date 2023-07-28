
import videoReducer from './videos';
import searchReducer from "./search"
import VideoData from "./videoData"
import recommended from "./recommended"
import error from './error'
import userData from "./userdata"
import userToken from "./usertoken"
import isUserLoggedIn from './isuserlogged';
const rootReducer = {
    videos: videoReducer,
  search:searchReducer,
  videoData:VideoData,
  recommended:recommended,
  error:error,
  userData:userData,
  userToken:userToken,
  isUserLoggedIn:isUserLoggedIn
};

export default rootReducer