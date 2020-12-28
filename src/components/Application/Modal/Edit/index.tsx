import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Empty, Form, Input, Modal, Skeleton, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { DefaultApiFactory, ModelsDonationRequestBody } from "@generated";
import useAxios from "@providers/axios";
// import { DefaultApi, DefaultApiFactory } from "@generated";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const EditModal: FC<{
  id: string;
  onRefetch: () => Promise<void>;
  isVisible: boolean;
  onClose: () => void;
}> = ({ id, onRefetch, isVisible, onClose }) => {
  const { t } = useTranslation("Application");

  const [visible, setVisible] = useState(isVisible);

  // TODO : memory leak
  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const close = useCallback(() => {
    setVisible(false);
    onClose();
  }, [setVisible, onClose]);

  const [form] = useForm<ModelsDonationRequestBody>();
  const { data, loading } = useAxios(
    DefaultApiFactory(undefined).donationRequestIdGet,
    id,
  );
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleChange = useCallback(async () => {
    try {
      setConfirmLoading(true);
      // eslint-disable-next-line
      await setTimeout(() => {}, 3000);
      console.log(form.getFieldsValue()); // send to API
      close();
      onRefetch();
    } catch (e) {
      console.error(e);
    } finally {
      setConfirmLoading(false);
    }
  }, [setConfirmLoading, onRefetch, close, form]);

  return (
    <Modal
      title={t("$views.modal.editTitle")}
      visible={visible}
      confirmLoading={confirmLoading}
      onOk={handleChange} // you can "ok" if only data is present
      onCancel={close}
      footer={
        <Space>
          <Button key="back" onClick={close}>
            Return
          </Button>
          {data && (
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleChange}
            >
              Submit
            </Button>
          )}
        </Space>
      }
    >
      {loading && <Skeleton active={loading} />}
      {!data && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      {data && (
        <Form {...layout} form={form} initialValues={{ ...data }}>
          <Form.Item label={t("$views.card.description")} name="description">
            <Input.TextArea />
          </Form.Item>

          <Form.Item label={t("$views.card.requestedAmount")}>
            <span>{data.requested_amount}</span>
          </Form.Item>

          <Form.Item
            label={t("$views.card.approvedAmount")}
            name="approved_amount"
          >
            <Input />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default EditModal;
