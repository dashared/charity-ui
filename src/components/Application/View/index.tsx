import React, { FC } from "react";
import { Badge, Card, Tabs, Tooltip } from "antd";
import {
  DiffOutlined,
  FileOutlined,
  InfoCircleOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DonationRequestBody } from "@generated";
import { useTranslation } from "@providers";

// import { DonationRequestFactory } from "@providers/axios";
import {
  CommentTab,
  DoneeInfoTab,
  FilesTab,
  GeneralInfoTab,
  LogsTab,
} from "./Tabs";

const { TabPane } = Tabs;

const ApplicationView: FC<{
  donation: DonationRequestBody;
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
            applicantId={donation.assignee?.id}
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
          <LogsTab id={donation.id ?? 0} />
        </TabPane>

        <TabPane
          tab={
            <Tooltip title={t("$views.tabs.commentsTitle")}>
              <Badge count={5}>
                <MessageOutlined />
              </Badge>
            </Tooltip>
          }
        >
          <CommentTab id={donation.id ?? 0} />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ApplicationView;
