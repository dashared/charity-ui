import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Menu } from "antd";
import {
  DonationRequestBodyAvailableStatusesEnum as ApplicationStatus,
  DonationRequestBodyStatusEnum,
  DonationRequestResponse,
  DonationRequestUpdateInput,
} from "@generated";
import { DonationRequestFactory } from "@providers/axios";
import { AxiosPromise } from "axios";

import ModalWithMessage from "components/Application/Modal";

import { startProcessing, stopProcessing } from "./Processing";
import { requireConfirmation } from "./RequireConfirmation";

export { startProcessing, stopProcessing } from "./Processing";

export { SpamButton } from "./Spam";

export { requireConfirmation } from "./RequireConfirmation";

type ApplicationButtonsProps = {
  currentStatus: ApplicationStatus;
  applicationId: number;
  availiableStatuses: ApplicationStatus[];
  onRefetch: () => Promise<void>;
};

type ModalState = {
  title: string;
  newStatus: ApplicationStatus;
  query: (
    id: number,
    input: DonationRequestUpdateInput,
    // eslint-disable-next-line
    options?: any,
  ) => AxiosPromise<DonationRequestResponse>;
};

const ActionButtons: FC<ApplicationButtonsProps> = (props) => {
  const { applicationId, onRefetch, currentStatus } = props;
  const { t } = useTranslation("Application");
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalState, setModalState] = useState<ModalState | undefined>(
    undefined,
  );

  const menu = [];

  console.log(props.availiableStatuses);

  for (const ind in props.availiableStatuses) {
    const status = props.availiableStatuses[ind];

    switch (status) {
      case ApplicationStatus.InProcessing:
        menu.push(
          <Menu.Item
            key="inProcessing"
            onClick={() => startProcessing(applicationId, onRefetch)}
          >
            {t("$views.buttons.inProcessing")}
          </Menu.Item>,
        );
        break;
      case ApplicationStatus.Deleted:
        menu.push(
          <Menu.Item
            key="delete"
            onClick={() => {
              setVisibleModal(true);
              setModalState({
                title: t("$views.modal.deleteTitle"),
                newStatus: ApplicationStatus.Deleted,
                query: DonationRequestFactory.apiDonationRequestIdStatusPatch,
              });
            }}
          >
            {t("$views.buttons.delete")}
          </Menu.Item>,
        );
        break;
      case ApplicationStatus.Spam:
        menu.push(
          <Menu.Item
            key="spam"
            onClick={() => {
              setVisibleModal(true);
              setModalState({
                title: t("$views.modal.spamTitle"),
                query: DonationRequestFactory.apiDonationRequestIdStatusPatch,
                newStatus: ApplicationStatus.Spam,
              });
            }}
          >
            {t("$views.buttons.spam")}
          </Menu.Item>,
        );
        break;
      case ApplicationStatus.New:
        menu.push(
          <Menu.Item
            key="stopProcessing"
            onClick={() => stopProcessing(applicationId, onRefetch)}
          >
            {currentStatus === ApplicationStatus.Spam
              ? t("$views.buttons.returnFromSpam")
              : t("$views.buttons.stopProcessing")}
          </Menu.Item>,
        );
        break;
      case ApplicationStatus.NeedsImprovement:
        menu.push(
          <Menu.Item
            key="request_changes"
            onClick={() => {
              setVisibleModal(true);
              setModalState({
                newStatus: ApplicationStatus.NeedsImprovement,
                query: DonationRequestFactory.apiDonationRequestIdStatusPatch,
                title: t("$views.modal.requestChangesTitle"),
              });
            }}
          >
            {t("$views.buttons.request_changes")}
          </Menu.Item>,
        );
        break;
      case ApplicationStatus.Refused:
        menu.push(
          <Menu.Item
            key="refuse"
            onClick={() => {
              setVisibleModal(true);
              setModalState({
                title: t("$views.modal.refuse"),
                query: DonationRequestFactory.apiDonationRequestIdStatusPatch,
                newStatus: ApplicationStatus.Refused,
              });
            }}
          >
            {t("$views.buttons.refuse")}
          </Menu.Item>,
        );
        break;
      case ApplicationStatus.SuperManagerConfirmation:
        menu.push(
          <Menu.Item
            key="require_confirmation"
            onClick={() =>
              requireConfirmation(
                applicationId,
                onRefetch,
                ApplicationStatus.SuperManagerConfirmation,
              )
            }
          >
            {currentStatus === ApplicationStatus.SuperManagerConfirmation
              ? t("$views.buttons.activate")
              : t("$views.buttons.require_confirmation")}
          </Menu.Item>,
        );
        break;
      case ApplicationStatus.UserConfirmation:
        menu.push(
          <Menu.Item
            key="require_confirmation2"
            onClick={() =>
              requireConfirmation(
                applicationId,
                onRefetch,
                ApplicationStatus.UserConfirmation,
              )
            }
          >
            {currentStatus === ApplicationStatus.SuperManagerConfirmation
              ? t("$views.buttons.activate")
              : t("$views.buttons.require_confirmation")}
          </Menu.Item>,
        );
        break;
      default:
        break;
    }
  }

  return (
    <>
      {menu.length !== 0 && (
        <Dropdown.Button overlay={<Menu>{menu}</Menu>}>
          {t("$views.buttons.actions.title")}
        </Dropdown.Button>
      )}

      <ModalWithMessage
        title={modalState?.title ?? ""}
        isVisible={visibleModal}
        onRefetch={props.onRefetch}
        newStatus={
          (modalState?.newStatus as unknown) as DonationRequestBodyStatusEnum
        }
        query={
          modalState?.query ??
          DonationRequestFactory.apiDonationRequestIdStatusPatch
        }
        applicationId={props.applicationId}
        onClose={() => setVisibleModal(false)}
      />
    </>
  );
};

export default ActionButtons;
