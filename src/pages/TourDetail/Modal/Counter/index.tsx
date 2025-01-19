import { Input, Button as AntdButton } from 'antd';
import { useState } from 'react';

interface CounterProps {
    onChangeValue: (data: number) => void;
}

const Counter: React.FC<CounterProps> = ({ onChangeValue }) => {
    const [value, setValue] = useState(0);

    const increase = () => {
        const newValue = value + 1;
        setValue(newValue);
        onChangeValue(newValue);
    };

    const decrease = () => {
        const newValue = Math.max(value - 1, 0);
        setValue(newValue);
        if (newValue >= 0) {
            onChangeValue(newValue);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <AntdButton onClick={decrease} style={{ marginRight: '8px' }}>
                -
            </AntdButton>
            <Input
                value={value}
                style={{ width: '60px', textAlign: 'center' }}
                readOnly
            />
            <AntdButton onClick={increase} style={{ marginLeft: '8px' }}>
                +
            </AntdButton>
        </div>
    );
};

export default Counter;
