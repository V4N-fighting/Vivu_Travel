import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../../../Component/BaseComponent/Button/Button';



interface CouponInputProps {
  onApply: (code: string) => void;
  loading?: boolean;
}

const CouponInput: React.FC<CouponInputProps> = ({ onApply, loading }) => {
  const [code, setCode] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonHeight, setButtonHeight] = useState(40); // Chiều cao mặc định

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight); // Lấy chiều cao thực tế của Button
    }
  }, []);

  const handleApply = () => {
    if (code.trim()) {
      onApply(code.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <CouponInputContainer>
      <Input
        placeholder="Mã giảm giá"
        height={buttonHeight} // Truyền chiều cao từ Button vào Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <StyledButton 
        ref={buttonRef} 
        orange 
        onClick={handleApply}
        disabled={loading || !code.trim()}
      >
        {loading ? '...' : 'Áp dụng'}
      </StyledButton>
    </CouponInputContainer>
  );
};

const CouponInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ height: number }>`
  flex: 1;
  height: ${({ height }) => height}px; /* Đồng bộ chiều cao với Button */
  border: 1px solid #ccc;
  border-right: none;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px 0 0 4px;

  &:focus {
    outline: none;
    border-color: #ff9800;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0 4px 4px 0;
`;

export default CouponInput;
