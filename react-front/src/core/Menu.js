import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

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
      <Link style={isActive(history, "/users")} to="/users">
        Users
      </Link>
      {!isAuthenticated() && (
        <>
          <Link style={isActive(history, "/signin")} to="/signin">
            로그인
          </Link>
          <Link style={isActive(history, "/signup")} to="/signup">
            회원가입
          </Link>
        </>
      )}
      {isAuthenticated() && (
        <>
          <li>
            <Link
              to={`/user/${isAuthenticated().user._id}`}
              style={isActive(history, `/user/${isAuthenticated().user._id}`)}
            >
              {`내정보 | ${isAuthenticated().user.name}`}
            </Link>
          </li>
          <span
            style={(isActive(history, "/signout"), { cursor: "pointer" })}
            onClick={() => signout(() => history.push("/"))}
          >
            로그아웃
          </span>
        </>
      )}
    </div>
  );
};

export default withRouter(Menu);
