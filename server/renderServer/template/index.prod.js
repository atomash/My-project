import serialize from 'serialize-javascript';
import assetManifest from '../../../build/asset-manifest.json';


const linkCss = bundles => {
  const paths = [
    ...bundles.filter(b => b.file.endsWith('.css')).map(b => b.file)
  ];
  return paths.reduce((string, path) => {
    string += `<link href="/${path}" rel="stylesheet">`;
    return string;
  }, '')
};

const jsScripts = bundles => {
  const paths = [
    // assetManifest['main.js'],
    // assetManifest['vendors.js'],
    // assetManifest['runtime~main.js'],
    ...bundles.filter(b => b.file.endsWith('.js')).map(b => b.file)
  ];

  return paths.reduce((string, path) => {
    string += `<script type="text/javascript" src=/${path}></script>`;
    return string;
  }, '');
};

export default props => `
  <!doctype html>
  <html ${props.helmet.htmlAttributes.toString()}>
  <head>
    <meta charset="utf-8">
    ${props.helmet.title.toString()}
    ${props.helmet.base.toString()}
    <meta name="viewport"
          content="width=device-width,initial-scale=1,shrink-to-fit=no">
    ${props.helmet.meta.toString()}
    <meta name="theme-color" content="#000000">
    ${props.helmet.link.toString()}
    <link rel="stylesheet" href="${assetManifest['main.css']}"/>
    <link rel="stylesheet" href="${assetManifest['vendors.css']}"/>
    ${linkCss(props.bundles)}
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    
    ${props.helmet.script.toString()}
  </head>
  <body ${props.helmet.bodyAttributes.toString()}>
  ${props.helmet.noscript.toString()}
  <script type="text/javascript">
    window.INITIAL_STATE = ${serialize(props.initialState)};
    window.isServer = ${serialize(props.isServer)}
  </script>
  <div id="root">${props.appString}</div>
  <script type="text/javascript" src=/static/js/main.js></script>
  <script type="text/javascript" src=/static/js/vendors.js></script>
  <script type="text/javascript" src=/static/js/runtime~main.js></script>
  ${jsScripts(props.bundles)}
  </body>
  </html>
`;
