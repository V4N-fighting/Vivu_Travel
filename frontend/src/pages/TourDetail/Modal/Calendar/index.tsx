import React from 'react';
import { Calendar, theme } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';

interface CalendarComponentProps {
  value: Dayjs,
  onSelectDate: (date: Dayjs) => void; // Hàm callback nhận giá trị date từ cha
}


const CalendarComponent: React.FC<CalendarComponentProps> = ({value, onSelectDate}) => {
  const { token } = theme.useToken();


  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    onSelectDate(value)
  };

  

  const wrapperStyle: React.CSSProperties = {
    width: '100%',
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar 
        value={value}
        fullscreen={false} 
        onPanelChange={onPanelChange} 
        onSelect={(date, { source }) => {
          if (source === 'date') {
            onSelectDate(date);
          }
        }}
      />
    </div>
  );
};

export default CalendarComponent;