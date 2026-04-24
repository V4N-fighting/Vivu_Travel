import React, { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';
import CollapseComponent from '../Collapse';
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
    price?: [number, number];
    day?: [number, number];
  };
  onFilterByPrice: (val: [number, number]) => void;
  onFilterByTime: (val: [number, number]) => void;
  onCheckDestination: (isChecked: boolean, val: string) => void;
  onCheckActivity: (isChecked: boolean, val: string) => void;
  onCheckType: (isChecked: boolean, val: string) => void;
  onDeleteAll: () => void;
  resetFilters: boolean;
  onResetDone: () => void;
};

const isValidRange = (range: [number, number]) =>
  range[0] !== undefined && range[1] !== undefined && !isNaN(range[0]) && !isNaN(range[1]);

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
}) => {
  const { destinations, isLoading: isDesLoading, isError: isDesError } = useDestination();
  const { activities, isLoading: isActLoading, isError: isActError } = useActivityFullData();
  const { types, isLoading: isTypeLoading, isError: isTypeError } = useTourTypeFullData();

  // State chỉ dùng cho reset, còn lại controlled từ props cha
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(data.price || [0, 0]);
  const [localTimeRange, setLocalTimeRange] = useState<[number, number]>(data.day || [0, 0]);

  // Khi resetFilters, set lại state local
  useEffect(() => {
    if (resetFilters) {
      setLocalPriceRange([0, 0]);
      setLocalTimeRange([0, 0]);
      onResetDone();
    }
  }, [resetFilters, onResetDone]);

  // Khi props data thay đổi, đồng bộ local state (chỉ khi giá trị khác)
  useEffect(() => {
    if (
      (data.price && (data.price[0] !== localPriceRange[0] || data.price[1] !== localPriceRange[1])) ||
      (!data.price && (localPriceRange[0] !== 0 || localPriceRange[1] !== 0))
    ) {
      setLocalPriceRange(data.price || [0, 0]);
    }
  }, [data.price]);

  useEffect(() => {
    if (
      (data.day && (data.day[0] !== localTimeRange[0] || data.day[1] !== localTimeRange[1])) ||
      (!data.day && (localTimeRange[0] !== 0 || localTimeRange[1] !== 0))
    ) {
      setLocalTimeRange(data.day || [0, 0]);
    }
  }, [data.day]);

  // Handler apply
  const handleApplyPrice = useCallback(() => {
    if (isValidRange(localPriceRange)) {
      onFilterByPrice([
        Number(localPriceRange[0]) * 1_000_000,
        Number(localPriceRange[1]) * 1_000_000,
      ]);
    }
  }, [localPriceRange, onFilterByPrice]);

  const handleApplyTime = useCallback(() => {
    if (isValidRange(localTimeRange)) {
      onFilterByTime([
        Number(localTimeRange[0]),
        Number(localTimeRange[1]),
      ]);
    }
  }, [localTimeRange, onFilterByTime]);

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

      <RangeInputFilter
        label="Giá"
        unit={TypeInput.Price}
        setMin={(val) => setLocalPriceRange((prev) => [Number(val), prev[1]])}
        setMax={(val) => setLocalPriceRange((prev) => [prev[0], Number(val)])}
        onApply={handleApplyPrice}
        resetFilters={resetFilters}
        selected={localPriceRange}/>

      <RangeInputFilter
        label="Thời gian"
        unit={TypeInput.Time}
        setMin={(val) => setLocalTimeRange((prev) => [Number(val), prev[1]])}
        setMax={(val) => setLocalTimeRange((prev) => [prev[0], Number(val)])}
        onApply={handleApplyTime}
        resetFilters={resetFilters}
        selected={localTimeRange}/>

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

export default SideBar;
