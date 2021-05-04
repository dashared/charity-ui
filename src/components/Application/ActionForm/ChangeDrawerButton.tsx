import React, { FC, useRef, useState } from "react";
import { Button, Drawer, Space } from "antd";
import { DonationRequestBodyAvailableStatusesEnum as ApplicationStatus } from "@generated";
import { useTranslation } from "@providers";

import { ApplicationFormHandler } from "./form";
import { ApplicationForm } from ".";

import styles from "./styles.module.less";

const CreateDrawerButton: FC<{
  refetch: () => void;
  availiableStatuses: ApplicationStatus[];
  currentStatus: ApplicationStatus;
  undoTransition?: boolean;
  id: number;
}> = ({ availiableStatuses, id, currentStatus, undoTransition, refetch }) => {
  const { t } = useTranslation("Application");

  const handlers = useRef<ApplicationFormHandler>(null);

  const [drawer, setDrawer] = useState(false);

  const onClose = (): void => {
    setDrawer(false);
    refetch();
    handlers.current?.resetFields();
  };

  return (
    <>
      <Button
        onClick={() => {
          setDrawer(true);
        }}
      >
        {t("$views.buttons.actions.title")}
      </Button>

      <Drawer
        visible={drawer}
        onClose={onClose}
        title={t("$views.buttons.actions.formTitle")}
        width="33vw"
        footer={
          <Space align="center" className={styles.submitButtons}>
            <Button onClick={onClose}>{t("translation:cancel")}</Button>

            <Button type="primary" onClick={() => handlers.current?.submit()}>
              {t("translation:save")}
            </Button>
          </Space>
        }
      >
        <ApplicationForm
          ref={handlers}
          onSuccess={onClose}
          id={id}
          availiableStatuses={availiableStatuses}
          currentStatus={currentStatus}
          undoTransition={undoTransition}
        />
      </Drawer>
    </>
  );
};

export default CreateDrawerButton;
