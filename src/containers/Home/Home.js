import React, { Component } from "react";
import styles from "./Home.module.css";
import { connect } from 'react-redux'
import Aux from "../../hoc/Auxiliar/Auxiliar";

class Home extends Component {

  state = {
    loggedIn: false
  }

  componentDidMount () {
    if(localStorage.length === 0) {
      this.setState({ loggedIn: false})
    } else {
      this.setState({loggedIn: true})
    }
  }
  render() {
    let status = <h3>You are currently logged in</h3>
    if (!this.state.loggedIn)
      status = <h3>Please, try to log in</h3>
    return (
      <Aux>
        <article className={styles.Home}>
          <h1>The Login app</h1>
          <p>Welcome to the login react app, in this app you can login with an email and a password.</p>
          {status}
        </article>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.idToken)
  return {
    idToken: state.idToken,
    error: state.error
  }
}

export default connect(mapStateToProps, null)(Home);
