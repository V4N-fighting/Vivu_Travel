import React from "react";
import styled from "styled-components";
import CollapseComponent from "../Collapse";

type RangeInputFilterProps = {
  label: string;
  unit: string;
  setMin: (val: string ) => void;
  setMax: (val: string ) => void;
  onApply?: () => void;
};

const RangeInputFilter: React.FC<RangeInputFilterProps> = ({
  label,
  unit,
  setMin,
  setMax,
  onApply,
}) => {
  return (
    <CollapseComponent label={label}>
      <InputContainer>
        <InputWrapper>
          <Unit>{unit}</Unit>
          <Input
            onChange={(e) => setMin(e.target.value)}
            placeholder="Từ"
          />
        </InputWrapper>
        <Separator>-</Separator>
        <InputWrapper>
          <Unit>{unit}</Unit>
          <Input
            onChange={(e) => setMax(e.target.value)}
            placeholder="Đến"
          />
        </InputWrapper>
      </InputContainer>
      {onApply && <ApplyButton onClick={onApply}>ÁP DỤNG</ApplyButton>}
    </CollapseComponent>
  );
};

export default RangeInputFilter;

// Styled components
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Unit = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #888;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 20px 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #ff5722;
  }
`;

const Separator = styled.div`
  margin: 0 10px;
  font-size: 16px;
  color: #888;
`;

const ApplyButton = styled.button`
  background-color: #ff5722;
  width: 100%;
  color: #fff;
  padding: 10px 0;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e64a19;
  }

  &:active {
    background-color: #d84315;
  }
`;
