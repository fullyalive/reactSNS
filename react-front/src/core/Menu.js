import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else return { color: "#373737" };
};

export const signout = next => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch("http://localhost:8080/signout", {
    method: "GET"
  })
    .then(response => {
      console.log("signout", response);
      return response.json();
    })
    .catch(err => console.log(err));
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
      <a
        style={(isActive(history, "/signout"), { cursor: "pointer" })}
        onClick={() => signout(() => history.push("/"))}
      >
        로그아웃
      </a>
    </div>
  );
};

export default withRouter(Menu);
