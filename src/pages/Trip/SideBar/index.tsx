import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
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
  onFilterByPrice,
  onFilterByTime,
  onCheckDestination,
  onCheckActivity,
  onCheckType,
  onDeleteAll,
  resetFilters,
  onResetDone,
}) => {
  const { data: destination, isLoading: isDesLoading, isError: isDesError } = useDestination();
  const { data: activity, isLoading: isActLoading, isError: isActError } = useActivityFullData();
  const { data: type, isLoading: isTypeLoading, isError: isTypeError } = useTourTypeFullData();

  const [priceRange, setPriceRange] = useState<[number?, number?]>([]);
  const [timeRange, setTimeRange] = useState<[number?, number?]>([]);

  useEffect(() => {
    if (resetFilters) {
      setPriceRange([]);
      setTimeRange([]);
      onResetDone();
    }
  }, [resetFilters, onResetDone]);

  const handleApply = () => {
    if (priceRange[0] != null && priceRange[1] != null) {
      const scaledPriceRange: [number, number] = [
        Number(priceRange[0]) * 1_000_000,
        Number(priceRange[1]) * 1_000_000,
      ];
      onFilterByPrice(scaledPriceRange);
    }

    if (timeRange[0] != null && timeRange[1] != null) {
      const scaledTimeRange: [number, number] = [
        Number(timeRange[0]),
        Number(timeRange[1]),
      ];
      onFilterByTime(scaledTimeRange);
    }
  };


  const createCheckboxHandler = (
    callback: (checked: boolean, id: string) => void
  ) => (
  (e: ChangeEvent<HTMLInputElement>) => {
    callback(e.target.checked, e.target.value);
  });

  //FilterConfigs
  const filterConfigs = useMemo(
    () => [
      {
        label: 'Điểm đến',
        data: destination,
        onChange: createCheckboxHandler(onCheckDestination),
      },
      {
        label: 'Hoạt động',
        data: activity,
        onChange: createCheckboxHandler(onCheckActivity),
      },
      {
        label: 'Loại tour',
        data: type,
        onChange: createCheckboxHandler(onCheckType),
      },
    ],
    [destination, activity, type]
  );

  //handle loading or error
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
        setMin={(val) => setPriceRange((prev) => [Number(val), prev[1]])}
        setMax={(val) => setPriceRange((prev) => [prev[0], Number(val)])}
        onApply={handleApply}
        resetFilters={resetFilters}
      />

      <RangeInputFilter
        label="Thời gian"
        unit={typeInput.Time}
        setMin={(val) => setTimeRange((prev) => [Number(val), prev[1]])}
        setMax={(val) => setTimeRange((prev) => [prev[0], Number(val)])}
        onApply={handleApply}
        resetFilters={resetFilters}
      />

      {filterConfigs.map((config) => (
        <FilterSection
          key={config.label}
          label={config.label}
          data={config.data}
          onChange={config.onChange}
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
