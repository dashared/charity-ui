import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Modal, Tooltip } from "antd";
import { useForm } from "antd/lib/form/Form";
import { IssuesCloseOutlined } from "@ant-design/icons";
import { DefaultApiFactory, ModelsUpdateDonationStatusInput } from "@generated";
import { notify } from "@lib/utils/notification";

import { ApplicationStatus } from "../Status/tag";

type FormValues = {
  message: string;
};

/** Leaves a comment and transferes application into "NeedsImprovement" status. */
export const RequestChangesButton: FC<{
  applicationId: string;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
}> = ({ applicationId: id, status, onRefetch }) => {
  const { t } = useTranslation("Application");

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = useForm<FormValues>();

  const showModal = (): void => {
    setVisible(true);
  };

  const handleOk = useCallback(
    async (values: FormValues): Promise<void> => {
      try {
        setConfirmLoading(true);

        const input: ModelsUpdateDonationStatusInput = {
          status: ApplicationStatus.NeedsImprovement,
          message: values.message,
        };

        await DefaultApiFactory(undefined).donationRequestIdPatch(id, input);

        notify("Ура!");
      } catch (e) {
        console.error(e);
      } finally {
        setVisible(false);
        setConfirmLoading(false);
        onRefetch();
      }
    },
    [setConfirmLoading, setVisible, id, onRefetch],
  );

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
        onOk={() => handleOk(form.getFieldsValue())}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <Form<FormValues> form={form}>
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
