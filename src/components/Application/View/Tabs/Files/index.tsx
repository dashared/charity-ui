import React, { FC } from "react";
import { Space } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import RegistryTable from "@lib/components/RegistryTable";
import { useListSelection } from "@lib/hooks";

type File = {
  fileName: string;
};

const FilesTab: FC<{ files: string[] }> = ({ files }) => {
  const {
    isTarget,
    isSelected,
    onElementClick,
    // setList,
  } = useListSelection<File>();

  const columns = [
    {
      key: "file",
      render(record: File) {
        return record.fileName;
      },
    },
    {
      key: "downloadDate",
      name: "",
      render() {
        return "2019-04-24 18:00:00";
      },
    },
    {
      key: "",
      name: "actions",
      render() {
        return (
          <Space>
            <DownloadOutlined></DownloadOutlined>
          </Space>
        );
      },
    },
  ];

  return (
    <RegistryTable
      entity="Application"
      columns={columns}
      rows={files.map((f) => {
        return { fileName: f };
      })} // TODO
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

export default FilesTab;
