// La vista principal es accesible sólo para usarios registrados
// La vista principal debe contener un botón para cerrar (e invalidar) la sesión del usuario, retornándolo a la vista de acceso.
// La vista principal debe mostrar el nombre de pila del usuario que la visita
// La vista principal debe contener algún componente interactivo que represente el trabajo final hecho por el alumno en la asignatura de Programación Web I. Si el alumno no tuviera un trabajo de referencia, podría crear un componente interactivo cualquiera, consultándolo con el profesor.

import {me} from "../services/auth";
import {useEffect, useState} from "react";
import {start} from "../assets/game";


const Principal = () => {

    const [user, setUser] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        me(meHandler.bind(this))
    }, [])

    async function meHandler(data) {
        if (data.status === 200) {
            setUser(await data.json())
        } else {
            console.error('Not LoggedIn')
        }
    }

    const gameStart = () => {
        let canv = document.getElementById("gc");
        let ctx = canv.getContext("2d");
        start(canv, ctx)
    }

    return (
        <>
            <h1>Principal</h1>

            <h1>
                Nombre:
            </h1>
            <h2 style={{color: "red"}}>
                {user.first_name}
            </h2>

            <h1>
                Email:
            </h1>
            <h2 style={{color: "red"}}>
                {user.email}
            </h2>

            <h1>
                Created At:
            </h1>
            <h2 style={{color: "red"}}>
                {user.created_at}
            </h2>

            <button onClick={gameStart}>GAME</button>

            <canvas id="gc" width="400" height="400"/>

        </>
    )
}

export default Principal;