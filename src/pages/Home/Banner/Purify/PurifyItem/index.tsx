import React, { FC, ReactNode } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';

interface PurifyItemProps {
  width: string;
  Icon: JSX.Element; 
  placeholder: string;
  optionsValue: { value: number; label: string }[];
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
  Icon: JSX.Element; 
  placeholder: string;
}


const PlaceholderWithIcon: FC<PlaceholderWithIconProps> = ({ Icon, placeholder }) => (
  <span>
    {Icon} 
    {placeholder}
  </span>
);

 

export default PurifyItem;