import Axios from "axios";


class AddressService {

    getAddressByUid(uid){
        return Axios.get("/api/address/" + uid)
    }

    getAddressByAddressId(uid, addId) {
        return Axios.get("/api/address/"+uid+"/"+addId)
    }
}

export default new AddressService();

