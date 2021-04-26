import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
        <div className="contenido">
            <div className="card">
                <h1>Entrega 02</h1>
                <button className="btn"><Link to="/sign-in">Ingresar</Link></button>
            </div>
        </div>
    </>
  );
};

export default Landing;
