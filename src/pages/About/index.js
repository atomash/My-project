import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button, notification } from 'antd';
import './styles/about.scss';

class About extends Component {
  openNotificationWithIcon = type => {
    notification[type]({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>
            About page
          </title>
          <meta property="og:title" content="About page"/>
        </Helmet>
        <h1 className="test" >About page</h1>
        <Button onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
      </div>
    );
  }
}


export default About