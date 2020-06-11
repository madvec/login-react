import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import Home from "./containers/Home/Home";
import "./App.css";

function App() {
  return (
    <div className="App container-fluid">
      <Layout>
        <Switch>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
