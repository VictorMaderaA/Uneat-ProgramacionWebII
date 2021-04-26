import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import TextInput from "./TextInput.jsx";
import AuthContext from "../AuthContext.js";

const SignIn = ({ returnTo }) => {
  const { logIn, isLoggedIn } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({ name: "" });

  if (isLoggedIn) return <Redirect to={returnTo} />;

  const handleInputChange = (event) => {
    const target = event.target;
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    logIn(formValues);
  };

  return (
      <div className="contenido">
        <div className="card">
          <h1>Identifícate</h1>
          <form onSubmit={handleSubmit} className="formulario">
            <TextInput
                name="name"
                placeholder="Pon tu nombre"
                value={formValues.name}
                onChange={handleInputChange}
            />
            <button type="submit" className="btn">Acceder</button>
          </form>
        </div>
      </div>
  );
};
SignIn.propTypes = {
  returnTo: PropTypes.string.isRequired,
};

export default SignIn;
