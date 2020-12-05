import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";

import styles from "./notification.module.less";

notification.config({
  placement: "bottomLeft",
});

type NotificationLevel = "success" | "info" | "error" | "warning";

type NotificationParams = Omit<ArgsProps, "message" | "placement">;

export function notify(
  message: string,
  level: NotificationLevel = "info",
  params: NotificationParams = {},
): void {
  switch (level) {
    case "error":
      return notification.error({
        message,
        className: styles.error,
        ...params,
      });
    case "success":
      return notification.success({
        message,
        className: styles.success,
        ...params,
      });
    case "warning":
      return notification.warning({
        message,
        className: styles.warning,
        ...params,
      });
    case "info":
      return notification.info({
        message,
        className: styles.info,
        ...params,
      });
  }
}
