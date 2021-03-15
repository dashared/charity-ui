import React, { FC, useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Row, Statistic } from "antd";
import { Bar } from "@ant-design/charts";
import { formatMoney } from "@lib/utils";
import { useTranslation, Workspace } from "@providers";
import useAxios, {
  CharityFactory,
  DonationRequestFactory,
  UserApiRole,
  UserRequestFactory,
} from "@providers/axios";

import { ApplicationStatus } from "components/Application/Status/tag";

type BarData = {
  title: string;
  count: number;
};

const ApplicationStat: FC = () => {
  const { t } = useTranslation("Application");

  const [data, setData] = useState<Array<BarData> | undefined>(undefined);

  const getBarDataFromAPI = useCallback(async (): Promise<void> => {
    const neW = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.New],
    );

    const inProcessing = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.InProcessing],
    );

    const imp = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.NeedsImprovement],
    );

    const uconf = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.UserConfirmation],
    );

    const sconf = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.SuperManagerConfirmation],
    );

    const active = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.Active],
    );

    const deleted = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.Deleted],
    );

    const spam = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.Spam],
    );

    const archieved = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.Archived],
    );

    setData([
      {
        title: t(`Status.${ApplicationStatus.New}`),
        count: neW?.data.page?.totalElements ?? 0,
      },
      {
        title: t(`Status.${ApplicationStatus.InProcessing}`),
        count: inProcessing?.data.page?.totalElements ?? 0,
      },
      {
        title: t(`Status.${ApplicationStatus.NeedsImprovement}`),
        count: imp?.data.page?.totalElements ?? 0,
      },
      {
        title: t(`Status.${ApplicationStatus.UserConfirmation}`),
        count: uconf?.data.page?.totalElements ?? 0,
      },
      {
        title: t(`Status.${ApplicationStatus.SuperManagerConfirmation}`),
        count: sconf?.data.page?.totalElements ?? 0,
      },
      {
        title: t(`Status.${ApplicationStatus.Active}`),
        count: active?.data.page?.totalElements ?? 0,
      },
      {
        title: t(`Status.${ApplicationStatus.Deleted}`),
        count: deleted?.data.page?.totalElements ?? 0,
      },
      {
        title: t(`Status.${ApplicationStatus.Spam}`),
        count: spam?.data.page?.totalElements ?? 0,
      },
      {
        title: t(`Status.${ApplicationStatus.Archived}`),
        count: archieved?.data.page?.totalElements ?? 0,
      },
    ]);
  }, [t]);

  useEffect(
    () => {
      if (!data) {
        getBarDataFromAPI();
      }
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <Bar
      loading={data ? false : true}
      {...{
        data: data ?? [],
        xField: "count",
        yField: "title",
        seriesField: "title",
      }}
    />
  );
};

const FundPage: FC = () => {
  const { t } = useTranslation("Fund");

  const { data: balance, loading: balanceLoading } = useAxios(
    CharityFactory.apiCharityBalanceGet,
    false,
  );
  const {
    data: staff,
    loading: staffLoading,
  } = useAxios(UserRequestFactory.apiUserGet, false, 0, 1, "", [
    UserApiRole.Admin,
    UserApiRole.Manager,
    UserApiRole.SuperManager,
    UserApiRole.Operator,
    UserApiRole.ContentManager,
  ]);

  const {
    data: users,
    loading: usersLoading,
  } = useAxios(UserRequestFactory.apiUserGet, false, 0, 1, "", [
    UserApiRole.User,
  ]);

  const {
    data: applications,
    loading: applicationsLoading,
  } = useAxios(
    DonationRequestFactory.apiDonationRequestGet,
    false,
    0,
    1,
    "",
    undefined,
    undefined,
    [ApplicationStatus.Active],
  );

  const staffLabel = t("staff_title", {
    count: staff?.page?.totalElements ?? 0,
  });
  const usersLabel = t("staff_title", {
    count: users?.page?.totalElements ?? 0,
  });
  const applicationsLabel = t("applications", {
    count: applications?.page?.totalElements ?? 0,
  });

  return (
    <Workspace title={t("title", { name: "Charity" })}>
      <Card>
        <Row>
          <Col span={12}>
            <Statistic
              title={t("active_users")}
              value={usersLabel}
              loading={usersLoading}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title={t("active_applications")}
              value={applicationsLabel}
              loading={applicationsLoading}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 32 }}>
          <Col span={12}>
            <Statistic
              title={t("staff")}
              value={staffLabel}
              loading={staffLoading}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title={t("balance")}
              loading={balanceLoading}
              value={formatMoney(balance)}
              precision={2}
            />
            <Button style={{ marginTop: 16 }} type="primary">
              {t("top_up")}
            </Button>
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: 5 }}>
        <ApplicationStat />
      </Card>
    </Workspace>
  );
};

export const name = "fund:index";

export default FundPage;
