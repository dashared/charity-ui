import { DonationRequestFactory } from "@providers/axios";

import { ApplicationStatus } from "../../Status/tag";

export const stopProcessing = async (
  id: number,
  onRefetch: () => Promise<void>,
): Promise<void> => {
  try {
    await DonationRequestFactory.apiDonationRequestIdStatusDelete(id);
  } catch (e) {
    console.log(e);
  } finally {
    onRefetch();
  }
};

export const startProcessing = async (
  id: number,
  onRefetch: () => Promise<void>,
): Promise<void> => {
  try {
    const input = {
      status: ApplicationStatus.InProcessing,
      role: "Manager",
    };
    await DonationRequestFactory.apiDonationRequestIdStatusPatch(id, input);
  } catch (e) {
    console.log(e);
  } finally {
    onRefetch();
  }
};
