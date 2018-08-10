import React from 'react';
import {renderToString} from 'react-dom/server';
import configureStore from 'store/configureStore';
import Root from 'containers/Root';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import renderHTMLTemplate from './template';
import renderServerError from './template/error.template'
import Helmet from 'react-helmet';
import { PreloadDataInit, PreloadGlobalInit } from './preloadData';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

async function ServerRender(req, res){
      const store = configureStore(undefined, {logger: false});
      try {
        await PreloadGlobalInit(store);
      } catch (err) {
        console.error(`==> 😭 ${err}`);
      }
      try {
        await PreloadDataInit(req, store);
      } catch (err) {
        console.error(`==> 😭 ${err}`);
      }
      const context = {};
      const modules = [];

      const rootElement = (
        <Loadable.Capture 
        report={moduleName => modules.push(moduleName)}>
            <Root
                store={store}
                type="server"
                url={req.url}
                context={context}
            />
        </Loadable.Capture>
         
      );

      const stats = require('../../build/react-loadable.json');
      try {
      const appString = renderToString(rootElement);
      if (context.url){
        res.redirect(context.status, context.url)
      }
      if(context.status === 404){
        res.status(404)
      }
      const bundles = getBundles(stats, modules);
      const initialState = store.getState();
      const helmet = Helmet.renderStatic();
        res.send(renderHTMLTemplate({
            appString,
            initialState,
            helmet,
            bundles,
            isServer: true
        }));
      } catch(err) {
        res.status(500).send(renderServerError({err}));
      }
}

export default ServerRender;
