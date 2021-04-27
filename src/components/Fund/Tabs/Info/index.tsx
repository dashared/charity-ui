import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Avatar, Col, Divider, Input, Row, Upload } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import {
  LoadingOutlined,
  PlusOutlined,
  ProfileFilled,
} from "@ant-design/icons";
import RoleSwitch from "@lib/components/RoleSwitch";
import { Role } from "@providers/rbac-rules";

import styles from "./styles.module.less";

type RefType = {
  onSave: () => Promise<void>;
};

type PropsType = {
  role: Role;
  editable: boolean;
};

export const InfoTab = React.forwardRef<RefType, PropsType>((props, ref) => {
  const { editable, role } = props;

  const [uploadLoading, setLoading] = useState(false);

  const [text, setText] = useState(
    "Фонд (англ. Foundation; фр. fond от лат. fundus — основание) — некоммерческая организация, учреждённая гражданами и(или) юридическими лицами на основе добровольных имущественных взносов, преследующая благотворительные, культурные, образовательные или иные социальные, общественно полезные цели.",
  );

  const [refetch, setRefetch] = useState<boolean | undefined>(undefined);

  const { t } = useTranslation("Fund");

  const onInfoUpdate = useCallback(async () => {
    console.log(text);
  }, [text]);

  useEffect(() => {
    if (ref !== null) {
      (ref as MutableRefObject<RefType>).current = {
        onSave: async () => {
          await onInfoUpdate();
          setRefetch(!refetch);
        },
      };
    }
    // eslint-disable-next-line
  }, [ref, setRefetch, refetch]);

  const uploadButton = (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // eslint-disable-next-line
  const handleChange = (info: UploadChangeParam<UploadFile<any>>): void => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
  };

  return (
    <Row justify="space-around" align="top">
      <Col>
        <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!editable && (
            <Avatar
              size={100}
              icon={<ProfileFilled />}
              className={styles.avatar}
            />
          )}

          {editable && (
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
          )}
        </div>
      </Col>

      <Col span={20}>
        <Row justify="space-between" align="middle">
          <Col>
            <h3>{t("description")}</h3>
          </Col>
          <RoleSwitch
            role={role}
            perform="fund:description-edit"
            yes={() => (
              <Col>
                <span className={styles.extra}>
                  Обновлено 10.01.2021 в 11:33, Андреем
                </span>
              </Col>
            )}
          />
        </Row>
        <Row>
          {!editable && text}

          {editable && (
            <Input.TextArea
              autoSize={true}
              defaultValue={text}
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </Row>

        <Divider />
        <Row>
          <Col>
            <h3>{t("contacts")}</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <span>+ 7(4852) 21-33-59</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
});

InfoTab.displayName = "InfoTab";
