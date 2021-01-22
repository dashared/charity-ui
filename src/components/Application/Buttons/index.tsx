import React, { FC } from "react";
import { Space } from "antd";
import { DonationRequestBodyAvailableStatusesEnum as ApplicationStatus } from "@generated";

import { StartProcessingButton } from "./Processing/Start";
import { StopProcessingButton } from "./Processing/Stop";
import { DeleteButton } from "./Delete";
// import { ReturnFromSpamButton } from "./Spam/Cancel";
import { RefuseButton } from "./Refuse";
import { RequestChangesButton } from "./RequestChanges";
import { RequireConfirmationButton } from "./RequireConfirmation";
import { SpamButton } from "./Spam";

export { StartProcessingButton } from "./Processing/Start";
export { StopProcessingButton } from "./Processing/Stop";

export { RequestChangesButton } from "./RequestChanges";

export { SpamButton } from "./Spam";
export { ReturnFromSpamButton } from "./Spam/Cancel";

export { DeleteButton } from "./Delete";

export { RequireConfirmationButton } from "./RequireConfirmation";

export { RefuseButton } from "./Refuse";

type ApplicationButtonsProps = {
  applicationId: number;
  availiableStatuses: ApplicationStatus[];
  onRefetch: () => Promise<void>;
};

const ActionButtons: FC<ApplicationButtonsProps> = (props) => {
  const buttons = [];

  for (const ind in props.availiableStatuses) {
    const status = props.availiableStatuses[ind];

    switch (status) {
      case ApplicationStatus.InProcessing:
        buttons.push(
          <StartProcessingButton key="StartProcessingButton" {...props} />,
        );
        break;
      case ApplicationStatus.Deleted:
        console.log("f");
        buttons.push(<DeleteButton key="DeleteButton" {...props} />);
        break;
      case ApplicationStatus.Spam:
        buttons.push(<SpamButton key="SpamButton" {...props} />);
        break;
      case ApplicationStatus.New:
        buttons.push(
          <StopProcessingButton key="StopProcessingButton" {...props} />,
        );
        break;
      case ApplicationStatus.NeedsImprovement:
        buttons.push(
          <RequestChangesButton key="RequestChangesButton" {...props} />,
        );
        break;
      case ApplicationStatus.Refused:
        buttons.push(<RefuseButton key="RefuseButton" {...props} />);
        break;
      case ApplicationStatus.SuperManagerConfirmation:
        buttons.push(
          <RequireConfirmationButton
            key="RequireConfirmationButton"
            {...props}
            status={ApplicationStatus.SuperManagerConfirmation}
          />,
        );
        break;
      case ApplicationStatus.Active:
        buttons.push(
          <RequireConfirmationButton
            key="RequireConfirmationButton1"
            {...props}
            status={ApplicationStatus.Active}
          />,
        );
        break;
      default:
        break;
    }
  }

  return <Space>{buttons}</Space>;
};

export default ActionButtons;
