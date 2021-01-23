import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Input, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./styles.module.less";

const { Option } = Select;

const RelationshipSelect: FC = () => {
  let index = 0;

  const { t } = useTranslation("Relationship");

  const [state, setState] = useState({
    items: [t("parent"), t("grandparent"), t("relative"), t("friend")],
    name: "",
  });

  const addItem = (): void => {
    console.log("addItem");
    const { items, name } = state;
    setState({
      items: [...items, name || `New item ${index++}`],
      name: "",
    });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      name: event.target.value,
    });
  };

  return (
    <Select
      placeholder={t("placeholder")}
      dropdownRender={(menu) => (
        <div>
          {menu}
          <Divider className={styles.divider} />
          <div className={styles.add}>
            <Input className={styles.input} onChange={onNameChange} />
            <a style={{}} onClick={addItem}>
              <PlusOutlined />
              {t("addRelationship")}
            </a>
          </div>
        </div>
      )}
    >
      {state.items.map((item) => (
        <Option key={item} value={item}>
          {item}
        </Option>
      ))}
    </Select>
  );
};

export default RelationshipSelect;
