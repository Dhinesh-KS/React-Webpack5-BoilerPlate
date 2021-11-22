import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Typography from "@material-ui/core/Typography";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import "./sass/app.scss";
import "./index.css";
import logo from "./images/icon.png";
import data from "./dummy.csv";

class App extends Component {
  state = {
    counter: 0,
  };

  componentDidMount() {
    console.log(data);
  }

  handleClick = () => {
    this.setState((prevState) => {
      return { counter: prevState.counter + 1 };
    });
  };
  render() {
    return (
      <div className="App">
        <h1>Base Project Setup!!!!</h1>
        <Typography variant="h1" component="h2" gutterBottom align="center">
          Material UI
        </Typography>
        <p>{`The count now is: ${this.state.counter}`}</p>
        <img src={logo} style={{ width: "50px", height: "50px" }} alt="logo" />
        <AccessAlarmIcon />
        <button onClick={this.handleClick}>Click here</button>
      </div>
    );
  }
}
export default hot(module)(App);
