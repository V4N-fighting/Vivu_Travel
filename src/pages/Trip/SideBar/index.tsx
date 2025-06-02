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
  const { data: destination, isLoading: isDesLoading, isError: isDesError } = useDestination();
  const { data: activity, isLoading: isActLoading, isError: isActError } = useActivityFullData();
  const { data: type, isLoading: isTypeLoading, isError: isTypeError } = useTourTypeFullData();

  const [priceRange, setPriceRange] = useState<[number?, number?]>(data.price || []);
  const [timeRange, setTimeRange] = useState<[number?, number?]>(data.day || []);

  useEffect(() => {
    if (resetFilters) {
      setPriceRange([]);
      setTimeRange([]);
      onResetDone();
    }
  }, [resetFilters, onResetDone]);

  const handleApplyPrice = () => {
    if (priceRange[0] != null && priceRange[1] != null) {
      onFilterByPrice([
        Number(priceRange[0]) * 1_000_000,
        Number(priceRange[1]) * 1_000_000,
      ]);
    }
  };

  const handleApplyTime = () => {
    if (timeRange[0] != null && timeRange[1] != null) {
      onFilterByTime([
        Number(timeRange[0]),
        Number(timeRange[1]),
      ]);
    }
  };


  const createCheckboxHandler = (
    callback: (checked: boolean, id: string) => void
  ) => (
    (e: ChangeEvent<HTMLInputElement>, id: string) => {
      callback(e.target.checked, id);
    });

  const filterConfigs = useMemo(
    () => [
      {
        label: 'Điểm đến',
        data: destination,
        onChange: createCheckboxHandler(onCheckDestination),
        selected: data.destinationID,
      },
      {
        label: 'Hoạt động',
        data: activity,
        onChange: createCheckboxHandler(onCheckActivity),
        selected: data.activityID,
      },
      {
        label: 'Loại tour',
        data: type,
        onChange: createCheckboxHandler(onCheckType),
        selected: data.typeID,
      },
    ],
    [destination, activity, type, data]
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
        setMin={(val) => setPriceRange((prev) => [Number(val), prev[1]])}
        setMax={(val) => setPriceRange((prev) => [prev[0], Number(val)])}
        onApply={handleApplyPrice}
        resetFilters={resetFilters}
        selected={data.price}
      />

      <RangeInputFilter
        label="Thời gian"
        unit={typeInput.Time}
        setMin={(val) => setTimeRange((prev) => [Number(val), prev[1]])}
        setMax={(val) => setTimeRange((prev) => [prev[0], Number(val)])}
        onApply={handleApplyTime}
        resetFilters={resetFilters}
        selected={data.day}

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
