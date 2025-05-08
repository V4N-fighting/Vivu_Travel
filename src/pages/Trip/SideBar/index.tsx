import React, { ChangeEvent, useMemo, useState } from 'react';
import styled from 'styled-components';
import CollapseComponent from '../Collapse';
import { Title } from '../../../styled';
import { useDestination } from '../../../service/destinationSerive';
import { useActivityFullData } from '../../../service/activitiesService';
import { useTourTypeFullData } from '../../../service/tourTypeService';
import FilterSection from './FilterSection';
import RangeInputFilter from './RangeInputFilter';


type SideBarProps = {
  onFilterByPrice: (val: [number, number]) => void
  onFilterByTime: (val: [number, number]) => void,
  onCheckDestination: (isChecked: boolean, val: string) => void, 
  onCheckActivity: (isChecked: boolean, val: string) => void,
  onCheckType: (isChecked: boolean, val: string) => void,
  onDeleteAll: () => void
}

const SideBar: React.FC<SideBarProps> = ({onFilterByPrice, onFilterByTime, onCheckDestination, onCheckActivity, onCheckType, onDeleteAll} ) => {

  const {data: destination, isLoading: isDesLoading, isError: isDesError} = useDestination()
  const {data: activity, isLoading: isActLoading, isError: isActError} = useActivityFullData()
  const {data: type, isLoading: isTypeLoading, isError: isTypeError} = useTourTypeFullData()
  
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();

  const [minDay, setMinDay] = useState<number>();
  const [maxDay, setMaxDay] = useState<number>();

  
  

  const handleApply = () => {
    if (typeof minPrice === 'number' && typeof maxPrice === 'number') {
      onFilterByPrice([minPrice, maxPrice]);
    }

    if (typeof minDay === 'number' && typeof maxDay === 'number') {
      onFilterByTime([minDay, maxDay])
    }
  }
  

  const handleChangeInput = (
    handler: (isChecked: boolean, val: string) => void
  ) => (e: ChangeEvent<HTMLInputElement>, id: string) => {
    handler(e.target.checked, id);
  };

  const handleDeleteAllFilter = () => {
    onDeleteAll()
  }
  

  const filterConfigs = useMemo(() => [
    {
      label: 'Điểm đến',
      data: destination,
      onChange: handleChangeInput(onCheckDestination)
    },
    {
      label: 'Hoạt động',
      data: activity,
      onChange: handleChangeInput(onCheckActivity)
    },
    {
      label: 'Loại tour',
      data: type,
      onChange: handleChangeInput(onCheckType)
    }
  ],[destination, activity, type]);
  

  if (isDesLoading || isActLoading || isTypeLoading) {
    return <>"Đang tải dữ liệu"</>;
  } ;
  
  if (isDesError || isActError || isTypeError ) {
    return <>"Lỗi dữ liệu"</>;
  }

  return (
    <Sidebar>
      <SidebarItem>
        <Title small >Điều kiện lọc</Title>
        <DeleteAll onClick={handleDeleteAllFilter}>Xóa tất cả</DeleteAll>
      </SidebarItem>
      <RangeInputFilter
        label="Giá"
        unit="đ"
        setMin={val => setMinPrice(Number(val))}
        setMax={val => setMaxPrice(Number(val))}
        onApply={handleApply}
      />


      <RangeInputFilter
        label="Thời gian"
        unit="ngày"
        setMin={val => setMinDay(Number(val))}
        setMax={val => setMaxDay(Number(val))}
        onApply={handleApply}
      />
      {filterConfigs.map((config, index) => (
        <FilterSection
          key={index}
          label={config.label}
          data={config.data}
          onChange={config.onChange}
        />
      ))}
    </Sidebar>
  );
};

const Sidebar = styled.div`
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0 20px;
`

const SidebarItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #d1d1d1;

`

const DeleteAll = styled.div`
  font-size: 14px;
  text-decoration: underline;
  color: #555555;
  cursor: pointer;
`

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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Currency = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #888;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 20px 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  color: #333;

  &:focus {
    outline: none;
    border-color: #ff5722;
  }
`;

const Separator = styled.div`
  margin: 0 10px;
  font-size: 16px;
  color: #888;
`;

const ApplyButton = styled.button`
  background-color: #ff5722;
  width: 100%;
  color: #fff;
  padding: 10px 0;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e64a19;
  }

  &:active {
    background-color: #d84315;
  }
`;

export default SideBar;
