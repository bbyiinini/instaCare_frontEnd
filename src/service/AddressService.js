import Axios from "axios";


class AddressService {

    getAddressByUid(uid){
        return Axios.get("http://localhost:8080/address/" + uid)
    }

    getAddressByAddressId(uid, addId) {
        return Axios.get("http://localhost:8080/address/"+uid+"/"+addId)
    }
}

export default new AddressService();

