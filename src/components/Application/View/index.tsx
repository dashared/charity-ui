import React, { MutableRefObject, useEffect } from "react";
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

type PropsType = {
  donation: DonationRequestBody;
  onRefetch: () => Promise<void>;
};

type RefType = {
  onRefetch: () => Promise<void>;
};

const ApplicationView = React.forwardRef<RefType, PropsType>((props, ref) => {
  const { t } = useTranslation("Application");

  const { donation, onRefetch } = props;

  useEffect(() => {
    if (ref !== undefined) {
      (ref as MutableRefObject<RefType>).current = {
        onRefetch,
      };
    }
    // eslint-disable-next-line
  }, [ref]);

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
            applicantId={donation.author?.id}
            donee={donation.donee ?? donation.author}
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
          <FilesTab files={donation.file_id ?? []} />
        </TabPane>

        <TabPane
          tab={
            <Tooltip title={t("$views.tabs.logsTitle")}>
              <DiffOutlined />
            </Tooltip>
          }
          key="logs"
        >
          <LogsTab
            {...{ id: donation.id ?? 0, onButtonsStatusRefetch: onRefetch }}
            ref={ref}
          />
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
});

ApplicationView.displayName = "ApplicationView";

export default ApplicationView;
