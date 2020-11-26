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


const { SubMenu, Item } = Menu;


const NavHeader = () => {
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
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>

          {user && <Item key="logout" icon={<LogoutOutlined />} className="float-right" onClick={logout}>Logout</Item>}

          {!user && <Item key="signup" icon={<UserAddOutlined />} className="float-right">
                <Link to="/signup">Sign Up</Link>
            </Item>}


            <Item key="requestPlaza" icon={<HomeOutlined />}>
                <Link to="/request">request plaza</Link>
            </Item>

            <Item key="post" icon={<HomeOutlined />}>
                <Link to="/post">Post a new request</Link>
            </Item>


          {!user && <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>}

          {user && <Item key="userProfile" icon={<UserOutlined />} className="float-right">
            <Link to="/profile">Profile</Link>
          </Item>}


            <SubMenu key="SubMenu" icon={<SettingOutlined />} title={(user&&user.displayName)==null?"User":user.displayName}>
                <Menu.ItemGroup title="Profile">
                    <Item key="item1">option 1</Item>
                </Menu.ItemGroup>
            </SubMenu>



        </Menu>
    );
}


export default NavHeader;