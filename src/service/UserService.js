import Axios from "axios";

const USER_API_BASE_URL = "/users/api/save";

class UserService {
    // saveUser(user) {
    //     return Axios.post(USER_API_BASE_URL, user);
    // }

    registed(uid, data){
        return Axios.post("/api/users/"+uid,data).then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    update(uid, data){
        return Axios.put("/api/users/"+uid,data).then(response => {
            console.log(response.data)
        })
            .catch(error => {
                console.log(error.response)
            });
    }
//t6zFmkEG2GTO1EWafXBZxHBm0Dp2
    retrieve(uid){
        return Axios.get("/api/users/" + uid)
    }

}

export default new UserService();

