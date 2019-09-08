import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else return { color: "#373737" };
};

const Menu = ({ history }) => {
  return (
    <div>
      <Link style={isActive(history, "/")} to="/">
        홈
      </Link>
      <Link style={isActive(history, "/signin")} to="/signin">
        로그인
      </Link>
      <Link style={isActive(history, "/signup")} to="/signup">
        회원가입
      </Link>
    </div>
  );
};

export default withRouter(Menu);
