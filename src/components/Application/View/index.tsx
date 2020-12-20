import React, { FC } from "react";
import { Card, Tabs } from "antd";
import { ModelsDonationRequest } from "@generated";
import { useTranslation } from "@providers";

import DoneeInfoTab from "./Tabs/Donee";
import GeneralInfoTab from "./Tabs/Info";
import LogsTab from "./Tabs/Logs";

const { TabPane } = Tabs;

const ApplicationView: FC<{ donation: ModelsDonationRequest }> = ({
  donation,
}) => {
  const { t } = useTranslation("Application");

  return (
    <Card>
      <Tabs defaultActiveKey="1">
        <TabPane tab={t("$views.tabs.generalInfoTitle")} key="general">
          <GeneralInfoTab info={donation} />
        </TabPane>

        <TabPane tab={t("$views.tabs.doneeInfoTitle")} key="donee">
          <DoneeInfoTab donee={donation.donee} />
        </TabPane>

        <TabPane tab={t("$views.tabs.logsTitle")} key="logs">
          <LogsTab id={donation.id ?? ""} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ApplicationView;
