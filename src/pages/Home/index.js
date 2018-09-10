import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { fetchUser } from "../../store/user/actions";
import { fetchProduct } from "../../store/product/actions";
import MyLoader from '../../lib/loader';

import './styles/home.scss';

class Home extends Component {
  componentDidMount() {
      if(!this.props.user.name){
          this.props.fetchUser() 
      }
      if(!window.isServer) {
        this.props.fetchProduct()
      }
  }
  render() {
    return (
      <div>
         <Helmet>
          <title>
            Home page
          </title>
          <meta property="og:title" content="Home page"/>
        </Helmet>
        <h1 className="h1Home">Home page</h1>
        <MyLoader load={this.props.userLoading}>
          <h1>{this.props.user.name}</h1>
        </MyLoader>
        <h3>{this.props.product.title}</h3>

        <a className='ab' href="#">test</a>
      </div>
    );
  }
}


const mapStateToProps = state => {
    return {
        product: state.pr.product,
        user: state.ur.user,
        userLoading: state.ur.loading 
    }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
      fetchUser,
      fetchProduct
  }, dispatch)

};


export default connect(mapStateToProps, mapDispatchToProps)(Home)