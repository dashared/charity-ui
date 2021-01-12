import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Modal, Space, Tabs, Tooltip } from "antd";
import {
  EditOutlined,
  FileDoneOutlined,
  FileOutlined,
  InfoCircleOutlined,
  SaveOutlined,
  StopOutlined,
} from "@ant-design/icons";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";

import { DocsTab, InfoTab, ReportsTab } from "components/Fund/Tabs";

type FundProps = {
  name: string;
};

type RefType = {
  onSave: () => Promise<void>;
};

const Actions: FC<{
  editable: boolean;
  onEdit: () => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
}> = ({ editable, onEdit, onSave, onCancel }) => {
  const { t } = useTranslation("Fund");

  return (
    <>
      {!editable && (
        <Button type="primary" icon={<EditOutlined />} onClick={onEdit}>
          {t("$views.buttons.edit")}
        </Button>
      )}
      {editable && (
        <Space>
          <Button type="default" onClick={onCancel} icon={<StopOutlined />}>
            {t("$views.buttons.cancel")}
          </Button>
          <Button type="primary" onClick={onSave} icon={<SaveOutlined />}>
            {t("$views.buttons.save")}
          </Button>
        </Space>
      )}
    </>
  );
};

const FundView: FC<FundProps> = ({ name }) => {
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    setEditable(false);
  }, [setEditable]);

  const { t } = useTranslation("Fund");

  const refetchRef = useRef<RefType | null>(null);

  const onSave = useCallback(async () => {
    refetchRef.current?.onSave();
    setEditable(false);
  }, []);

  return (
    <AuthConsumer>
      {({ user }) => {
        return (
          <Card
            title={t("title", { name })}
            extra={
              <RoleSwitch
                role={user.role}
                perform="fund:description-edit"
                yes={() => (
                  <Actions
                    editable={editable}
                    onEdit={() => setEditable(true)}
                    onSave={onSave}
                    onCancel={() => setEditable(false)}
                  />
                )}
              />
            }
          >
            <Tabs
              tabPosition="left"
              defaultActiveKey="1"
              onTabClick={() => {
                {
                  editable &&
                    Modal.warning({
                      title: t("modal.title"),
                      content: t("modal.description"),
                    }); // TODO: is it good enough for UX?
                }
                setEditable(false);
              }}
            >
              <Tabs.TabPane
                key="1"
                tab={
                  <Tooltip title={t("description")}>
                    <InfoCircleOutlined />
                  </Tooltip>
                }
              >
                <InfoTab {...{ editable, role: user.role }} ref={refetchRef} />
              </Tabs.TabPane>

              <Tabs.TabPane
                key="2"
                tab={
                  <Tooltip title={t("docs")}>
                    <FileOutlined />
                  </Tooltip>
                }
              >
                <DocsTab />
              </Tabs.TabPane>

              <Tabs.TabPane
                key="3"
                tab={
                  <Tooltip title={t("reports")}>
                    <FileDoneOutlined />
                  </Tooltip>
                }
              >
                <ReportsTab />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        );
      }}
    </AuthConsumer>
  );
};

export default FundView;
