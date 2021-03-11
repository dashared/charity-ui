import React from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";

import "../static/style";

import Footer from "../Footer";
import Header from "../Header";
import Content from "./Content";

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

class PrivacyPolicy extends React.PureComponent {
  state = {
    isMobile,
    showShadow: false,
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({
        isMobile: !!b,
      });
    });
  }
  navToShadow = (e) => {
    this.setState({ showShadow: e.mode === "leave" });
  };
  render() {
    return [
      <Header
        key="header"
        className={this.state.showShadow ? "header.show-shadow" : "header"}
      />,
      //<Banner key="banner" isMobile={this.state.isMobile} navToShadow={this.navToShadow} />,
      <Content key="content" />,
      <Footer key="footer" />,
      <DocumentTitle title="Charity App - Privacy Policy" />,
    ];
  }
}

export default PrivacyPolicy;
