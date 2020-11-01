import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/users/save";

class UserService {
    saveUser(user) {
        return Axios.post(USER_API_BASE_URL, user);
    }
}

export default new UserService();

