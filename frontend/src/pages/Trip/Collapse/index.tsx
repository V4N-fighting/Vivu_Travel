import type { CSSProperties } from 'react';
import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, theme } from 'antd';


interface CollapseComponentProps {
  label: string;
  children: React.ReactNode;
}

const getItems = (panelStyle: CSSProperties, label: string, children: React.ReactNode): CollapseProps['items'] => [
  {
    key: '1',
    label: <span>{label}</span>,
    children: children,
    style: panelStyle,
  },
];

const CollapseComponent: React.FC<CollapseComponentProps> = ({ label, children }) => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{ background: token.colorBgContainer }}
      items={getItems(panelStyle, label, children)}
    />
  );
};

export default CollapseComponent;
