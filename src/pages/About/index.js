import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Button } from 'antd';
import CollectionCreateForm from './components/ModalForm';
import './styles/about.scss';

class About extends Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
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
        <Button type="primary" onClick={this.showModal}>New Collection</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}


export default About