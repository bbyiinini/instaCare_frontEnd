import Axios from "axios";


class AddressService {

    getAddressByUid(uid){
        return Axios.get("/address/" + uid)
    }

    getAddressByAddressId(uid, addId) {
        return Axios.get("/address/"+uid+"/"+addId)
    }

    deleteAddress(uid, addId) {
        return Axios.delete("/address/"+uid+"/"+addId)
    }
}

export default new AddressService();

