import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { Layout } from 'antd';
import { MenuComponent } from './menu'
import { route } from '../../routes'

const { Header, Content } = Layout;

class App extends Component {
    componentDidMount() {
      setTimeout(() => {
        window.isServer = false
      }, 0)
    } 
  render() {
    return (
      <Layout>
        <Header
        style={{ height: '55px' }}
        > 
         <MenuComponent />
        </Header>
        <Content style={{ background: '#fff', padding: '0 50px' }}>
        <div style={{padding: 24}}>
          {renderRoutes(route[0].routes)}
          </div>
        </Content>
      </Layout>
    );
  }
}

export default App;
