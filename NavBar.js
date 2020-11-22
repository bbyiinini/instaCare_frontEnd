import React, {useState} from "react";
import { Menu } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    UserAddOutlined, LogoutOutlined, SettingOutlined
} from '@ant-design/icons';
import {Link, useHistory} from 'react-router-dom';
import db from "../../base";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import icLogo from './logoWithText.svg';



import { blue, red } from "@material-ui/core/colors";



import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Grid, Row, Col } from "react-flexbox-grid";
import TextField from '@material-ui/core/TextField';



const { SubMenu, Item } = Menu;


const NavBar = () => {
    let history = useHistory();

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
    let {user} = useSelector((state)=>({...state}))
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

    return (
        <Menu onClick={handleClick} selectedKeys={[currState]} mode="horizontal">
            <a href="/"><img id="icLogo"  style={{width:'20%'}} src={icLogo}/></a>
            {/* <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item> */}


            <Button label="log out" className="float-right" style={{backgroundColor:"#12897b", color:"white", margin:'1%', textTransform:'none'}} onClick={logout}>Logout</Button>

            <Button label="request plaza" className="float-right" href="/request" style={{backgroundColor:"#12897b", color:"white", margin:'1%',  textTransform:'none'}}>Request Plaza</Button>
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
    );
}


export default NavBar;