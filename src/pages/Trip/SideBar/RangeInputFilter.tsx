import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import CollapseComponent from "../Collapse";
import { typeInput } from ".";



function formatToVietnameseCurrency(input: string): string {
  const num = parseFloat(input);
  if (isNaN(num)) return "";

  const parts = input.split(".");
  const million = parseInt(parts[0] || "0", 10);
  const decimalPart = parts[1] || "0";
  const thousand = Math.round(parseFloat("0." + decimalPart) * 1000);

  const millionPart = million > 0 ? `${million} triệu` : "";
  const thousandPart = thousand > 0 ? `${thousand} nghìn` : "";

  return [millionPart, thousandPart].filter(Boolean).join(" ") + " đồng";
}


type RangeInputFilterProps = {
  label: string;
  unit: number;
  setMin: (val: string ) => void;
  setMax: (val: string ) => void;
  onApply?: () => void;
  resetFilters: boolean;
  selected: [number, number] | undefined
};

const RangeInputFilter: React.FC<RangeInputFilterProps> = ({
  label,
  unit,
  setMin,
  setMax,
  onApply,
  resetFilters,
  selected
}) => {
  const [minVal, setMinVal] = useState('');
  const [maxVal, setMaxVal] = useState('');
  const [inputLabelMin, setInputLabelMin] = useState('');
  const [inputLabelMax, setInputLabelMax] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
     if (selected) {
      if (unit === typeInput.Price) {
        setInputLabelMin(JSON.stringify(selected[0] / 1_000_000) + ' triệu đồng')
        setInputLabelMax(JSON.stringify(selected[1] / 1_000_000) + ' triệu đồng')
      } else if (unit === typeInput.Time) {
        setInputLabelMin(JSON.stringify(selected[0]) + ' ngày')
        setInputLabelMax(JSON.stringify(selected[1]) + ' ngày')
      } else {
        setInputLabelMin('')
        setInputLabelMax('')
      }
      setMinVal(JSON.stringify(selected[0]))
      setMaxVal(JSON.stringify(selected[1]))
     }
  }, [selected]);

  useEffect(() => {
    
    setMin(minVal);
  }, [minVal]);

  useEffect(() => {
    setMax(maxVal);
  }, [maxVal]);


  //resetFilter
  useEffect(() => {
    if (resetFilters) {
      setMinVal('');
      setMaxVal('');
      setInputLabelMin('');
      setInputLabelMax('');
    }
  }, [resetFilters]);



  //handle input change
  const handleInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    setLabel: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value);

    if (unit === typeInput.Price) {
      setLabel(value ? formatToVietnameseCurrency(value) : '');
    } else if (unit === typeInput.Time) {
      setLabel(value ? value + ' ngày' : '');
    } else {
      setLabel('');
    }
  };



  //handle check valid key
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>, 
    value: string, 
    setLabel: React.Dispatch<React.SetStateAction<string>>
  ) => {

    const allowedKeys = [
      "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", ".", 
    ];
    
    const isNumber = /^[0-9]$/.test(e.key);

    if (!isNumber && !allowedKeys.includes(e.key) || e.key === "." && value.includes(".")) {
      setLabel('Vui lòng nhập số')
      e.preventDefault();
    }
  }

  const handleApplyButton = () => {
    setErrorMessage('Vui lòng nhập giá trị hợp lí')
    if (Number(minVal) < Number(maxVal)) {
      onApply && onApply() 
      setErrorMessage('')
    }
  }

  return (
    <CollapseComponent label={label}>
      <InputContainer>
        <Label>
          {inputLabelMin}
        </Label>
        <Label>
          {inputLabelMax}
        </Label>
      </InputContainer>
      <InputContainer>
        <InputWrapper>
          
          <Input
            value={minVal}
            onChange={(e) => handleInputChange(e.target.value, setMinVal, setInputLabelMin)}
            onKeyDown={(e) => handleKeyDown(e, minVal, setInputLabelMin)}
            placeholder="Từ"
          />
        </InputWrapper>
        <Separator>-</Separator>
        <InputWrapper>
          
          <Input
            value={maxVal}
            onChange={(e) => handleInputChange(e.target.value, setMaxVal, setInputLabelMax)}
            onKeyDown={(e) => handleKeyDown(e, maxVal, setInputLabelMax)}
            placeholder="Đến"
          />
        </InputWrapper>
      </InputContainer>
      <Label>{ errorMessage}</Label>
      <ApplyButton onClick={handleApplyButton}>ÁP DỤNG</ApplyButton>
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

const Label = styled.p`
  font-size: 14px;
  color: red;
  margin-bottom: 10px;
`

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
