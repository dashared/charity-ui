import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  ModelsDonationRequest,
  ModelsUpdateDonationStatusInput,
} from "@generated";
import { notify } from "@lib/utils/notification";
import { AxiosPromise } from "axios";

import { ApplicationStatus } from "../Status/tag";

type FormValues = {
  message: string;
};

const ModalWithMessage: FC<{
  // eslint-disable-next-line
  query: (
    id: string,
    input: ModelsUpdateDonationStatusInput,
    options?: any,
  ) => AxiosPromise<ModelsDonationRequest>;
  title: string;
  applicationId: string;
  newStatus: ApplicationStatus;
  onRefetch: () => Promise<void>;
  isVisible: boolean;
}> = ({ query, title, applicationId: id, newStatus, onRefetch, isVisible }) => {
  const { t } = useTranslation("Application");

  const [form] = useForm<FormValues>();
  const [visible, setVisible] = useState(isVisible);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const handleOk = useCallback(
    async (values: FormValues): Promise<void> => {
      try {
        setConfirmLoading(true);

        const input: ModelsUpdateDonationStatusInput = {
          status: newStatus,
          message: values.message,
        };

        await query(id, input);

        notify("Ура!");
      } catch (e) {
        console.error(e);
      } finally {
        setVisible(false);
        setConfirmLoading(false);
        onRefetch();
      }
    },
    [setConfirmLoading, setVisible, id, onRefetch, newStatus, query],
  );

  return (
    <Modal
      title={title}
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
  );
};

export default ModalWithMessage;
