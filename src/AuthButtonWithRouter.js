import React from "react";
import { withRouter } from "react-router-dom";

function AuthButton(props) {
  const { history } = props;
  return props.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          props.logout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

const AuthButtonWithRouter = withRouter(AuthButton);

export default AuthButtonWithRouter;
