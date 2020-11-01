import React, {useState} from "react";
import { Menu } from 'antd';
import {
    SettingOutlined,
    HomeOutlined,
    UserOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom';

const { SubMenu, Item } = Menu;


const NavHeader = () => {
    const [currState, setCurrState] = useState('home')

    const handleClick = (event) => {
        setCurrState(event.key)
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[currState]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Item>

            <Item key="signup" icon={<UserAddOutlined />} className="float-right">
                <Link to="/signup">Sign Up</Link>
            </Item>

            <Item key="login" icon={<UserOutlined />} className="float-right">
                <Link to="/login">Login</Link>
            </Item>


            {/*<SubMenu key="SubMenu" icon={<SettingOutlined />} title="User">*/}
            {/*    <Menu.ItemGroup title="Item 1">*/}
            {/*        <Item key="setting:1">Option 1</Item>*/}
            {/*        <Item key="setting:2">Option 2</Item>*/}
            {/*    </Menu.ItemGroup>*/}
            {/*</SubMenu>*/}
        </Menu>
    );
}


export default NavHeader;