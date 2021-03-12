import React from "react";
import DocumentTitle from "react-document-title";
import { enquireScreen } from "enquire-js";
import { withTranslation } from "react-i18next";

import "./static/style";

import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import Page1 from "./Page1";
import Page2 from "./Page2";

let isMobile = false;
enquireScreen((b) => {
  isMobile = b;
});

class Home extends React.PureComponent {
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
      <Banner
        key="banner"
        isMobile={this.state.isMobile}
        navToShadow={this.navToShadow}
      />,
      <Page1 key="page1" />,
      <Page2 key="page2" />,
      <Footer key="footer" />,
      <DocumentTitle title="Charity CRM" />,
    ];
  }
}
export default withTranslation()(Home);
