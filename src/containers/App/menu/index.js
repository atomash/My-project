import React from 'react';
import { Link,} from 'react-router-dom'
import { Menu } from 'antd';
import logo from './logo.svg';
import './index.css';

export const MenuComponent = () => (
        <Menu
          theme="dark"
          mode="horizontal"
          selectable={false}
          style={{ lineHeight: '55px' }}
        >
          <Menu.Item key="1">
            <Link to="/"><img src={logo} className="App-logo" alt="logo" /> </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/red">Redirect</Link>
          </Menu.Item>
        </Menu>
  )