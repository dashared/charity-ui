import React, { FC } from "react";
import { Card } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { useTranslation, Workspace } from "@providers";
import { Role } from "@providers/rbac-rules";

import FAQEditor from "./Editor";
import FAQView from "./View";

const FAQ: FC<{
  role: Role;
  text: string;
}> = ({ role, text }) => {
  const { t } = useTranslation("FAQ");

  return (
    <Workspace noRefresh title={t("title")}>
      <Card>
        <RoleSwitch
          role={role}
          perform="faq:edit"
          yes={() => <FAQEditor />}
          no={() => <FAQView text={text} />}
        />
      </Card>
    </Workspace>
  );
};

export default FAQ;
