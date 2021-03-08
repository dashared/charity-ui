import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { FileInfo as Single } from "@generated";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";
import { formatDate } from "@lib/utils";

export const FilesTab: FC<{ files: Single[] }> = ({ files }) => {
  const { t } = useTranslation("Application");

  const {
    isTarget,
    isSelected,
    onElementClick,
    // setList,
  } = useListSelection<File>();

  const columns = [
    {
      key: "file",
      render(record: Single) {
        return `${record.title}${
          record.mime_type ? `.${record.mime_type}` : ""
        }`;
      },
    },
    {
      key: "uploadDate",
      width: "20%",
      render(record: Single) {
        return formatDate(record.created_at);
      },
    },
    {
      key: "",
      name: "actions",
      width: "10%",
      render(record: Single) {
        return (
          <Button
            type="link"
            icon={<DownloadOutlined />}
            target="_blank"
            href={`${process.env.REACT_APP_API_URL}/api/file/${record.id}/download`}
          >
            {t("$views.download")}
          </Button>
        );
      },
    },
  ];

  return (
    <RegistryTable
      entity="Application"
      columns={columns}
      // eslint-disable-next-line
      rows={files as Record<string, any>[]} // TODO
      rowState={(record, index) => ({
        selected: isSelected(index),
        target: isTarget(index),
      })}
      onRecordClick={(event, record, index) => {
        if (index !== undefined) {
          onElementClick(event, index);
        }
      }}
    />
  );
};
