import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/users/api/save";

class RatingService {

    addRating(rid, uid, ratingBean) {
        return Axios.post("http://localhost:8080/rating/"+rid+"/"+uid, ratingBean)
    }


}

export default new RatingService();

