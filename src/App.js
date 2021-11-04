import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./sass/app.scss";
import "./index.css";
import logo from "./images/icon.png";

class App extends Component {
  state = {
    counter: 0,
  };

  handleClick = () => {
    this.setState((prevState) => {
      return { counter: prevState.counter + 1 };
    });
  };
  render() {
    return (
      <div className="App">
        <h1>Base Project Setup!!!</h1>
        <p>{`The count now is: ${this.state.counter}`}</p>
        <img src={logo} style={{ width: "50px", height: "50px" }} alt="logo" />
        <button onClick={this.handleClick}>Click here</button>
      </div>
    );
  }
}
export default hot(module)(App);
