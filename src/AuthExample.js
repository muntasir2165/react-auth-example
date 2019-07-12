import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import AuthButtonWithRouter from "./AuthButtonWithRouter";
import Login from "./Login";
import Public from "./Public";
import Protected from "./Protected";

////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

class AuthExample extends Component {
  state = {
    isAuthenticated: false
  };
  login = cb => {
    this.setState({ isAuthenticated: true }, () => setTimeout(cb, 100));
  };

  logout = cb => {
    this.setState({ isAuthenticated: false }, () => setTimeout(cb, 100));
  };

  render() {
    return (
      <Router>
        <div>
          <AuthButtonWithRouter
            isAuthenticated={this.state.isAuthenticated}
            login={this.login}
            logout={this.logout}
          />
          <ul>
            <li>
              <Link to="/public">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>
          <Route path="/public" component={Public} />
          <Route
            path="/login"
            render={props => <Login {...props} login={this.login} />}
          />
          <PrivateRoute
            path="/protected"
            component={Protected}
            isAuthenticated={this.state.isAuthenticated}
          />
        </div>
      </Router>
    );
  }
}

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default AuthExample;
