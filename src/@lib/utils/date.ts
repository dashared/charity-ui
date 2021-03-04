import * as DateFn from "date-fns";
import { ru } from "date-fns/locale";

import { NO_DATA_PLACEHOLDER } from "./meta";

export type UnixTime = string;

type DateInput = {
  year?: number | null;
  month?: number | null;
  day?: number | null;
};

type TimeInput = {
  hour: number;
  minute: number;
  second: number;
};

export type ApiDateTime = {
  date: DateInput;
  time?: TimeInput | null;
};

/**
 * Names are picked from luxon
 */
export enum DateTimeFormat {
  DATE_SHORT = "dd.MM.yyyy",
  DATE_MED = "dd MMM yyyy",
  DATE_MED_WITH_WEEKDAY = "EE, dd MMM yyyy",
  DATE_FULL = "dd MMMM yyyy",
  DATE_HUGE = "EEEE, dd MMMM yyyy",
  TIME_SIMPLE = "p",
  TIME_WITH_SECONDS = "pp",
  TIME_WITH_SHORT_OFFSET = "ppp",
  TIME_WITH_LONG_OFFSET = "pppp",
  TIME_24_SIMPLE = "HH:mm",
  TIME_24_WITH_SECONDS = "HH:mm:ss",
  TIME_24_WITH_SHORT_OFFSET = "HH:mm:ss O",
  TIME_24_WITH_LONG_OFFSET = "HH:mm:ss OOOO",
  DATETIME_SHORT = "dd.MM.yyyy HH:mm",
  DATETIME_MED = "dd MMM yyyy HH:mm",
  DATETIME_FULL = "dd MMMM yyyy HH:mm",
  DATETIME_HUGE = "EEEE, dd MMMM yyyy HH:mm OOOO",
  DATETIME_SHORT_WITH_SECONDS = "dd.MM.yyyy HH:mm:ss",
  DATETIME_MED_WITH_SECONDS = "dd MMM yyyy HH:mm:ss",
  DATETIME_FULL_WITH_SECONDS = "dd MMMM yyyy HH:mm:ss",
  DATETIME_HUGE_WITH_SECONDS = "dd MMMM yyyy OOOO",
}

export function noNull<T>(value: T | null | undefined): T | undefined {
  if (value === null) {
    return undefined;
  }

  return value;
}

export function dateFromApi(
  source: DeepPartial<ApiDateTime> | null | undefined,
): Date | null {
  if (!source) {
    return null;
  }

  return DateFn.set(new Date(), {
    year: noNull(source.date?.year),
    month: noNull(source.date?.month),
    date: noNull(source.date?.day),
    hours: noNull(source.time?.hour),
    minutes: noNull(source.time?.minute),
    seconds: noNull(source.time?.second),
  });
}

export function dateToApi(source: Date | null): ApiDateTime | null {
  if (!source) {
    return null;
  }

  return {
    date: {
      year: DateFn.getYear(source),
      month: DateFn.getMonth(source),
      day: DateFn.getDate(source),
    },
    time: {
      hour: DateFn.getHours(source),
      minute: DateFn.getMinutes(source),
      second: DateFn.getSeconds(source),
    },
  };
}

export function format(
  apiValue: UnixTime | null | undefined,
  display: DateTimeFormat | string = DateTimeFormat.DATETIME_SHORT,
): string {
  if (!apiValue) {
    return NO_DATA_PLACEHOLDER;
  }

  const d = new Date(apiValue);

  return DateFn.format(d, display, { locale: ru });
}

export function formatDateTime(apiValue: DeepPartial<ApiDateTime>): string {
  const dt = dateFromApi(apiValue);

  if (!dt) {
    return NO_DATA_PLACEHOLDER;
  }

  return DateFn.format(
    dt,
    apiValue.time ? DateTimeFormat.DATETIME_FULL : DateTimeFormat.DATE_FULL,
    { locale: ru },
  );
}

type UntilProgress = {
  days: number;
  percentage: number;
};

export function daysLeft(
  started?: string,
  until?: string,
): UntilProgress | undefined {
  if (!until || !started) {
    return undefined;
  }

  const startDate = new Date(started);
  const untilDate = new Date(until);
  const currentDate = new Date();

  if (untilDate < currentDate) {
    return {
      days: 0,
      percentage: 100,
    };
  }

  const diff = Math.abs(untilDate.getTime() - currentDate.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

  const totalDiff = Math.abs(untilDate.getTime() - startDate.getTime());
  const diffTotalDays = Math.ceil(totalDiff / (1000 * 3600 * 24));

  return {
    days: diffDays,
    percentage: (diffDays / diffTotalDays) * 100,
  };
}
