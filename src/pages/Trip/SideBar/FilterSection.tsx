import React, { useState, useMemo } from "react";
import styled from "styled-components";
import CollapseComponent from "../Collapse";
import DestinationItemMap from "../../../types/destination";
import TourTypeItemMap from "../../../types/tourType";
import ActivityItemMap from "../../../types/activity";

type FilterSectionProps = {
  label: string;
  data?: DestinationItemMap[] | TourTypeItemMap[] | ActivityItemMap[] | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

const FilterSection: React.FC<FilterSectionProps> = ({ label, data, onChange }) => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowAll(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const isChecked = e.target.checked;
    onChange(e, id);
  
    setCheckedIds(prev => {
      const newSet = new Set(prev);
      if (isChecked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  
    // Reset tìm kiếm và hiển thị toàn bộ danh sách sau khi chọn
    if (isChecked) {
      setSearchTerm("");       //  Xoá ô tìm kiếm
      setShowAll(true);        //  Mở full danh sách
    }
  };
  

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [data, searchTerm]);

  const visibleData = useMemo(() => {
    if (showAll) {
      return filteredData;
    }
    return filteredData.slice(0, 5);
  }, [showAll, filteredData]);

  const checkedItems = useMemo(() => {
    if (!data) return [];
    return data.filter(item => checkedIds.has(item.id));
  }, [checkedIds, data]);

  return (
    <SidebarItem>
      <CollapseComponent label={label}>
        <SearchInput
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {checkedItems.length > 0 && (
          <CheckedListWrapper>
            {checkedItems.map(item => (
              <CheckedItem key={item.id}>
                <input
                  type="checkbox"
                  checked={true}
                  onChange={(e) => handleCheckboxChange(e, item.id)}
                />
                <span>{item.name}</span>
              </CheckedItem>
            ))}
          </CheckedListWrapper>
        )}

        {visibleData.map((val, index) => (
          <TypeItem key={index}>
            <input
              type="checkbox"
              checked={checkedIds.has(val.id)}
              onChange={(e) => handleCheckboxChange(e, val.id)}
            />
            <span>{val.name}</span>
          </TypeItem>
        ))}

        {!showAll && filteredData.length > 5 && (
          <Ellipsis>...</Ellipsis>
        )}

        {!showAll && filteredData.length > 5 && (
          <ToggleButton onClick={() => setShowAll(true)}>
            Hiện thêm
          </ToggleButton>
        )}
        {showAll && filteredData.length > 5 && (
          <ToggleButton onClick={() => setShowAll(false)}>
            Ẩn bớt
          </ToggleButton>
        )}
      </CollapseComponent>
    </SidebarItem>
  );
};

const SidebarItem = styled.div`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #d1d1d1;
  position: relative;
`;

const TypeItem = styled.div`
  padding: 10px 0 10px 10px;

  & input {
    font-size: 14px;
  }

  & span {
    font-size: 14px;
    color: black;
    margin-left: 20px;
  }
`;

const CheckedListWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const CheckedItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0 4px 10px;

  & input {
    font-size: 14px;
  }

  & span {
    font-size: 14px;
    color: #333;
    margin-left: 20px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 6px 10px;
  margin-bottom: 10px;
  font-size: 14px;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 27px;
  right: 0;
  background: none;
  border: none;
  color: #ff5722;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  padding-left: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const Ellipsis = styled.div`
  padding-left: 10px;
  font-size: 24px;
  color: #6b6b6b;
`;

export default FilterSection;
