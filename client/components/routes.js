
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import InputForm from '../input-form'
import Signup from "./Signup";



export default class Routes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
        
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/users/:userId" component={InputForm} />        </Switch>
      </div>
    );
  }
}

