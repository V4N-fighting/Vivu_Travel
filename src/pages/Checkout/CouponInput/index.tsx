import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../Component/button/Button';

const CouponInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ height: number }>`
  flex: 1;
  height: ${({ height }) => height}px; /* Đồng bộ chiều cao với Button */
  border: 1px solid #ccc;
  border-right: none;
  padding: 0 10px;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  &:focus {
    outline: none;
    border-color: #ff9800;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0 4px 4px 0;
`;

const CouponInput: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonHeight, setButtonHeight] = useState(40); // Chiều cao mặc định

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight); // Lấy chiều cao thực tế của Button
    }
  }, []);

  return (
    <CouponInputContainer>
      <Input
        placeholder="Mã giảm giá"
        height={buttonHeight} // Truyền chiều cao từ Button vào Input
      />
      <StyledButton ref={buttonRef} orange>Áp dụng</StyledButton>
    </CouponInputContainer>
  );
};

export default CouponInput;
