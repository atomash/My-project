import React from 'react';
import { Route, Redirect } from 'react-router-dom'

export const RedirectWithStatus = ({ from, to, status }) => (
    <Route render={({ staticContext }) => {
      if (staticContext)
        staticContext.status = status
      return <Redirect from={from} to={to}/>
    }}/>
  )