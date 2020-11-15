import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {Button} from "antd";
import Axios from "axios";
import {useSelector} from "react-redux";

const PostRequest = () => {

    const {user} = useSelector((state)=>({...state}))
    const [userProfile, setUserProfile] = useState([])
    const [ModalIsOpen, setModalIsOpen] = useState(false);

    const fetchAddress = async () => {
        setModalIsOpen(true)
        // console.log(user)
        if (user != null) {
            const result = await Axios.get(
                "http://localhost:8080/users/" + user.uid,
            );
            // console.log(result.data.data.addressList[0])
            setUserProfile(result.data.data.addressList)
        }


    }

    return (
        <div>
            <Button type="primary" shape="round" onClick={fetchAddress}>Post</Button>
            <Modal isOpen={ModalIsOpen} appElement={document.getElementById('root')}>
                <h1>This is pop up window</h1>
            <form>
                <div>
                    <label>Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="validationTextarea">Textarea</label>
                    <textarea className="form-control" id="validationTextarea"
                              placeholder="Required example textarea" required>
                    </textarea>
                    {/*<div className="invalid-feedback">*/}
                    {/*    Please enter a message in the textarea.*/}
                    {/*</div>*/}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Phone Number</label>
                    <input type="text" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Address</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                        {userProfile.length !== 0? userProfile.map((userProfile) =>
                            <option key={userProfile}>{userProfile}</option>
                        ):  <option key="default">Address not found in database</option>}

                    </select>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Physical contact needed</label>
                </div>
                <button type="submit" className="btn btn-primary float-right m-2" onClick={()=>setModalIsOpen(false)}>Post</button>
                <button type="submit" className="btn btn-primary float-right m-2" onClick={()=>setModalIsOpen(false)}>Cancel</button>
            </form>
            </Modal>
        </div>
    );
}



export default PostRequest;