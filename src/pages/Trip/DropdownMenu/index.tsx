import React, { useState } from 'react';
import styled from 'styled-components';

const items = [
  { group: null, items: ['Mới nhất', 'Đánh giá nhiều nhất'] },
  { group: 'Giá', items: ['Thấp đến cao', 'Cao đến thấp'] },
  { group: 'Ngày', items: ['Thấp đến cao', 'Cao đến thấp'] },
  { group: 'Tên', items: ['a - z', 'z - a'] },
];

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Mới nhất');
  const [curIndex, setCurIndex] = useState(0);
  const [curGroup, setCurGroup] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (group: string | null, item: string, index: number) => {
    setSelected(item);
    setCurIndex(index);
    setIsOpen(false);
    setCurGroup(group);
  };

  return (
    <Wrapper>
      <SortButton isOpen={isOpen} onClick={toggleDropdown}>
        Sắp xếp : {selected} {curGroup === null ? null : '- ' + curGroup   }
      </SortButton>
      {isOpen && (
        <Dropdown>
          {items.map(({ group, items }) => (
            <DropdownItemGroup key={group || 'common'}>
                <GroupName>{group}</GroupName>
              {items.map((item, index) => (
                <DropdownItem
                  key={index}
                  onClick={() => handleSelect(group, item, index)}
                  className={index === curIndex && curGroup === group ? 'active' : ''}
                >
                  {item}
                </DropdownItem>
              ))}
            </DropdownItemGroup>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const SortButton = styled.div<{isOpen?: boolean}>`
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:after {
    content: '▼';
    font-size: 12px;
    margin-left: 8px;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    transition: transform 0.2s;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 180px;
  border-radius: 8px;
  padding: 8px 0;
`;

const DropdownItemGroup = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
    color: #000;
  }

  &.active {
    color: orange;
    font-weight: bold;
  }
`;

const GroupName = styled.div`
    padding: 8px 16px;
    font-size: 14px;
    color: #afafaf;
`

export default DropdownMenu;
