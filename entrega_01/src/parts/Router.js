import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import Principal from "../pages/Principal";
import Acceso from "../pages/Acceso";
import Registro from "../pages/Registro";
import {loggedIn, logout} from "../services/auth";

export default function MainRouter() {

    const [logged, setLogged] = useState(false);
    const history = useHistory();

    React.useEffect(() => {
        loggedIn(loggedInHandler)
    }); // has no dependency - this will be called on-component-mount

    function loggedInHandler(data) {
        if (data.status === 200) {
            console.log(11)
            setLogged(true)
        } else {
            console.log(22)
            setLogged(false)
        }
    }

    function loggedOutHandler(data) {
        console.log(data, data.status)
        if (data.status === 200 || data.status === 401) {
            console.log(1)
            setLogged(false)
        } else {
            console.log(2)
            setLogged(false)
        }
    }


    console.log('logged', logged)

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        {/*<li>*/}
                        {/*    <Link to="/principal">Principal</Link>*/}
                        {/*</li>*/}
                        {/*<li hidden={logged}>*/}
                        {/*    <Link to="/acceso">Acceso</Link>*/}
                        {/*</li>*/}
                        {/*<li hidden={logged}>*/}
                        {/*    <Link to="/registro">Registro</Link>*/}
                        {/*</li>*/}
                        <li hidden={!logged}>
                            <h1 onClick={() => logout(loggedOutHandler.bind(this))}
                                style={{color: 'red'}}>LogOut</h1>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route exact path="/">
                        <button onClick={() => window.location.href = '/acceso'}>
                            Acceder
                        </button>
                        <button onClick={() => window.location.href = '/principal'}>
                            Principal
                        </button>
                    </Route>
                    {
                        logged ? (
                            <Route exact path="/principal" component={Principal}/>
                        ) : (
                            <Route exact path="/principal">
                                <button onClick={() => window.location.href = '/acceso'}>
                                    NECESITAS Acceder
                                </button>
                            </Route>
                        )
                    }
                    {
                        logged ? null : (
                            <>
                                <Route exact path="/acceso" component={Acceso}/>
                                <Route exact path="/registro" component={Registro}/>
                            </>
                        )
                    }

                </Switch>
            </div>
        </Router>
    );
}