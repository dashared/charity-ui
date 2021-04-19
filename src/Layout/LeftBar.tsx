import React, { FC } from "react";
import { Menu } from "antd";
import {
  AlignLeftOutlined,
  FolderOpenOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  ProfileOutlined,
  QuestionOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "@curi/react-dom";
import RoleSwitch from "@lib/components/RoleSwitch";
import { i18n } from "@providers";
import { AuthConsumer } from "@providers/authContext";

import { buildUseMenuKeys, entryToKey, MenuEntry, MenuKeys } from "./utils";

import styles from "./layout.module.less";

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

const useMenuKeys = (conf: Array<MenuEntry>): (() => MenuKeys) =>
  buildUseMenuKeys(conf);

const LeftBar: FC = () => {
  const LeftBarConf: Array<MenuEntry> = [
    {
      display: (
        <>
          <HomeOutlined />
          <span>{i18n.t("LeftBar.Fund")}</span>
        </>
      ),
      name: "fund:index",
    },
    {
      display: (
        <>
          <QuestionOutlined />
          <span>{i18n.t("LeftBar.Fund_nested.FAQ")}</span>
        </>
      ),
      name: "fund:faq-index",
    },
    {
      display: (
        <>
          <AlignLeftOutlined />
          <span>{i18n.t("LeftBar.News")}</span>
        </>
      ),
      name: "news:index",
    },
    {
      display: (
        <>
          <UnorderedListOutlined />
          <span>{i18n.t("LeftBar.Category")}</span>
        </>
      ),
      name: "categories:index",
    },
    {
      display: (
        <>
          <FolderOpenOutlined />
          <span>{i18n.t("LeftBar.Applications.title")}</span>
        </>
      ),
      name: "applications:index",
      nested: [
        {
          display: <span>{i18n.t("LeftBar.Applications.All")}</span>,
          name: "applications:index",
        },
        {
          display: <span>{i18n.t("LeftBar.Applications.Processing")}</span>,
          name: "applications:processing",
        },
        {
          display: <span>{i18n.t("LeftBar.Applications.Active")}</span>,
          name: "applications:active",
        },
      ],
    },

    {
      display: (
        <>
          <ProfileOutlined />
          <span>{i18n.t("LeftBar.Managers")}</span>
        </>
      ),
      name: "managers:index",
    },

    {
      display: (
        <>
          <MoneyCollectOutlined />
          <span>{i18n.t("LeftBar.Transactions")}</span>
        </>
      ),
      name: "transactions:index",
    },

    {
      display: (
        <>
          <UserOutlined />
          <span>{i18n.t("LeftBar.Users")}</span>
        </>
      ),
      name: "users:index",
    },

    // {
    //   display: (
    //     <>
    //       <HistoryOutlined />
    //       <span>{i18n.t("LeftBar.Logs")}</span>
    //     </>
    //   ),
    //   name: "logs:index",
    // },

    {
      display: (
        <>
          <SettingOutlined />
          <span>{i18n.t("LeftBar.Settings")}</span>
        </>
      ),
      name: "settings:index",
    },
  ];

  const menuKeys = useMenuKeys(LeftBarConf);

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
