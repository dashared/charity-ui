import React, { FC } from "react";
import { Space } from "antd";

import { ApplicationStatus } from "components/Application/Status/tag";

import { StartProcessingButton } from "./Processing/Start";
import { StopProcessingButton } from "./Processing/Stop";
import { ReturnFromSpamButton } from "./Spam/Cancel";
import { RefuseButton } from "./Refuse";
import { RequestChangesButton } from "./RequestChanges";
import { RequireConfirmationButton } from "./RequireConfirmation";
import { SpamButton } from "./Spam";

export { StartProcessingButton } from "./Processing/Start";
export { StopProcessingButton } from "./Processing/Stop";

export { RequestChangesButton } from "./RequestChanges";

export { SpamButton } from "./Spam";
export { ReturnFromSpamButton } from "./Spam/Cancel";

export { RequireConfirmationButton } from "./RequireConfirmation";

export { RefuseButton } from "./Refuse";

type ApplicationButtonsProps = {
  applicationId: number;
  status: ApplicationStatus;
  onRefetch: () => Promise<void>;
};

const ActionButtons: FC<ApplicationButtonsProps> = (props) => {
  return (
    <Space>
      <SpamButton {...props} />
      <ReturnFromSpamButton {...props} />
      <StopProcessingButton {...props} />
      <RequestChangesButton {...props} />
      <StartProcessingButton {...props} />
      <RefuseButton {...props} />
      <RequireConfirmationButton {...props} />
    </Space>
  );
};

export default ActionButtons;
