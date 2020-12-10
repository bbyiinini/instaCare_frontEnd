import React, { useState,useEffect }  from "react";
import {Button, Grid, Input, Modal, Backdrop, Fade, TextField} from '@material-ui/core'
import { createMuiTheme,makeStyles, styled, withStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector,useStore} from "react-redux";
import {toast} from "react-toastify";
import { useHistory, Link} from "react-router-dom";
import UserService from "../../service/UserService";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import SelectUSState from "react-select-us-states";
import Axios from "axios";
import RequestService from "../../service/RequestService";
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import './upload.css'
const GOOGLE_API_KEY = 'AIzaSyCZBZEfqeZbQkO1c_q7AkeySMN4aAJMO0Y'

const useStyle = makeStyles(theme=>({
  root:{
    backgroundColor:"#e3e8e7",
    height:"100vh"
  },
  info:{
    backgroundColor:"white",
    borderRadius:"30px",
    width:"80%",
    margin:'auto',
    textAlign:'left',
    padding:'25px',
    marginTop:"5vh"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius:"30px",
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
    width:"50%",
  },
  textfield: {
    border:"1px solid",
    width:"100%",
  }
}));

export default function (){
  const classes = useStyle()
  const {user} = useSelector((state) => ({...state}))
  const {address} = useSelector((state) => ({...state}))
  console.log(address)
  const dispatch = useDispatch();
  const profile = useSelector(state=>state.userProfile)

  const [open,setOpen] = useState(false)
  const [modalTitle,setTitle] = useState("")
  const [modalContent,setcontent] = useState("not changed")
  const [addressIndex,setindex] = useState(-1)
  const [loading,setloading] = useState(false)

  const [addressModal, setAddressModal] = useState(false);
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [addList, setAddList] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitChange = () => {
    if(modalTitle === "Address"){
      dispatch({
        type:"Address",
        payload:{
          index:addressIndex,
          content:modalContent
        }
      })
    }else{
      dispatch({
        type:modalTitle,
        payload:modalContent
      })
    }
    handleClose()
    toast.info("Please click Update User Profile button to save your changes!")
  }

  const saveAll = () => {
    profile.address_list = profile.addressList
    UserService.update(profile.id,profile).then(res=>{
      console.log("saved user type to backend")
    }).catch(res=>{
      console.log("CORS not connected")
    });
    toast.success(`User Profile Updated Successfully!`)
  }

  const handleDescription = () => {
    setTitle("Description")
    setcontent(description)
    handleOpen()
  }

  const handlePhone = () => {
    setTitle("Phone")
    setcontent(phone)
    handleOpen()
  }

  const handleAvatar = () => {
    setTitle("Avatar")
    setcontent(avatar)
    handleOpen()
  }


  const handleAddress = (index)=>{
    return ()=>{
      setindex(index)
      setTitle("Address")
      setcontent(addressList[index])
      handleOpen()
    }
  }

  const handleAddressDelete = (index)=>{
    return ()=>{
      toast.info("Please click Update User Profile button to save your changes!")
      dispatch({
        type:"AddressDelete",
        payload:index
      })
    }
  }

  const handleAddAddress = ()=>{
    setindex()
    setTitle("New Address")
    setcontent("")
    handleOpen()
  }

  const handleModalChange = (e) => {
    setcontent(e.target.value)
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    console.log(file.size)
    const isLt2M = file.size / 1024 / 1024 < 0.1;
    if (!isLt2M) {
      message.error('Image must smaller than 100KB!');
    }
    return isJpgOrPng && isLt2M;
  }


  let newAdd = ""
  const handleAdd = async () => {
    let geolocation =""
    let postUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${street1.replace(/ /g, '+') + street2.replace(/ /g, '+') +
    city.replace(/ /g, '+') + state}&key=${GOOGLE_API_KEY}`

    Axios.post(postUrl)
        .then(async response => {
          let fulladdr = `${street1} ${street2}, ${city}, ${state},${zipCode}`
          if(addressIndex !== -1){
            dispatch({
              type:"Address",
              payload:{
                index:addressIndex,
                content:fulladdr
              }
            })
          }else{
            dispatch({
              type:"New Address",
              payload:fulladdr
            })
          }
          geolocation = response.data.results[0].geometry.location.lat + "," + response.data.results[0].geometry.location.lng

          const addressBean = {
            streetAddressL1: street1,
            streetAddressL2: street2,
            city: city,
            state: state,
            zipCode: zipCode,
            userId: user.uid,
            geolocation: geolocation
          }

          if (street1 !== "" && city !== "" && state !== "" && zipCode !== "") {
            // console.log(text, title, address, phoneNumber)
            let id = "";
            console.log(addressBean,user.uid)
            await RequestService.insertAddress(user.uid, addressBean).then(res => {
              toast.success("insert address to backend success")
              id = res.data.data;
            }).catch(res => {
              toast.error("insert failed")
            });
            newAdd = (street2 === "" ? street1 + ", " + city + ", " + state + " " + zipCode : street1 + ", " + street2 + ", " + city + ", " + state + " " + zipCode);
            setAddList([...addList, {add: newAdd, id: id}])
            setStreet1("")
            setStreet2("")
            setCity("")
            setState("")
            setZipCode("")
            setAddressModal(false);
          } else {
            toast.error("please fill all the information")
          }
        })
        .catch(error => {
          console.log(error.message)
        });
    setAddressModal(false)
  }

  const handleAvatarChange = info => {
    if (info.file.status === 'uploading') {
      setloading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        console.log(imageUrl.length)
        setloading(false)
        dispatch({
          type:"Avatar",
          payload:imageUrl
        })
          }
      );
    }
  };

  if(!profile){
    return(<div></div>)
  }

  const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
  );

  let {addressList, avatar,email,fullName,phone,userType,description,rating} = profile
  return(
      <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={4} style={{paddingTop:"100px"}}>
          <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleAvatarChange}
              style={{
                marginTop:"150px",
                borderRadius:"50%",
              }}
          >
            {avatar ? <img src={avatar} alt="avatar" style={{width:"200px",height:"200px"}} /> : uploadButton}
          </Upload>
        <div className={classes.info}>
          <h3>{fullName}</h3>
          <h5>{!userType? "Senior" : "Volunteer"}</h5>
          <h5>{email}</h5>
          <h5>Rating:{rating ? rating : "5.0"} </h5>
        </div>
        <div style={{textAlign:'left',width:"80%",marginTop:"1vh",marginLeft:"auto",marginRight:"auto",padding:'25px'}}>
          <Link to={"/reset"}><h4>Reset Password</h4></Link>
        </div>
        <Button onClick={saveAll} style={{
          borderStyle: "solid",
          borderRadius: "100px",
          borderWidth: "1px",
          width:"80%",
          margin:"auto",
          textAlign:"center",
          backgroundColor:"#12897b",
          color:"white"
        }}>update user profile</Button>
      </Grid>
      <Grid item xs={8}>
        <div className={classes.info}>
           <h3>Account Info</h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} style={{marginBottom:"50px"}}>
              <Grid item xs={4}>
                Description
              </Grid>
              <Grid item xs={8}>
                <p>{description}</p>
                <span style={{color:"#064d40"}} onClick={handleDescription}><b>Change</b></span>
              </Grid>
              </Grid>

              <Grid container spacing={2}>
              <Grid item xs={4}>
                Phone
              </Grid>
              <Grid item xs={8}>
                <p>+1 {phone}</p>
                <span style={{color:"#064d40"}} onClick={handlePhone}><b>Change</b></span>
              </Grid>
              </Grid>

            </Grid>
          </Grid>
        </div>
        <div className={classes.info}>
          <h3>Address List</h3>
          {(addressList)&& addressList.map((item, index)=>{
            return (
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {item}
              </Grid>
              <Grid item xs={2}>
                {/*<span style={{color:"#064d40"}} onClick={handleAddress(index)}><b>Change</b></span>*/}
              </Grid>
              <Grid item xs={2}>
                <span style={{color:"#064d40"}} onClick={handleAddressDelete(index)}><b>Delete</b></span>
              </Grid>
            </Grid>
            )
          })}
          <span style={{color:"#064d40"}} onClick={()=>{setAddressModal(true)}}><b>Add address</b></span>
        </div>
      </Grid>

    </Grid>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 style={{margin:"15px"}}>Edit {modalTitle}</h2>
              {modalTitle === "Phone" ? <div>
                <ReactPhoneInput
                  style={{width: '35%', margin:'auto'}}
                  country={'us'}
                  onlyCountries={['us']}
                  isValid={(value, country) => {
                    if (!value.match(/1/)) {
                      return 'Invalid area code: ' + value + ', ' + country.name;
                    } else {
                      return true;
                    }
                  }}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  onChange={e => setcontent(e)}
              /></div>:<TextField
                  className={classes.textfield}
                  onChange={handleModalChange}
                  defaultValue={modalContent}
                  multiline
                  rows={modalTitle === "Description" ? 6 : 1}
              />}
              <div>
                <Button onClick={submitChange} style={{borderRadius:"10px",marginTop:"10px",float:"right", color:"white",backgroundColor:"#00897B"}}>Save</Button>
                <Button onClick={handleClose} style={{marginRight:"10px",marginTop:"10px",float:"right"}}>Cancel</Button>
              </div>
            </div>
          </Fade>
        </Modal>

        <Modal
            aria-labelledby="transition-modal-title1"
            aria-describedby="transition-modal-description1"
            className={classes.modal}
            open={addressModal}
            onClose={()=>{setAddressModal(false)}}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
          <div className={classes.paper}>
          <div>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input type="text" className="form-control" id="inputAddress"
                     placeholder="Enter your street"
                     onChange={e => (setStreet1(e.target.value))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input type="text" className="form-control" id="inputAddress2"
                     placeholder="Apartment, unit, or floor"
                     onChange={e => (setStreet2(e.target.value))}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity"
                       onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <SelectUSState id="inputState" className="form-control"
                               onChange={e => setState(e)}/>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input type="text" className="form-control" id="inputZip"
                       onChange={e => setZipCode(e.target.value)}/>
              </div>
            </div>
            <Button type="primary"
                    style={{background: '#00897B', width: '80px',color:'white'}}
                    shape="round"
                    onClick={handleAdd}
                    className="float-right">add</Button>
            <label style={{color: '#00897B', cursor: 'pointer'}} className="float-right m-2"
                   onClick={() => setAddressModal(false)}>Cancel</label>
          </div>
          </div>
        </Modal>
  </div>)
}

const addressModalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(116, 130, 128, 0.6)'
  },
  content: {
    top: '15%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '30%',
    borderRadius: '30px',
    transform: 'translate(-40%, 5%)',
  },
}