/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaults, noop } from "lodash";
import { Button, Form, Input, Tooltip, Upload } from "antd";
import { FormInstance, Rule } from "antd/lib/form";
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import {
  DonationRequestBodyAvailableStatusesEnum as ApplicationStatus,
  DonationRequestUpdateStatusInput,
} from "@generated";
import { useTranslation } from "@providers";
import { customRequest } from "@providers/cusomUpload";

import AssigneeSelect from "components/Assignee/Select";
import StatusSelect from "components/Status/Select";

export type ApplicationFormState = DonationRequestUpdateStatusInput;

export type ApplicationFormHandler = FormInstance<ApplicationFormState>;

type ApplicationFormProps = {
  initial?: ApplicationFormState;
  availiableStatuses: ApplicationStatus[];
  undoTransition?: boolean;
  currentStatus: ApplicationStatus;
  onSubmit?: (values: ApplicationFormState) => void | Promise<void>;
  onUndoTransition?: () => void | Promise<void>;
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

const UndoTransition: FC<{
  currentStatus: ApplicationStatus;
  onClick?: () => void | Promise<void>;
}> = ({ currentStatus, onClick }) => {
  const { t } = useTranslation("Application");

  return (
    <Tooltip title={t("undo_transition_tooltip")}>
      <Button type="link" style={{ padding: "0px" }} onClick={onClick}>
        {t("undo_transition", { currentStatus: t(`Status.${currentStatus}`) })}
      </Button>
    </Tooltip>
  );
};

type UploadFilesProps = {
  initial: Array<UploadFile<any>>;
  onFilesChange: (files: string[]) => void;
  onUploadChange: (info: UploadChangeParam) => void;
};

const UploadFilesItem: FC<UploadFilesProps> = (
  { initial, onFilesChange, onUploadChange },
  ...rest
) => {
  const { t } = useTranslation("Application");

  return (
    <Form.Item name="file_ids" label={t("file_ids")} {...rest}>
      <Upload
        onChange={onUploadChange}
        fileList={initial}
        customRequest={(options) => customRequest(options, onFilesChange)}
      >
        <Button icon={<UploadOutlined />}>{t("upload")}</Button>
      </Upload>
    </Form.Item>
  );
};

const ApplicationForm: ForwardRefRenderFunction<
  ApplicationFormHandler,
  ApplicationFormProps
> = (
  {
    initial,
    onSubmit,
    availiableStatuses,
    undoTransition,
    onUndoTransition,
    currentStatus,
  },
  ref,
) => {
  const { t } = useTranslation("Application");

  const [form] = Form.useForm<ApplicationFormState>();

  const [status, setStatus] = useState<ApplicationStatus | undefined>();

  // file ids after uploading during OnRealization
  const [initialFileList, setUploadChange] = useState<Array<UploadFile<any>>>(
    [],
  );

  const handleOnChange = (info: UploadChangeParam): void => {
    setUploadChange(info.fileList);
  };

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
        const file_ids = initialFileList
          .map((item) => {
            if (item.response) {
              return item.response[0]?.id;
            } else {
              return undefined;
            }
          })
          .flatMap((item) => {
            return item ? [item] : [];
          });

        console.log(file_ids);

        onSubmit?.({
          assignee_id: values?.assignee?.value,
          comment: values.comment,
          status: values.status,
          file_ids,
        });
      }}
    >
      <Form.Item
        name="status"
        label={t("status")}
        rules={RULES.status}
        extra={
          undoTransition ? (
            <UndoTransition
              currentStatus={currentStatus}
              onClick={onUndoTransition}
            />
          ) : undefined
        }
      >
        <StatusSelect avaliable={availiableStatuses} onChange={setStatus} />
      </Form.Item>

      {currentStatus === ApplicationStatus.OnRealization &&
        status === ApplicationStatus.Archived && (
          <UploadFilesItem
            initial={initialFileList}
            onFilesChange={(ids) => {
              console.log(ids);
            }}
            onUploadChange={handleOnChange}
          />
        )}

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
