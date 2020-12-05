import React, { CSSProperties, FC } from "react";
import { Link } from "@curi/react-dom";

import { logoLarge, logoSmall } from "../appInfo";

type LogoProps = {
  small?: boolean;
  style?: CSSProperties;
  className?: string;
};

const Logo: FC<LogoProps> = ({ small = false, style = {}, className = "" }) => {
  return (
    <Link name="index">
      <div className={className} style={style}>
        {small ? logoSmall : logoLarge}
      </div>
    </Link>
  );
};

export default Logo;
