import React, { Component } from "react";
import styles from "./Home.module.css";
import Aux from "../../hoc/Auxiliar/Auxiliar";

class Home extends Component {
  render() {
    return (
      <Aux>
        <article className={styles.Home}>
            <h1>The Login app</h1>
            <p>Welcome to the login react app, in this app you can login with an email and a password.</p>
        </article>
      </Aux>
    );
  }
}

export default Home;
