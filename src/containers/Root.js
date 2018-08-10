import React, {Component} from 'react';
import {Provider} from 'react-redux';
import App from 'containers/App';
import {StaticRouter, BrowserRouter} from 'react-router-dom';

class Root extends Component {
    render(){
        const {type, url, store, context} = this.props;
        if (type === 'server'){
            return (
                <Provider store={store}>
                  <StaticRouter
                      location={url}
                      context={context}
                  >
                      <App />
                  </StaticRouter>
                </Provider>
            );
        }
        return (
            <Provider store={store}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
            </Provider>
        );
    }
}

export default Root;
