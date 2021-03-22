// En la vista de acceso el usuario debe poder introducir su nombre de usuario y contraseña. Si estos datos corresponden a un usario registrado, éste debe ser redirigido a la vista principal.

import Login from "../parts/Login";

const Acceso = () => {

    return (
        <>
            <h1>Acceso</h1>
            <Login/>
        </>
    )
}

export default Acceso;
