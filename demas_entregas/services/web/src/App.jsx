import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Landing.jsx";
import Menu from "./components/Menu.jsx";
import SignIn from "./components/SignIn.jsx";
import AuthContext from "./AuthContext.js";
import styles from "./main.scss";
const App = () => {
  const [{ isLoggedIn, user }, setAuth] = useState({
    isLoggedIn: false,
    user: undefined,
  });

  return (
    <AuthContext.Provider
      value={{
        logIn: (user) => {
          setAuth({ isLoggedIn: true, user });
        },
        isLoggedIn,
        user,
      }}
    >
      <Router>
        <Switch>
          <Route path="/" exact>
            <Landing />
          </Route>
          <Route path="/sign-in">
            <SignIn returnTo="/game" />
          </Route>
          <Route path="/game">
            <Menu />
          </Route>
          <Route path="/">
            <p>Page not found</p>
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
