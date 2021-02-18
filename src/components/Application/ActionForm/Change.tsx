import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { DonationRequestBodyAvailableStatusesEnum as ApplicationStatus } from "@generated";
import { notify } from "@lib/utils/notification";
import { useTranslation } from "@providers";
import { DonationRequestFactory } from "@providers/axios";

import ApplicationForm, {
  ApplicationFormHandler,
  ApplicationFormState,
} from "./form";

type ChangeApplicationFormProps = {
  id: number;
  availiableStatuses: ApplicationStatus[];
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

const ChangeApplicationForm: ForwardRefRenderFunction<
  ApplicationFormHandler,
  ChangeApplicationFormProps
> = ({ onSuccess, onError, id, availiableStatuses }, ref) => {
  const { t } = useTranslation("Application");

  const onSubmit = async (values: ApplicationFormState): Promise<void> => {
    try {
      DonationRequestFactory.apiDonationRequestIdStatusPatch(id, values).then(
        () => {
          notify(t("$views.updateStatus"), "success");

          onSuccess?.();
        },
      );
    } catch (e) {
      onError?.(e);
    }
  };

  return (
    <ApplicationForm
      ref={ref}
      onSubmit={onSubmit}
      availiableStatuses={availiableStatuses}
    />
  );
};

export default forwardRef(ChangeApplicationForm);
