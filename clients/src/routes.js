import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/login';
import Register from './pages/Register'
import EventsPages from './pages/eventsPages';

export default function Routes(){
    return( 
     <BrowserRouter>
      <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/dashboard" exact component={Dashboard}></Route>
          <Route path="/user/register" component={Register}></Route>
          <Route path="/event" component={EventsPages}></Route>
      </Switch>
     </BrowserRouter>
    )
}