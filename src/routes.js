import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './components/home/Home'
import Login from './components/login/Login'
import Channel from './components/channel/Channel'
import AddReview from './components/addReview/AddReview'
import Profile from './components/profile/Profile'
import externalProfile from './components/externalProfile/ExternalProfile'
import Search from './components/search/Search'


export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/profile" component={Profile} />
    <Route path="/user/:id" component={externalProfile} />
    <Route path="/search" component={Search} />
    <Route path="/review/:id" component={AddReview} />
    <Route path="/channel/:id" component={Channel} />
  </Switch>
);