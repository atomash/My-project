export default props => `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Error 500</title>
    <style type="text/css">
    @import "https://fonts.googleapis.com/css?family=Inconsolata";
    body {
      background-color: #000000;
      font-family: 'Inconsolata', Helvetica, sans-serif;
      font-size: 1.7rem;
      color: white;
    }
    .terminal {
      position: absolute;
      padding: 4rem;
    }
    .output::before {
      content: "> ";
    }
    .errorcode {
        color: red;
      }
      .termbutton {
        color: green;
      }
      .termbutton:hover {
        cursor: pointer;
      }
      
      .termbutton::before {
        content: "[";
      }
      
      .termbutton::after {
        content: "]";
      }
   </style>
  </head>
  <body>
    <div class="terminal">
    <h1 class="errorcode">ERROR 500</h1>
    <p class="output">${props.err}</p>
    <p class="output">Server is currently crashed</p>
    <p class="output"><i class="termbutton" onclick="location.reload()">Reload_Page</i> </p>
    </div>
  </body>
  </html>
`;
