import styled from "styled-components";
import PurifyItem from "./PurifyItem";
import Button from "../../../../Component/BaseComponent/Button/Button";
import Icons from "../../../../Component/BaseComponent/Icons";
import { useActivities } from "../../../../service/activitiesService";
import { useCountry } from "../../../../service/countryService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PARAM } from "../../../../api/param";

interface PurifyProps {}

const Purify: React.FC<PurifyProps> = ({}) => {
  const { data: activity } = useActivities();
  const { data: country } = useCountry();

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    destination: undefined as number | undefined,
    activity: undefined as number | undefined,
    duration: undefined as { min: number; max?: number } | undefined,
    price: undefined as { min: number; max?: number } | undefined,
  });

  const handleChange = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const countryOptions = country
    ?.map((item) => ({
      value: Number(item.id),
      label: item.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const activityOptions = activity?.map((item) => ({
    value: Number(item.id),
    label: item.name,
  }));

  const PurifyContent = [
    {
      key: "destination",
      width: "20%",
      Icon: <Icons.LocationDotIcon />,
      placeholder: "Điểm đến",
      options: countryOptions,
    },
    {
      key: "activity",
      width: "20%",
      Icon: <Icons.CarIcon />,
      placeholder: "Hoạt động",
      options: activityOptions,
    },
    {
      key: "duration",
      width: "20%",
      Icon: <Icons.ClockIcon />,
      placeholder: "Thời gian",
      options: [
        { label: "1 - 10 ngày", min: 1, max: 10 },
        { label: "11 - 20 ngày", min: 11, max: 20 },
        { label: "1 tháng", min: 21, max: 31 },
        { label: "Hơn 1 tháng", min: 32 },
      ],
    },
    {
      key: "price",
      width: "20%",
      Icon: <Icons.MoneyIcon />,
      placeholder: "Mức giá",
      options: [
        { label: "0 - 1 triệu đồng", min: 0, max: 1 },
        { label: "1 - 2 triệu đồng", min: 1, max: 2 },
        { label: "2 - 10 triệu đồng", min: 2, max: 10 },
        { label: "10 - 100 triệu đồng", min: 10, max: 100 },
        { label: "Hơn 100 triệu đồng", min: 100 },
      ],
    },
  ];

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();

    if (filters.destination !== undefined) queryParams.append(PARAM.DESTINATION, String(filters.destination));
    if (filters.activity !== undefined) queryParams.append(PARAM.ACTIVITY, String(filters.activity));
    if (filters.duration?.min !== undefined) queryParams.append(PARAM.MIN_DURATION, String(filters.duration.min));
    if (filters.duration?.max !== undefined) queryParams.append(PARAM.MAX_DURATION, String(filters.duration.max));
    if (filters.price?.min !== undefined) queryParams.append(PARAM.MIN_PRICE, String(filters.price.min));
    if (filters.price?.max !== undefined) queryParams.append(PARAM.MAX_PRICE, String(filters.price.max));

    navigate(`/trips?${queryParams.toString()}`);
  };
  return (
    <Wrapper>
      {PurifyContent.map((val) => (
        <PurifyItem
          key={val.key}
          width={val.width}
          Icon={val.Icon}
          placeholder={val.placeholder}
          optionsValue={val.options}
          onChange={(selected) => {
            if (val.key === "duration" || val.key === "price") {
              handleChange(val.key, selected);
            } else {
              handleChange(val.key as "destination" | "activity", selected as number);
            }
          }}
        />
      ))}
      <Button orange onClick={handleSubmit}>
        Tìm ngay
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 40px 20px;
  border-radius: 15px;
  width: 1250px;
  max-width: 100%;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: white;
  z-index: 10;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

export default Purify;
