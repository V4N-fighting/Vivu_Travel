import { Input, Button as AntdButton } from 'antd';
import { useState } from 'react';

interface CounterProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  onChangeValue: (data: number) => void;
}

const Counter: React.FC<CounterProps> = ({ value, setValue, onChangeValue }) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Chấp nhận chuỗi rỗng hoặc số
    if (/^\d*$/.test(val)) {
      setInputValue(val);

      // Nếu không rỗng, cập nhật state thật
      if (val !== '') {
        const num = parseInt(val, 10);
        setValue(num);
        onChangeValue(num);
      } 
    }
  };

  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val == '') {
    setValue(0);
    setInputValue("0");
    onChangeValue(0);
    } 
  }

  const increase = () => {
    const newValue = value + 1;
    setValue(newValue);
    onChangeValue(newValue);
    setInputValue(newValue.toString());
  };

  const decrease = () => {
    const newValue = Math.max(value - 1, 0);
    setValue(newValue);
    onChangeValue(newValue);
    setInputValue(newValue.toString());
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AntdButton onClick={decrease} style={{ marginRight: '8px' }}>-</AntdButton>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        style={{ width: '60px', textAlign: 'center' }}
      />
      <AntdButton onClick={increase} style={{ marginLeft: '8px' }}>+</AntdButton>
    </div>
  );
};

export default Counter;
