import React, { FC } from "react";

//import { useTranslation } from "@providers";
import FundView from "components/Fund/View";

const FundPage: FC = () => {
  // const { t } = useTranslation("Fund");

  return <FundView name="FFF" />;
};

export const name = "fund:description-index";

export default FundPage;
