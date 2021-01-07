import React, { FC } from "react";
import { Menu } from "antd";
import { FolderOpenOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "@curi/react-dom";

import { buildUseMenuKeys, entryToKey, MenuEntry } from "./utils";

import styles from "./layout.module.less";

const LeftBarConf: Array<MenuEntry> = [
  {
    display: (
      <>
        <FolderOpenOutlined />
        <span>Заявки</span>
      </>
    ),
    name: "applications:index",
  },

  {
    display: (
      <>
        <SettingOutlined />
        <span>Настройки</span>
      </>
    ),
    name: "settings:index",
  },
];

const MenuLink: FC<MenuEntry> = ({ name, params, display, ...rest }) => (
  <Menu.Item {...rest}>
    {!name ? (
      display
    ) : (
      <Link name={name} params={params}>
        {display}
      </Link>
    )}
  </Menu.Item>
);

// rest should be passed down to subitems because antd-menu requires it
const MenuItem: FC<{ entry: MenuEntry }> = ({ entry, ...rest }) => {
  const { display, nested } = entry;
  const key = entryToKey(entry);

  if (!nested || nested.length === 0) {
    return <MenuLink key={key} {...entry} {...rest} />;
  }

  const title = <span className="submenu-title-wrapper">{display}</span>;

  return (
    <Menu.SubMenu {...rest} key={key} title={title}>
      {nested.map((subentry) => (
        <MenuLink key={entryToKey(subentry)} {...subentry} />
      ))}
    </Menu.SubMenu>
  );
};

const useMenuKeys = buildUseMenuKeys(LeftBarConf);

const LeftBar: FC = () => {
  const menuKeys = useMenuKeys();

  const inner = LeftBarConf.map((entry) => (
    <MenuItem key={entryToKey(entry)} entry={entry} />
  ));

  return (
    <Menu mode="inline" className={styles.menu} {...menuKeys}>
      {inner}
    </Menu>
  );
};

export default LeftBar;
