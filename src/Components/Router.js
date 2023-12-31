import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Home from "../Routes/Home";
import Auth from "../Routes/Auth";
import Profile from '../Routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation/>}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Redirect from="*" to="/"/>
          </>
        ) : (
          <>
          <Route exact path="/">
            <Auth />
          </Route>
          <Redirect from="*" to="/"/>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
