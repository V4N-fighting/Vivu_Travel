import React, { FC } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { IconBaseProps } from '@ant-design/icons/lib/components/Icon';

interface PurifyItemProps {
  width: string,
  Icon: FC<IconBaseProps>,
  placeholder: string,
  optionsValue: object[],
}



const PurifyItem: React.FC<PurifyItemProps> = ({width, Icon, placeholder, optionsValue}) => (
  
  <NewSelect
    size="large"
    width={width}
    showSearch
    placeholder={<PlaceholderWithIcon Icon={Icon} placeholder={placeholder}/>}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={optionsValue}
  />
  

);

const NewSelect = styled(Select)<{ width: string }>`
  width: ${props => props.width};

  .ant-select-selector {
    padding: 4px 11px; /* Điều chỉnh padding theo ý muốn */
    border: 2px solid red; /* Thay đổi border */
    border-radius: 4px; /* Thay đổi border radius nếu cần */
  }

  .ant-select-selection-search-input {
    padding: 10px; /* Tùy chỉnh padding của input bên trong */
  }
`;



interface PlaceholderWithIconProps {
  Icon: FC<IconBaseProps>; // Kiểu dữ liệu cho một React component
  placeholder: string;
}

const PlaceholderWithIcon: FC<PlaceholderWithIconProps> = ({ Icon, placeholder }) => (
  <span>
    <Icon style={{ marginRight: '5px' }} />
    {placeholder}
  </span>
);
 

export default PurifyItem;