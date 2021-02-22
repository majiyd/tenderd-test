import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { logout } from "../redux/actions/userActions";
import Auth from "./screens/Auth";
import Signin from "./screens/Auth/Signin";
import Signup from "./screens/Auth/Signup";
import Home from "./screens/Home";
import Request from "./screens/Request";
import Settings from "./screens/Settings";

const App = ({ isLoggedIn, logout }) => {
  if (!isLoggedIn) {
    return <Auth />;
  }
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <button onClick={logout}>logout</button>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/request">
            <Request />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.token,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
