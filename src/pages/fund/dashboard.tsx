import React, { FC, useCallback, useEffect, useState } from "react";
import { drop } from "lodash";
import { Card, Typography } from "antd";
import { Bar, Line, Pie } from "@ant-design/charts";
import { useTranslation, Workspace } from "@providers";
import useAxios, {
  AnalyticsFactory,
  CharityFactory,
  DonationRequestFactory,
  UserApiRole,
  UserRequestFactory,
} from "@providers/axios";

import { ApplicationStatus } from "components/Application/Status/tag";
import StatisticsCard from "components/Fund/Statistics";

type BarData = {
  title: string;
  count: number;
};

const LineStat: FC = () => {
  const { data } = useAxios(
    AnalyticsFactory.apiAnalyticsGetDonationsSumByMonthGet,
  );

  const config = {
    data: drop(data, 1).map((item) => {
      return {
        month: item.month,
        key: `${item.month} ${item.year}`,
        value: item.total,
      };
    }),
    xField: "month",
    yField: "value",
    //seriesField: 'key',
    //stepType: 'hvh',
    label: {},
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          shadowColor: "yellow",
          shadowBlur: 4,
          stroke: "transparent",
          fill: "red",
        },
      },
    },
    theme: {
      geometries: {
        point: {
          diamond: {
            active: {
              style: {
                shadowColor: "#FCEBB9",
                shadowBlur: 2,
                stroke: "#F6BD16",
              },
            },
          },
        },
      },
    },
    interactions: [{ type: "marker-active" }],
  };
  return <Line {...config} />;
};

const CategoryStat: FC = () => {
  const { data } = useAxios(
    AnalyticsFactory.apiAnalyticsGetTopCategoriesCountGet,
  );

  const config = {
    data: (data ?? []).map((item) => {
      return {
        type: item.category_id,
        value: item.count,
      };
    }),
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [{ type: "pie-legend-active" }, { type: "element-active" }],
  };

  return <Pie loading={data === undefined} {...config} />;
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

    const onRealizarion = await DonationRequestFactory.apiDonationRequestGet(
      0,
      1,
      "",
      undefined,
      undefined,
      [ApplicationStatus.OnRealization],
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
        title: t(`Status.${ApplicationStatus.OnRealization}`),
        count: onRealizarion?.data.page?.totalElements ?? 0,
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

  return (
    <Workspace title={t("title", { name: "Charity" })}>
      <StatisticsCard
        loading={
          staffLoading || applicationsLoading || usersLoading || balanceLoading
        }
        balance={balance}
        usersCount={users?.page?.totalElements}
        activeApplications={applications?.page?.totalElements}
        staffCount={staff?.page?.totalElements}
      />
      <Card style={{ marginTop: 5 }}>
        <CategoryStat />
      </Card>

      <Card style={{ marginTop: 5 }}>
        <ApplicationStat />
      </Card>

      <Card style={{ marginTop: 5 }}>
        <Typography.Title level={3}>
          {t("dontations_ny_month")}
        </Typography.Title>
        <LineStat />
      </Card>
    </Workspace>
  );
};

export const name = "fund:dashboard";

export default FundPage;
