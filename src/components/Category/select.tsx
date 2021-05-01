import React, { FC } from "react";
import { Select } from "antd";
import { CategoryAdminCategory } from "@generated";
import { formatCategory } from "@lib/utils";
import { useTranslation } from "@providers";

const SelectCategory: FC<{
  lang: string;
  categories: CategoryAdminCategory[];
}> = (props) => {
  const { lang, categories } = props;

  const { t } = useTranslation("Users");

  return (
    <Select
      {...props}
      mode="multiple"
      showSearch
      optionFilterProp="children"
      placeholder={t("$views.register.categories_placeholder")}
      filterOption={(input, option) => {
        return (
          (option?.children?.toString() ?? "")
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        );
      }}
    >
      {categories?.map((category) => {
        return (
          <Select.Option value={category.id} key={category.id}>
            {formatCategory(lang, category)}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default SelectCategory;
