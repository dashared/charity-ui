import React, { FC, RefObject } from "react";
import Editor from "react-markdown-editor-lite";
import { Card } from "antd";
import RoleSwitch from "@lib/components/RoleSwitch";
import { Role } from "@providers/rbac-rules";

import FAQEditor from "./Editor";
import FAQView from "./View";

import styles from "./styles.module.less";

const FAQ: FC<{
  role: Role;
  text: string;
  editorRef?: RefObject<Editor>;
}> = ({ role, text, editorRef }) => {
  return (
    <Card className={styles.card}>
      <RoleSwitch
        role={role}
        perform="faq:edit"
        yes={() => <FAQEditor editorRef={editorRef} initialValue={text} />}
        no={() => <FAQView text={text} />}
      />
    </Card>
  );
};

export default FAQ;
