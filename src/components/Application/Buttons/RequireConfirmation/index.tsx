import { DonationRequestBodyAvailableStatusesEnum as ApplicationStatus } from "@generated";
import { DonationRequestFactory } from "@providers/axios";

export const requireConfirmation = async (
  id: number,
  onRefetch: () => Promise<void>,
  status: ApplicationStatus,
): Promise<void> => {
  try {
    // const newStatus =
    //   status === ApplicationStatus.SuperManagerConfirmation
    //     ? ApplicationStatus.Active
    //     : ApplicationStatus.SuperManagerConfirmation;

    await DonationRequestFactory.apiDonationRequestIdStatusPatch(id, {
      status,
    });
  } catch (e) {
    console.log(e);
  } finally {
    onRefetch();
  }
};
