import React, { Component } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Login from './Login'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component = {Login}/>
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
