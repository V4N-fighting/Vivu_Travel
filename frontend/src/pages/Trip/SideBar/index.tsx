import React, { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Title } from '../../../styled';
import { useDestination } from '../../../service/destinationSerive';
import { useActivityFullData } from '../../../service/activitiesService';
import { useTourTypeFullData } from '../../../service/tourTypeService';
import FilterSection from './FilterSection';
import RangeInputFilter from './RangeInputFilter';

export enum TypeInput {
  Price,
  Time
}

type SideBarProps = {
  data: {
    destinationID: string[];
    activityID: string[];
    typeID: string[];
    price?: [number | undefined, number | undefined];
    day?: [number | undefined, number | undefined];
    searchText?: string;
  };
  onFilterByPrice: (val: [number | undefined, number | undefined]) => void;
  onFilterByTime: (val: [number | undefined, number | undefined]) => void;
  onCheckDestination: (isChecked: boolean, val: string) => void;
  onCheckActivity: (isChecked: boolean, val: string) => void;
  onCheckType: (isChecked: boolean, val: string) => void;
  onDeleteAll: () => void;
  resetFilters: boolean;
  onResetDone: () => void;
  onSearchChange: (text: string) => void;
};


const SideBar: React.FC<SideBarProps> = ({
  data,
  onFilterByPrice,
  onFilterByTime,
  onCheckDestination,
  onCheckActivity,
  onCheckType,
  onDeleteAll,
  resetFilters,
  onResetDone,
  onSearchChange,
}) => {
  const { destinations, isLoading: isDesLoading, isError: isDesError } = useDestination();
  const { activities, isLoading: isActLoading, isError: isActError } = useActivityFullData();
  const { types, isLoading: isTypeLoading, isError: isTypeError } = useTourTypeFullData();

  const [searchText, setSearchText] = useState(data.searchText || "");

  // Khi resetFilters, set lại state local
  useEffect(() => {
    if (resetFilters) {
      setSearchText("");
      onResetDone();
    }
  }, [resetFilters, onResetDone]);

  useEffect(() => {
    setSearchText(data.searchText || "");
  }, [data.searchText]);

  const handleSearchSubmit = () => {
    onSearchChange(searchText);
  };

  // Handler apply
  const handleApplyPrice = useCallback((minStr: string, maxStr: string) => {
    const min = minStr.trim() !== "" ? Number(minStr) * 1_000_000 : undefined;
    const max = maxStr.trim() !== "" ? Number(maxStr) * 1_000_000 : undefined;
    onFilterByPrice([min, max]);
  }, [onFilterByPrice]);

  const handleApplyTime = useCallback((minStr: string, maxStr: string) => {
    const min = minStr.trim() !== "" ? Number(minStr) : undefined;
    const max = maxStr.trim() !== "" ? Number(maxStr) : undefined;
    onFilterByTime([min, max]);
  }, [onFilterByTime]);

  // Gom handler checkbox
  const handleCheckbox = useCallback(
    (type: 'destination' | 'activity' | 'type') =>
      (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const checked = e.target.checked;
        if (type === 'destination') onCheckDestination(checked, id);
        else if (type === 'activity') onCheckActivity(checked, id);
        else if (type === 'type') onCheckType(checked, id);
      },
    [onCheckDestination, onCheckActivity, onCheckType]
  );

  // Memo filterConfigs
  const filterConfigs = useMemo(
    () => [
      {
        label: 'Điểm đến',
        data: destinations,
        onChange: handleCheckbox('destination'),
        selected: data.destinationID,
      },
      {
        label: 'Hoạt động',
        data: activities,
        onChange: handleCheckbox('activity'),
        selected: data.activityID,
      },
      {
        label: 'Loại tour',
        data: types,
        onChange: handleCheckbox('type'),
        selected: data.typeID,
      },
    ],
    [destinations, activities, types, data.destinationID, data.activityID, data.typeID, handleCheckbox]
  );

  if (isDesLoading || isActLoading || isTypeLoading)
    return <SidebarLoading>Đang tải dữ liệu...</SidebarLoading>;
  if (isDesError || isActError || isTypeError)
    return <SidebarLoading>Lỗi dữ liệu</SidebarLoading>;

  return (
    <Sidebar>
      <SidebarItem>
        <Title small>Điều kiện lọc</Title>
        <DeleteAll onClick={onDeleteAll}>Xóa tất cả</DeleteAll>
      </SidebarItem>

      <SidebarSearchWrapper>
        <SearchBox>
          <SearchInput
            type="text"
            placeholder="Tìm tên tour, điểm đến..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          {searchText && (
            <ClearIcon onClick={() => {
              setSearchText("");
              onSearchChange("");
            }}>
              ✕
            </ClearIcon>
          )}
          <SearchBtn onClick={handleSearchSubmit}>
            🔍
          </SearchBtn>
        </SearchBox>
      </SidebarSearchWrapper>

      <RangeInputFilter
        label="Giá"
        unit={TypeInput.Price}
        onApply={handleApplyPrice}
        resetFilters={resetFilters}
        selected={data.price}/>

      <RangeInputFilter
        label="Thời gian"
        unit={TypeInput.Time}
        onApply={handleApplyTime}
        resetFilters={resetFilters}
        selected={data.day}/>

      {filterConfigs.map((config) => (
        <FilterSection
          key={config.label}
          label={config.label}
          data={config.data}
          onChange={config.onChange}
          selected={config.selected}
          shouldReset={resetFilters}
        />
      ))}
    </Sidebar>
  );
};

const Sidebar = styled.div`
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0 20px;
`;

const SidebarItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #d1d1d1;
`;

const DeleteAll = styled.div`
  font-size: 14px;
  text-decoration: underline;
  color: #555555;
  cursor: pointer;
`;

const SidebarLoading = styled.div`
  width: 100%;
  padding: 32px 0;
  text-align: center;
  color: #888;
`;

const SidebarSearchWrapper = styled.div`
  width: 100%;
  padding: 15px 0;
  border-bottom: 1px solid #d1d1d1;
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 25px;
  background-color: #f9f9f9;
  padding: 4px 10px 4px 16px;
  transition: all 0.3s ease;

  &:focus-within {
    border-color: #ff5722;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(255, 87, 34, 0.2);
  }
`;

const SearchInput = styled.input`
  border: none;
  background: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  color: #333;
  padding: 6px 0;
  
  &::placeholder {
    color: #999;
  }
`;

const ClearIcon = styled.span`
  cursor: pointer;
  color: #999;
  font-size: 14px;
  margin-right: 8px;
  transition: color 0.2s ease;

  &:hover {
    color: #ff5722;
  }
`;

const SearchBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #ff5722;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.15);
  }
`;

export default SideBar;
