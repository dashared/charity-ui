import React from "react";
import { i18n } from "@providers";
import PropTypes from "prop-types";
import QueueAnim from "rc-queue-anim";
import { Element } from "rc-scroll-anim";
import { withTranslation } from "react-i18next";

import BannerImage from "./BannerImage";
import { assets } from "./data";

class Banner extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isMobile: PropTypes.bool,
    navToShadow: PropTypes.func,
  };
  static defaultProps = {
    className: "banner",
  };
  render() {
    const { className, isMobile, navToShadow } = this.props;

    return (
      <Element
        component="section"
        className={`${className}-wrapper page`}
        onChange={navToShadow}
      >
        <div className={className}>
          <div className={`${className}-img-wrapper`}>
            {isMobile ? (
              <img
                width="100%"
                src={`${assets}/image/home/intro-landscape-3a409.svg`}
                alt=""
              />
            ) : (
              <BannerImage />
            )}
          </div>
          <QueueAnim
            type={isMobile ? "bottom" : "right"}
            className={`${className}-text-wrapper`}
            delay={300}
          >
            <h1 key="h1">{i18n.t("Landing.title")}</h1>
            <p className="main-info" key="p">
              {i18n.t("Landing.description")}
            </p>
          </QueueAnim>
        </div>
      </Element>
    );
  }
}

export default withTranslation()(Banner);
