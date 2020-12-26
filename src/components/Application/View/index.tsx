import React, { FC } from "react";
import { Card, Tabs } from "antd";
import { ModelsDonationRequest } from "@generated";
import { useTranslation } from "@providers";

import DoneeInfoTab from "./Tabs/Donee";
import FilesTab from "./Tabs/Files";
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
          <DoneeInfoTab
            applicantId={donation.applicant_id}
            donee={donation.donee}
            relationship={donation.relationship}
          />
        </TabPane>

        <TabPane tab={t("$views.tabs.filesTitle")} key="files">
          <FilesTab files={["fff.pfd", "xxx.hfhf"]} />
        </TabPane>

        <TabPane tab={t("$views.tabs.logsTitle")} key="logs">
          <LogsTab id={donation.id ?? ""} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ApplicationView;
