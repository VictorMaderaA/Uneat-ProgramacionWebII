import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./assets/style.scss";
import MainRouter from "./parts/Router";

class App extends Component{
  render(){
    return(
      <div className="App">
        <MainRouter/>
      </div>
    );
  }
}

export default hot(module)(App);