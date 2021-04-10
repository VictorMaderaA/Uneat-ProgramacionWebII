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
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        name="name"
        value={formValues.name}
        onChange={handleInputChange}
      />
      <input type="submit" />
    </form>
  );
};
SignIn.propTypes = {
  returnTo: PropTypes.string.isRequired,
};

export default SignIn;
