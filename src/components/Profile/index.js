import React, { useState,useEffect }  from "react";
import {Button, Grid, Input, Modal, Backdrop, Fade, TextField} from '@material-ui/core'
import { createMuiTheme,makeStyles, styled, withStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector,useStore} from "react-redux";
import {toast} from "react-toastify";
import { useHistory, Link} from "react-router-dom";
import UserService from "../../service/UserService";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

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
    width:"100%",
  }
}));

export default function (){
  const classes = useStyle()
  const dispatch = useDispatch();
  const profile = useSelector(state=>state.userProfile)

  const [open,setOpen] = useState(false)
  const [modalTitle,setTitle] = useState("")
  const [modalContent,setcontent] = useState("not changed")
  const [addressIndex,setindex] = useState(0)
  const [loading,setloading] = useState(false)
  const [imgurl,setimgurl] = useState("")

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
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleAvatarChange = info => {
    if (info.file.status === 'uploading') {
      setloading(true)
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
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

  let {addressList, avatar,email,fullName,phone,userType,description} = profile
  console.log(profile)
  return(
      <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <div className={classes.info}>
          <h3>{fullName}</h3>
          <h5>{!userType? "Senior" : "Volunteer"}</h5>
          <h5>{email}</h5>
          <h5>Rating:</h5>
        </div>
        <div style={{textAlign:'left',width:"80%",marginTop:"15vh",marginLeft:"auto",marginRight:"auto",padding:'25px'}}>
          <Link to={"/reset"}><h4>Reset Password</h4></Link>
          <h4>Contact us at <a>help@instacare.com</a></h4>
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
            <Grid item xs={3}>
              {/*<img src={profile.avatar}*/}
              {/*     style={{*/}
              {/*       width:"100px",*/}
              {/*       height:"100px",*/}
              {/*       borderRadius:"50%",*/}
              {/*       margin:"10px"*/}
              {/*     }}*/}
              {/*     alt={"avatar"}/>*/}
              <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={handleAvatarChange}
                  style={{
                    width:"100px",
                    height:"100px",
                    borderRadius:"50%",
                    margin:"10px"
                  }}
              >
                {avatar ? <img src={avatar} alt="avatar" style={{width:"100%"}} /> : uploadButton}
              </Upload>
              <span style={{color:"#064d40"}}><b>Change Avatar</b></span>
            </Grid>
            <Grid item xs={9}>

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
                <p>{phone}</p>
                <span style={{color:"#064d40"}} onClick={handlePhone}><b>Change</b></span>
              </Grid>
              </Grid>

            </Grid>
          </Grid>
        </div>
        <div className={classes.info}>
          <h3>Address Lists</h3>
          {addressList && addressList.map((item, index)=>{
            return (
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {item}
              </Grid>
              <Grid item xs={2}>
                <span style={{color:"#064d40"}} onClick={handleAddress(index)}><b>Change</b></span>
              </Grid>
              <Grid item xs={2}>
                <span style={{color:"#064d40"}} onClick={handleAddressDelete(index)}><b>Delete</b></span>
              </Grid>
            </Grid>
            )
          })}
          <span style={{color:"#064d40"}} onClick={handleAddAddress}><b>Add address</b></span>
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
              <h2 id="transition-modal-title">Edit {modalTitle}</h2>
              <TextField
                  className={classes.textfield}
                  label={`Enter new ${modalTitle}`}
                  onChange={handleModalChange}
                  defaultValue={modalContent}
                  multiline
                  rows={modalTitle === "Description" ? 6 : 1}
              />
              <div>
                <Button onClick={submitChange} style={{float:"right", color:"white",backgroundColor:"#00897B"}}>Save</Button>
                <Button onClick={handleClose} style={{float:"right"}}>Cancel</Button>
              </div>
            </div>
          </Fade>
        </Modal>
  </div>)
}