import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

export default class MyLoader extends Component {
    render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin/>;
        if (this.props.load) {
            return <Spin indicator={antIcon} />;
        } else {
            return this.props.children;
        }
    }
}