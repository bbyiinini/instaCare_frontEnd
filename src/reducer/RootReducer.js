import {combineReducers} from "redux";
import {userReducer} from "./UserReducer"
import {userProfileReducer} from "./UserProfileReducer";
import {postRequestReducer} from "./PostRequestReducer";
import {postRequestMangeReducer} from "./PostManagerReducder";
import {addressReducer} from "./AddressReducer";

const rootReducer = combineReducers({
    user: userReducer,
    userProfile:userProfileReducer,
    requestDetail: postRequestReducer,
    requestMange: postRequestMangeReducer,
    address: addressReducer,
});


export default rootReducer;

