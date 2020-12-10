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
            if (window.localStorage.getItem('rateStatus')==='rated'){
                window.localStorage.removeItem('rateStatus')
            }
            toast.success("user logged out!")
        });
        dispatch({
            type: 'LOGOUT',
            payload: null
        });

        window.location.assign('/')
    }

    if(!profile){
        return null
    }

    let {addressList, avatar,email,fullName,phone,userType,description} = profile

    const redirected = (path) => {
        window.location.assign(path)
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
        <div style={{top:"0px", position: 'absolute', right:'0px', left:'0px', height:'6vh'}}>
            <Menu mode="horizontal" selectedKeys={null} >
                <a href="/"><img id="icLogo"  style={{width:'20%'}} src={icLogo}/></a>

                <Menu.Item key="logout" className="float-right" disabled>
                    <Button label="log out" style={{backgroundColor:"#12897b", color:"white", margin:'1%', textTransform:'none', marginTop:'2vh'}} onClick={logout}>Logout</Button>
                </Menu.Item>

                <Menu.Item key="request" className="float-right" disabled>
                    {profile.userType === 1 && <Button label="request plaza" onClick={() => redirected('/request')} style={{backgroundColor:"#12897b", color:"white", margin:'1%',  textTransform:'none', marginTop:'2vh'}}>Request Plaza</Button>}
                </Menu.Item>

                <Menu.Item key="profile" className="float-right" disabled>
                    <IconButton onClick={() => redirected('/profile')} className="float-right">
                        <Avatar aria-label="recipe" className={classes.avHuge} src={profile.avatar}></Avatar>
                    </IconButton>
                </Menu.Item>
            </Menu>
        </div>
    );
}


export default NavBar;