import React from 'react';
import { Route } from 'react-router-dom';
import Helmet from 'react-helmet';

const Status = ({ code, children }) => (
    <Route render={({ staticContext }) => {
      if (staticContext)
        staticContext.status = code
      return children
    }}/>
  )

  export const NotFound = () => (
    <Status code={404}>
     <Helmet>
          <title>
            Not Found
          </title>
        </Helmet>
      <div>
        <h1>Sorry, can’t find Page</h1>
      </div>
    </Status>
  )