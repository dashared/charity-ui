import React, { FC } from "react";
import { Menu } from "antd";
import {
  FolderOpenOutlined,
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import RoleSwitch from "@lib/components/RoleSwitch";
import { AuthConsumer } from "@providers/authContext";

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
        <HomeOutlined />
        <span>Фонд</span>
      </>
    ),
    name: "fund:index",
    nested: [
      {
        display: <span>Описание</span>,
        name: "fund:description-index",
      },
      {
        display: <span>FAQ</span>,
        name: "faq:index",
      },
    ],
  },

  {
    display: (
      <>
        <UserOutlined />
        <span>Пользователи</span>
      </>
    ),
    name: "users:index",
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
  return (
    <AuthConsumer>
      {({ user }) => {
        const { display, nested } = entry;
        const key = entryToKey(entry);

        if (!nested || nested.length === 0) {
          return (
            <RoleSwitch
              role={user.role}
              perform={entry.name ?? ""}
              yes={() => <MenuLink key={key} {...entry} {...rest} />}
            />
          );
        }

        const title = <span className="submenu-title-wrapper">{display}</span>;

        return (
          <RoleSwitch
            role={user.role}
            perform={entry.name ?? ""}
            yes={() => (
              <Menu.SubMenu {...rest} key={key} title={title}>
                {nested.map((subentry) => (
                  <MenuLink key={entryToKey(subentry)} {...subentry} />
                ))}
              </Menu.SubMenu>
            )}
          />
        );
      }}
    </AuthConsumer>
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
