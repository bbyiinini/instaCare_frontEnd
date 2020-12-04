import React, {useState} from "react";
import { Menu } from 'antd';
import {Input, Modal, Backdrop, Fade, TextField} from '@material-ui/core'
import { createMuiTheme,makeStyles, styled, withStyles} from '@material-ui/core/styles';
import {Link, useHistory} from 'react-router-dom';
import db from "../../base";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import icLogo from '../../assets/logoWithText.svg';
import warning from '../../assets/forgot.png';
import {Button, Table, Pagination, Space, Tag} from "antd";
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';


// const profile = useSelector(state=>state.userProfile)
// 0 - senior, 1 - volunteer
const { SubMenu, Item } = Menu;


const NavBar = () => {

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

    const {user} = useSelector((state)=>({...state}))
    const profile = useSelector(state=>state.userProfile)
    let history = useHistory();
    const [open,setOpen] = useState(false)
    const [modalTitle,setTitle] = useState("")
    const [modalContent,setcontent] = useState("not changed")
    const classes = useStyle()


    const convertPath = (s) =>{
        switch(s){
            case "/" :
                return "home";
            case "/request":
                return "requestPlazza";
            case "/requestmangement":
                return "requestMangement";
            case "/post":
                return "post";
        }
        return "home";
    }

    const [currState, setCurrState] = useState(convertPath(history.location.pathname));
    let dispatch = useDispatch();
    console.log(history.location.pathname);
    // let {user} = useSelector((state)=>({...state}))
    // console.log(user)

    

    const handleClick = (event) => {
        setCurrState(convertPath(history.location.pathname));
    }
    const logout = () => {
        db.auth().signOut().then(r =>{
            toast.success("user logged out!")
        });
        dispatch({
            type: 'LOGOUT',
            payload: null
        });

        history.push("/");
    }

    if(!profile){
        return null
    }

    let {addressList, avatar,email,fullName,phone,userType,description} = profile

    const handleDescription = () => {
        setTitle("COVID-19 Self Health Check")
        setcontent(description)
        handleOpen()
    
    }
    const handleModalChange = (e) => {
        setcontent(e.target.value)
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const submitChange = () => {
        dispatch({
            type:modalTitle,
            payload:modalContent
        })
        
        handleClose()
    }

    return (
        <div>
        <Menu onClick={handleClick} selectedKeys={[currState]} mode="horizontal">
        <a href="/"><img id="icLogo"  style={{width:'20%'}} src={icLogo}/></a>


        <Button label="log out" className="float-right" style={{backgroundColor:"#12897b", color:"white", margin:'1%', textTransform:'none'}} onClick={logout}>Logout</Button>


        {profile.userType === 1 && <Button label="request plaza" className="float-right" href="/request" style={{backgroundColor:"#12897b", color:"white", margin:'1%',  textTransform:'none'}}>Request Plaza</Button>}
        

        <IconButton href="/profile" className="float-right">
            <Avatar aria-label="recipe" style={{margin:'1%', backgroundColor:'pink'}}>
                
            </Avatar>
        </IconButton>

        


          {/* {user && <Item key="userProfile" icon={<UserOutlined />} className="float-right">
            <Link to="/profile">Profile</Link>
          </Item>} */}


            {/* <SubMenu key="SubMenu" icon={<SettingOutlined />} title={(user&&user.displayName)==null?"User":user.displayName}>
                <Menu.ItemGroup title="Profile">
                    <Item key="item1">option 1</Item>
                </Menu.ItemGroup>
            </SubMenu> */}


        </Menu>

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
              <h2 id="transition-modal-title">{modalTitle}</h2>
              <h6>Are you currently experiencing any of the following symptoms that started within the last 14 days?</h6>
              <ul>
                  <li>Fever or chills</li>
                  <li>Cough</li>
                  <li>Shortness of breath or difficulty breathing</li>
                  <li>Fatigue</li>
                  <li>Muscle or body aches</li>
                  <li>Headache</li>
                  <li>Loss of taste or smell</li>
                  <li>Sore throat</li>
                  <li>Congestion or runny nose</li>
                  <li>Nausea or vomiting</li>
                  <li>Diarrhea</li>
              </ul>
              <h6>Over the past 14 days, have you been informed by a public health agency or a healthcare system that you have been exposed to COVID-19?</h6>
              <br></br>
              <h6>Over the past 14 days, has a person in your household been diagnosed with COVID-19 infection?</h6>
              <br></br>
              <h4>If your answer is YES for any of the questions above, we advice you to stay home and avoid physical contacts.</h4>
              {/* <TextField
                  className={classes.textfield}
                  label={`Enter new ${modalTitle}`}
                  onChange={handleModalChange}
                  defaultValue={modalContent}
                  multiline
                  rows={modalTitle === "Description" ? 6 : 1}
              /> */}
              <div>
                {/* <Button onClick={submitChange} style={{float:"right", color:"white",backgroundColor:"#00897B"}}>Save</Button> */}
                <Button onClick={handleClose} style={{float:"right", color:"white",backgroundColor:"#00897B"}}>I acknowledge</Button>
              </div>
            </div>
          </Fade>
        </Modal>
        </div>
    );
}


export default NavBar;