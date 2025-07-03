import React, { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import styled from 'styled-components';
import CollapseComponent from '../Collapse';
import { Title } from '../../../styled';
import { useDestination } from '../../../service/destinationSerive';
import { useActivityFullData } from '../../../service/activitiesService';
import { useTourTypeFullData } from '../../../service/tourTypeService';
import FilterSection from './FilterSection';
import RangeInputFilter from './RangeInputFilter';

export enum typeInput {
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

  // Đảm bảo state luôn là [number, number]
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>(data.price || [0, 0]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[number, number]>(data.day || [0, 0]);

  // Đồng bộ state với props data khi props thay đổi
  useEffect(() => {
    setSelectedPriceRange(data.price || [0, 0]);
  }, [data.price]);

  useEffect(() => {
    setSelectedTimeRange(data.day || [0, 0]);
  }, [data.day]);

  // Xử lý reset filter
  useEffect(() => {
    if (resetFilters) {
      setSelectedPriceRange([0, 0]);
      setSelectedTimeRange([0, 0]);
      onResetDone();
    }
  }, [resetFilters, onResetDone]);


  const handleApplyPrice = useCallback(() => {
    if (selectedPriceRange[0] && selectedPriceRange[1]) {
      onFilterByPrice([
        Number(selectedPriceRange[0]) * 1_000_000,
        Number(selectedPriceRange[1]) * 1_000_000,
      ]);
    }
  }, [selectedPriceRange, onFilterByPrice]);

  const handleApplyTime = useCallback(() => {
    if (selectedTimeRange[0] && selectedTimeRange[1]) {
      onFilterByTime([
        Number(selectedTimeRange[0]),
        Number(selectedTimeRange[1]),
      ]);
    }
  }, [selectedTimeRange, onFilterByTime]);

  // Memo hóa handler để tránh tạo lại mỗi lần render
  const createCheckboxHandler = useCallback(
    (callback: (checked: boolean, id: string) => void) =>
      (e: ChangeEvent<HTMLInputElement>, id: string) => {
        callback(e.target.checked, id);
      },
    []
  );

  // Chỉ phụ thuộc các trường cần thiết
  const filterConfigs = useMemo(
    () => [
      {
        label: 'Điểm đến',
        data: destinations,
        onChange: createCheckboxHandler(onCheckDestination),
        selected: data.destinationID,
      },
      {
        label: 'Hoạt động',
        data: activities,
        onChange: createCheckboxHandler(onCheckActivity),
        selected: data.activityID,
      },
      {
        label: 'Loại tour',
        data: types,
        onChange: createCheckboxHandler(onCheckType),
        selected: data.typeID,
      },
    ],
    [destinations, activities, types, data.destinationID, data.activityID, data.typeID, onCheckDestination, onCheckActivity, onCheckType, createCheckboxHandler]
  );

  if (isDesLoading || isActLoading || isTypeLoading) return <>Đang tải dữ liệu...</>;
  if (isDesError || isActError || isTypeError) return <>Lỗi dữ liệu</>;

  return (
    <Sidebar>
      <SidebarItem>
        <Title small>Điều kiện lọc</Title>
        <DeleteAll onClick={onDeleteAll}>Xóa tất cả</DeleteAll>
      </SidebarItem>

      <RangeInputFilter
        label="Giá"
        unit={typeInput.Price}
        setMin={(val) => setSelectedPriceRange((prev) => [Number(val), prev[1]])}
        setMax={(val) => setSelectedPriceRange((prev) => [prev[0], Number(val)])}
        onApply={handleApplyPrice}
        resetFilters={resetFilters}
        selected={selectedPriceRange}
      />

      <RangeInputFilter
        label="Thời gian"
        unit={typeInput.Time}
        setMin={(val) => setSelectedTimeRange((prev) => [Number(val), prev[1]])}
        setMax={(val) => setSelectedTimeRange((prev) => [prev[0], Number(val)])}
        onApply={handleApplyTime}
        resetFilters={resetFilters}
        selected={selectedTimeRange}
      />

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

export default SideBar;
