import {combineReducers} from "redux";
import {userReducer} from "./UserReducer"
import {userProfileReducer} from "./UserProfileReducer";
import {postRequestReducer} from "./PostRequestReducer";
import {postRequestMangeReducer} from "./PostManagerReducder";
import {addressReducer} from "./AddressReducer";
import {ratingReducer} from "./RatingReducer";

const rootReducer = combineReducers({
    user: userReducer,
    userProfile:userProfileReducer,
    requestDetail: postRequestReducer,
    requestMange: postRequestMangeReducer,
    address: addressReducer,
    rating: ratingReducer,
});


export default rootReducer;

