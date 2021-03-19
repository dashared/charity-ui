import React from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";

import "../static/style";

import Footer from "../Footer";
import Header from "../Header";
import Page2 from "./Page2";

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

class FAQ extends React.PureComponent {
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
        isMobile={isMobile}
        key="header"
        className={this.state.showShadow ? "header.show-shadow" : "header"}
      />,
      //<Banner key="banner" isMobile={this.state.isMobile} navToShadow={this.navToShadow} />,
      <Page2 key="page2" />,
      <Footer key="footer" />,
      <DocumentTitle title="Charity CRM - FAQ" />,
    ];
  }
}

export default FAQ;
