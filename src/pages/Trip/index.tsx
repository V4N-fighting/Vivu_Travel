import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol, GridRow } from "../../styled";
import SideBar from "./SideBar";
import Content from "./Content";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PARAM } from "../../api/param";

type FilterState = {
  destinationID: string[];
  activityID: string[];
  typeID: string[];
  price?: [number, number];
  day?: [number, number];
};

function Trip() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetFilters, setResetFilters] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    destinationID: [],
    activityID: [],
    typeID: [],
    price: undefined,
    day: undefined,
  });

  // Khởi tạo filters từ URL params
  useEffect(() => {
    setFilters({
      destinationID: searchParams.getAll(PARAM.DESTINATION),
      activityID: searchParams.getAll(PARAM.ACTIVITY),
      typeID: searchParams.getAll(PARAM.TOUR_TYPE),
      price:
        searchParams.get(PARAM.MIN_PRICE) && searchParams.get(PARAM.MAX_PRICE)
          ? [Number(searchParams.get(PARAM.MIN_PRICE)) * 1_000_000, Number(searchParams.get(PARAM.MAX_PRICE)) * 1_000_000]
          : undefined,
      day:
        searchParams.get(PARAM.MIN_DURATION) && searchParams.get(PARAM.MAX_DURATION)
          ? [Number(searchParams.get(PARAM.MIN_DURATION)), Number(searchParams.get(PARAM.MAX_DURATION))]
          : undefined,
    });
  }, [searchParams]);

  // Cập nhật nhiều lựa chọn cho filter (checkbox)
  const updateMultiValueFilter = (key: string, isChecked: boolean, value: string) => {
    const queryParams = new URLSearchParams(location.search);
    const currentValues = queryParams.getAll(key);
    let updatedValues: string[];

    if (isChecked) {
      updatedValues = currentValues.includes(value) ? currentValues : [...currentValues, value];
    } else {
      updatedValues = currentValues.filter((item) => item !== value);
    }

    queryParams.delete(key);
    updatedValues.forEach((val) => queryParams.append(key, val));

    navigate(`/trips?${queryParams.toString()}`);
  };

  const handleCheckDestination = (isChecked: boolean, val: string) =>
    updateMultiValueFilter(PARAM.DESTINATION, isChecked, val);
  const handleCheckActivity = (isChecked: boolean, val: string) =>
    updateMultiValueFilter(PARAM.ACTIVITY, isChecked, val);
  const handleCheckType = (isChecked: boolean, val: string) =>
    updateMultiValueFilter(PARAM.TOUR_TYPE, isChecked, val);

  const handleFilterByPrice = (val: [number, number]) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set(PARAM.MIN_PRICE, String(val[0] / 1_000_000));
    queryParams.set(PARAM.MAX_PRICE, String(val[1] / 1_000_000));
    navigate(`/trips?${queryParams.toString()}`);
  };

  const handleFilterByTime = (val: [number, number]) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set(PARAM.MIN_DURATION, String(val[0]));
    queryParams.set(PARAM.MAX_DURATION, String(val[1]));
    navigate(`/trips?${queryParams.toString()}`);
  };

  const handleDeleteAllFilter = () => {
    setFilters({
      destinationID: [],
      activityID: [],
      typeID: [],
      price: undefined,
      day: undefined,
    });
    setResetFilters(true);
    navigate("/trips");
  };

  return (
    <>
      <Banner
        background="https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"
        pageName="Lưu trữ: Trips"
        thisPage="/Trips"
      />
      <Container>
        <TitleTrip>Trips</TitleTrip>
        <Grid>
          <GridRow margin="10px">
            <GridCol col={3}>
              <SideBar
                data={filters}
                onFilterByPrice={handleFilterByPrice}
                onFilterByTime={handleFilterByTime}
                onCheckDestination={handleCheckDestination}
                onCheckActivity={handleCheckActivity}
                onCheckType={handleCheckType}
                onDeleteAll={handleDeleteAllFilter}
                resetFilters={resetFilters}
                onResetDone={() => setResetFilters(false)}
              />
            </GridCol>
            <GridCol col={9}>
              <Content
                destinationIDs={filters.destinationID}
                activityIDs={filters.activityID}
                typeIDs={filters.typeID}
                price={filters.price}
                time={filters.day}
              />
            </GridCol>
          </GridRow>
        </Grid>
      </Container>
    </>
  );
}

// Styled Components
const Container = styled.div`
  padding: 50px 0 100px;
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
`;

const TitleTrip = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #000000;
  margin: 20px 0;
`;

export default Trip;
