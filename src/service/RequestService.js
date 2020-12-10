import Axios from "axios";
import {toast} from "react-toastify";

class RequestService {

    request(rid, requestBean){
        return Axios.post("/request/"+rid, requestBean).then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error.message)
        })
    };

    deleRequest(rid){
        return Axios.post("/request/"+rid, rid).then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error.message);
        })
    }

    deleteRequest(rid){
        return Axios.delete("/request/"+rid)
    }

    // getRequest(uid){
    //     return Axios.get("/request/"+uid).then(res=>{
    //         console.log(res)
    //     }).catch(error=>{
    //         console.log(error.message)
    //     })
    // }
    insertAddress(uid, addressBean) {
        return Axios.post("/address/"+uid, addressBean)
    }
}

export default new RequestService();

