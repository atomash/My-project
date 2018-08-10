import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'antd';
import './components/index.css';

class About extends Component {
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
        <Button type="primary">test</Button>
      </div>
    );
  }
}


export default About