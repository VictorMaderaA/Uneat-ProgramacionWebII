import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Principal from "../pages/Principal";
import Accesso from "../pages/Accesso";
import Registro from "../pages/Registro";

export default function MainRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">INICIO</Link>
            </li>
            <li>
              <Link to="/principal">Home</Link>
            </li>
            <li>
              <Link to="/accesso">About</Link>
            </li>
            <li>
              <Link to="/registro">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/">
            <h1>Test</h1>
          </Route>
          <Route exact path="/principal">
            <Principal/>
          </Route>
          <Route exact path="/accesso">
            <Accesso/>
          </Route>
          <Route exact path="/registro">
            <Registro/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}