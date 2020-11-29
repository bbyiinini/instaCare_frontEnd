import Axios from "axios";
import {toast} from "react-toastify";

class RequestService {

    request(rid, requestBean){
        return Axios.post("http://localhost:8080/request/"+rid, requestBean).then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error.message)
        })
    };

    addToPast(id, requestBean){
        requestBean.status = 3
        return Axios.put("http://localhost:8080/request/"+id, requestBean).then(res=>{
            toast.success("Success")
            console.log(res);
        }).catch(error => {
            toast.error("Noooooo");
            console.log(error.message);
        })
    }

    takeRequest(user, requestBean){
        requestBean.status = 2
        requestBean.volunteerId = user.id
        requestBean.volunteer = user.fullName
        return Axios.put("http://localhost:8080/request/"+requestBean.id, requestBean).then(res=>{
            toast.success("Success")
            console.log(res);
        }).catch(error => {
            toast.error("Noooooo");
            console.log(error.message);
        })
    }

    VolunteerCancelRequest(requestBean){
        requestBean.status = 1
        requestBean.volunteerId = null
        requestBean.volunteer = null
        return Axios.put("http://localhost:8080/request/"+requestBean.id, requestBean).then(res=>{
            toast.success("Success")
            console.log(res);
        }).catch(error => {
            toast.error("Noooooo");
            console.log(error.message);
        })
    }

    deleRequest(rid){
        return Axios.post("http://localhost:8080/request/"+rid, rid).then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error.message);
        })
    }

    // getRequest(uid){
    //     return Axios.get("http://localhost:8080/request/"+uid).then(res=>{
    //         console.log(res)
    //     }).catch(error=>{
    //         console.log(error.message)
    //     })
    // }
    insertAddress(uid, addressBean) {
        return Axios.post("http://localhost:8080/address/"+uid, addressBean).then(res=>{
            console.log(res);
        }).catch(error => {
            console.log(error.message);
        })
    }
}

export default new RequestService();

