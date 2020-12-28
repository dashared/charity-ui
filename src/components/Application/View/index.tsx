import React, { FC } from "react";
import { Card, Tabs, Tooltip } from "antd";
import {
  DiffOutlined,
  FileOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ModelsDonationRequest } from "@generated";
import { useTranslation } from "@providers";

import DoneeInfoTab from "./Tabs/Donee";
import FilesTab from "./Tabs/Files";
import GeneralInfoTab from "./Tabs/Info";
import LogsTab from "./Tabs/Logs";

const { TabPane } = Tabs;

const ApplicationView: FC<{
  donation: ModelsDonationRequest;
  onRefetch: () => Promise<void>;
}> = ({ donation, onRefetch }) => {
  const { t } = useTranslation("Application");

  return (
    <Card>
      <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane
          tab={
            <Tooltip title={t("$views.tabs.generalInfoTitle")}>
              <InfoCircleOutlined />
            </Tooltip>
          }
          key="general"
        >
          <GeneralInfoTab info={donation} onRefetch={onRefetch} />
        </TabPane>

        <TabPane
          tab={
            <Tooltip title={t("$views.tabs.doneeInfoTitle")}>
              <UserOutlined />
            </Tooltip>
          }
          key="donee"
        >
          <DoneeInfoTab
            applicantId={donation.applicant_id}
            donee={donation.donee}
            relationship={donation.relationship}
          />
        </TabPane>

        <TabPane
          tab={
            <Tooltip title={t("$views.tabs.filesTitle")}>
              <FileOutlined />
            </Tooltip>
          }
          key="files"
        >
          <FilesTab files={["fff.pfd", "xxx.hfhf"]} />
        </TabPane>

        <TabPane
          tab={
            <Tooltip title={t("$views.tabs.logsTitle")}>
              <DiffOutlined />
            </Tooltip>
          }
          key="logs"
        >
          <LogsTab id={donation.id ?? ""} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ApplicationView;
