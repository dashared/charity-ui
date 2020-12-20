import React, { FC } from "react";
import { Descriptions } from "antd";
import { ModelsDonee as Donee } from "@generated";
import { useTranslation } from "@providers";

const DoneeInfoTab: FC<{ donee?: Donee }> = () => {
  const { t } = useTranslation("Application");

  return <Descriptions title={t("$views.card.doneeInfoTitle")}></Descriptions>;
};

export default DoneeInfoTab;
