import React from "react";
import { Select } from "antd";
import styled from "styled-components";

interface PurifyItemProps {
  width: string;
  Icon: JSX.Element;
  placeholder: string;
  optionsValue:
    | { value: number; label: string }[]
    | { label: string; min: number; max?: number }[]
    | undefined;
  onChange: (value: any) => void;
}

const PurifyItem: React.FC<PurifyItemProps> = ({
  width,
  Icon,
  placeholder,
  optionsValue,
  onChange,
}) => {
  // type guard (bộ kiểm tra kiểu) dùng để kiểm tra xem một giá trị có phải là một kiểu cụ thể hay không
  const isRangeOption = (opt: any): opt is {label: any; min: number; max?: number } =>
      "min" in opt;

  const displayOptions =
    optionsValue?.map((item: any) =>
      isRangeOption(item)
        ? {
            label: item.label,
            value: JSON.stringify({ min: item.min, max: item.max }),
          }
        : item
    ) ?? [];

  return (
    <NewSelect
      size="large"
      width={width}
      showSearch
      placeholder={<PlaceholderWithIcon Icon={Icon} placeholder={placeholder} />}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      options={displayOptions}
      onChange={(value) => {
        try {
          const parsed = JSON.parse(value as string);

          if ("min" in parsed) {
            onChange(parsed);
          } else {
            onChange(Number(value));
          }
        } catch {
          onChange(Number(value));
        }
      }}
    />
  );
};

const NewSelect = styled(Select)<{ width: string }>`
  width: ${(props) => props.width};

  .ant-select-selector {
    padding: 4px 11px;
    border: 2px solid red;
    border-radius: 4px;
  }

  .ant-select-selection-search-input {
    padding: 10px;
  }
`;

interface PlaceholderWithIconProps {
  Icon: JSX.Element;
  placeholder: string;
}

const PlaceholderWithIcon: React.FC<PlaceholderWithIconProps> = ({
  Icon,
  placeholder,
}) => (
  <span>
    {Icon} {placeholder}
  </span>
);

export default PurifyItem;
