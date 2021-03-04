import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaults, noop } from "lodash";
import { Form, Input } from "antd";
import { FormInstance, Rule } from "antd/lib/form";
import {
  DonationRequestBodyAvailableStatusesEnum as ApplicationStatus,
  DonationRequestUpdateStatusInput,
} from "@generated";
import { useTranslation } from "@providers";

import AssigneeSelect from "components/Assignee/Select";
import StatusSelect from "components/Status/Select";

export type ApplicationFormState = DonationRequestUpdateStatusInput;

export type ApplicationFormHandler = FormInstance<ApplicationFormState>;

type ApplicationFormProps = {
  initial?: ApplicationFormState;
  availiableStatuses: ApplicationStatus[];
  onSubmit?: (values: ApplicationFormState) => void | Promise<void>;
};

const DEFAULTS: ApplicationFormState = {
  assignee_id: undefined,
  status: undefined,
  comment: undefined,
};

const RULES: { [K in keyof ApplicationFormState]?: Rule[] } = {
  status: [
    {
      required: true,
      message: "Не может быть пустым",
    },
  ],
};

const ApplicationForm: ForwardRefRenderFunction<
  ApplicationFormHandler,
  ApplicationFormProps
> = ({ initial, onSubmit, availiableStatuses }, ref) => {
  const { t } = useTranslation("Application");

  const [form] = Form.useForm<ApplicationFormState>();

  const [status, setStatus] = useState<ApplicationStatus | undefined>();

  const initialValues = useMemo(() => defaults({}, initial, DEFAULTS), [
    initial,
  ]);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  return (
    <Form<ApplicationFormState>
      layout="vertical"
      ref={ref}
      form={form}
      initialValues={initialValues}
      // eslint-disable-next-line
      onFinish={(values: any) => {
        onSubmit?.({
          assignee_id: values?.assignee?.value,
          comment: values.comment,
          status: values.status,
        });
      }}
    >
      <Form.Item name="status" label={t("status")} rules={RULES.status}>
        <StatusSelect avaliable={availiableStatuses} onChange={setStatus} />
      </Form.Item>

      <Form.Item name={["assignee"]} label={t("assignee")}>
        <AssigneeSelect value={null} status={status} onChange={noop} />
      </Form.Item>

      <Form.Item name="comment" label={t("comment")}>
        <Input.TextArea allowClear autoSize={{ minRows: 3 }} />
      </Form.Item>
    </Form>
  );
};

export default forwardRef(ApplicationForm);
