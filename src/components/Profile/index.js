import React, { useState }  from "react";
import {Button, Grid, Input, Modal, Backdrop, Fade, TextField} from '@material-ui/core'
import { createMuiTheme,makeStyles, styled, withStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector,useStore} from "react-redux";
import {toast} from "react-toastify";

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
    marginTop:"10vh"
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
    // TODO: update user with profile
    toast.success(`${modalTitle} Changed Successfully`)
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

  const handleAddress = (index)=>{
    return ()=>{
      setindex(index)
      setTitle("Address")
      setcontent(addressList[index])
      handleOpen()
    }
  }

  const handleModalChange = (e) => {
    setcontent(e.target.value)
  }

  if(!profile){
    return(<div></div>)
  }
  let {addressList, avatar,email,fullName,phone,userType,description} = profile
  return(
      <div className={classes.root}>
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <div className={classes.info}>
          <h3>{fullName}</h3>
          <h5>{userType? "Senior" : "Volunteer"}</h5>
          <h5>{email}</h5>
          <h5>Rating</h5>
        </div>
        <div style={{textAlign:'left',width:"80%",marginTop:"15vh",marginLeft:"auto",marginRight:"auto",padding:'25px'}}>
          <h4>Reset Password</h4>
          <h4>Contact us at <a>help@instacare.com</a></h4>
        </div>
      </Grid>
      <Grid item xs={8}>
        <div className={classes.info}>
           <h3>Account Info</h3>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img src={avatar} alt={"avatar"}/>
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
              <Grid item xs={9}>
                {item}
              </Grid>
              <Grid item xs={3}>
                <span style={{color:"#064d40"}} onClick={handleAddress(index)}><b>Change</b></span>
              </Grid>
            </Grid>
            )
          })}
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