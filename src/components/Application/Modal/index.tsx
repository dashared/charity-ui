import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  DonationRequestResponse,
  DonationRequestUpdateInput,
} from "@generated";
import { notify } from "@lib/utils/notification";
import { AxiosPromise } from "axios";

import { ApplicationStatus } from "../Status/tag";

type FormValues = {
  message: string;
};

const ModalWithMessage: FC<{
  query: (
    id: number,
    input: DonationRequestUpdateInput,
    // eslint-disable-next-line
    options?: any,
  ) => AxiosPromise<DonationRequestResponse>;
  title: string;
  applicationId: number;
  newStatus: ApplicationStatus;
  onRefetch: () => Promise<void>;
  isVisible: boolean;
  onClose: () => void;
}> = ({
  query,
  title,
  applicationId: id,
  newStatus,
  onRefetch,
  isVisible,
  onClose,
}) => {
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

        console.log(values);

        const input: DonationRequestUpdateInput = {
          status: newStatus,
          comment: values.message,
        };

        await query(id, input);

        form.resetFields();

        notify(t("$views.card.successUpdateStatus"));
      } catch (e) {
        console.error(e);
      } finally {
        setVisible(false);
        setConfirmLoading(false);
        onClose();
        onRefetch();
      }
    },
    [
      setConfirmLoading,
      setVisible,
      id,
      onRefetch,
      newStatus,
      query,
      onClose,
      t,
      form,
    ],
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
