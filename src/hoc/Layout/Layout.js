import React, { Component } from "react";
import Aux from "../Auxiliar/Auxiliar";
import Logo from "../../components/UI/Logo/logo";
import Navigation from "../../components/Navigation/NavigationItems"

class Layout extends Component {
  render() {
    return (
      <Aux>
        <header>
          <Navigation></Navigation>
          <Logo></Logo>
        </header>
        <main>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
