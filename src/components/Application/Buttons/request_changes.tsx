import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import { IssuesCloseOutlined } from "@ant-design/icons";

import { ApplicationStatus } from "../Status/tag";

/** Leaves a comment and transferes application into "NeedsImprovement" status. */
export const RequestChangesButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
}> = ({ status }) => {
  const { t } = useTranslation("Application");

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (): void => {
    setVisible(true);
  };

  const handleOk = (): void => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  if (status !== ApplicationStatus.Processing) {
    return null;
  }

  return (
    <>
      <Tooltip title={t("$views.buttons.request_changes")}>
        <Button
          type="default"
          icon={<IssuesCloseOutlined />}
          onClick={showModal}
        />
      </Tooltip>

      <Modal
        title={t("$views.modal.requestChangesTitle")}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <Form.Item
            name="message"
            label={t("$views.card.message")}
            rules={[
              {
                required: true,
                message: t("$views.card.enterMessage"),
              },
            ]}
          >
            <Input.TextArea placeholder={t("$views.card.enterMessage")} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
