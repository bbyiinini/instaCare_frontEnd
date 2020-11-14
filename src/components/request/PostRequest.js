import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Button} from "antd";
import Axios from "axios";
import {useSelector} from "react-redux";
import {modalStyle} from "../../style/FileReqeustInfo";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "../../App.css";
import RequestService from "../../service/RequestService";
import {toast} from "react-toastify";

const PostRequest = () => {

    const {user} = useSelector((state)=>({...state}))
    const [userAddress, setUserAddress] = useState([])
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    const fetchAddress = async () => {
        setModalIsOpen(true)
        // console.log(user)
        if (user != null) {
            const result = await Axios.get(
                "http://localhost:8080/users/" + user.uid,
            );
            // console.log(result.data.data.addressList[0])
            setUserAddress(result.data.data.addressList)
        }

    }

    const [text, setText] = useState("");
    const [checked, setChecked] = useState(false)
    const [title, setTitle] = useState("")
    const [address, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")



    const handleCheckBox = () => {
        setChecked(!checked)
    }

    const handleSubmit = async (e) => {
        // e.preventDefault();
        if (user == null){
            return;
        }
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        let requestBean ={
            requestContent:text,
            title: title,
            address: address,
            phoneNumber: phoneNumber,
            neededPhysicalContact: checked,
            createTime: date + " " + time
        }

        console.log(requestBean)
        if (text!=="" && title!=="" && address!=="" && phoneNumber!==""){
            // console.log(text, title, address, phoneNumber)
            await RequestService.request(user.uid, requestBean).then(res=>{
                toast.success("save request to backend success")
            }).catch(res=>{
                toast.error("save failed")
            })

        }else {
            toast.error("please fill all required information")
        }



    }



    return (
        <div>
            <Button type="primary" shape="round" onClick={fetchAddress}>Post</Button>


            <MuiThemeProvider>

                <Modal style={modalStyle} isOpen={ModalIsOpen} appElement={document.getElementById('root')}>
                    <h1 className="text-center">Post Request</h1>
                    <form >
                        <div>
                            <label>Title</label>
                            <TextField required className="ml-3" id="standard-basic" label="Standard" hintText="Enter a title"
                              onChange={e=>setTitle(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="validationTextarea"/>
                            <textarea className="form-control"
                                      placeholder="Required request detail" required onChange={e=>setText(e.target.value)}>
                    </textarea>

                        </div>
                        <div className="form-inline">
                            <label >Phone Number</label>
                            <input style={{width:'50%'}} required type="phoneNumber" className="form-control ml-3"
                                   onChange={e=>setPhoneNumber(e.target.value)}/>
                        </div>
                        <div className="form-group mt-3">
                            <select className="form-control" onChange={e=>setAddress(e.target.value)}>
                                <option value="none" selected disabled hidden>
                                    Select your address
                                </option>
                                {userAddress.length !== 0? userAddress.map((address) =>
                                    <option key={address}>{address}</option>
                                ):  <option key="default">Address not found in database</option>}

                            </select>
                        </div>
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" checked={checked} onChange={handleCheckBox}/>
                            <label className="form-check-label" >Physical contact needed</label>
                        </div>
                        <button className="btn btn-primary float-right m-2" onClick={handleSubmit}>Post</button>
                        <button className="btn btn-primary float-right m-2" onClick={()=>setModalIsOpen(false)}>Cancel</button>
                    </form>
                </Modal>
            </MuiThemeProvider>

        </div>
    );
}



export default PostRequest;