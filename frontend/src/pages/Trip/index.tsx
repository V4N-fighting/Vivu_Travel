import styled from "styled-components";
import { Grid, GridCol, GridRow } from "../../styled";
import SideBar from "./SideBar";
import Content from "./Content";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PARAM } from "../../api/param";
import { useDestination } from "../../service/destinationSerive";

type FilterState = {
  destinationID: string[];
  activityID: string[];
  typeID: string[];
  price?: [number | undefined, number | undefined];
  day?: [number | undefined, number | undefined];
  searchText?: string;
};

function Trip() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetFilters, setResetFilters] = useState(false);
  const { destinations } = useDestination();

  const [filters, setFilters] = useState<FilterState>({
    destinationID: [],
    activityID: [],
    typeID: [],
    price: undefined,
    day: undefined,
    searchText: "",
  });

  // Khởi tạo filters từ URL params
  useEffect(() => {
    const rawDestinations = searchParams.getAll(PARAM.DESTINATION);
    const destinationIDs = rawDestinations.map((val) => {
      if (destinations?.some(d => String(d.id) === String(val))) {
        return val;
      }
      const found = destinations?.find(d => d.name.toLowerCase().trim() === val.toLowerCase().trim());
      return found ? String(found.id) : val;
    });

    setFilters({
      destinationID: destinationIDs,
      activityID: searchParams.getAll(PARAM.ACTIVITY),
      typeID: searchParams.getAll(PARAM.TOUR_TYPE),
      price:
        searchParams.get(PARAM.MIN_PRICE) || searchParams.get(PARAM.MAX_PRICE)
          ? [
              searchParams.get(PARAM.MIN_PRICE) ? Number(searchParams.get(PARAM.MIN_PRICE)) * 1_000_000 : undefined,
              searchParams.get(PARAM.MAX_PRICE) ? Number(searchParams.get(PARAM.MAX_PRICE)) * 1_000_000 : undefined,
            ]
          : undefined,
      day:
        searchParams.get(PARAM.MIN_DURATION) || searchParams.get(PARAM.MAX_DURATION)
          ? [
              searchParams.get(PARAM.MIN_DURATION) ? Number(searchParams.get(PARAM.MIN_DURATION)) : undefined,
              searchParams.get(PARAM.MAX_DURATION) ? Number(searchParams.get(PARAM.MAX_DURATION)) : undefined,
            ]
          : undefined,
      searchText: searchParams.get("searchText") || "",
    });
  }, [searchParams, destinations]);

  // Cập nhật nhiều lựa chọn cho filter (checkbox)
  const updateMultiValueFilter = (key: string, isChecked: boolean, value: string) => {
    const queryParams = new URLSearchParams(location.search);
    const currentValues = queryParams.getAll(key);
    let updatedValues: string[];

    let normalizedCurrentValues = currentValues;
    if (key === PARAM.DESTINATION && destinations) {
      normalizedCurrentValues = currentValues.map((val) => {
        if (destinations.some(d => String(d.id) === String(val))) {
          return val;
        }
        const found = destinations.find(d => d.name.toLowerCase().trim() === val.toLowerCase().trim());
        return found ? String(found.id) : val;
      });
    }

    if (isChecked) {
      updatedValues = normalizedCurrentValues.includes(value) ? normalizedCurrentValues : [...normalizedCurrentValues, value];
    } else {
      updatedValues = normalizedCurrentValues.filter((item) => item !== value);
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

  const handleFilterByPrice = (val: [number | undefined, number | undefined]) => {
    const queryParams = new URLSearchParams(location.search);
    if (val[0] !== undefined) {
      queryParams.set(PARAM.MIN_PRICE, String(val[0] / 1_000_000));
    } else {
      queryParams.delete(PARAM.MIN_PRICE);
    }
    if (val[1] !== undefined) {
      queryParams.set(PARAM.MAX_PRICE, String(val[1] / 1_000_000));
    } else {
      queryParams.delete(PARAM.MAX_PRICE);
    }
    navigate(`/trips?${queryParams.toString()}`);
  };

  const handleFilterByTime = (val: [number | undefined, number | undefined]) => {
    const queryParams = new URLSearchParams(location.search);
    if (val[0] !== undefined) {
      queryParams.set(PARAM.MIN_DURATION, String(val[0]));
    } else {
      queryParams.delete(PARAM.MIN_DURATION);
    }
    if (val[1] !== undefined) {
      queryParams.set(PARAM.MAX_DURATION, String(val[1]));
    } else {
      queryParams.delete(PARAM.MAX_DURATION);
    }
    navigate(`/trips?${queryParams.toString()}`);
  };

  const handleSearch = (text: string) => {
    const queryParams = new URLSearchParams(location.search);
    if (text.trim()) {
      queryParams.set("searchText", text.trim());
    } else {
      queryParams.delete("searchText");
    }
    navigate(`/trips?${queryParams.toString()}`);
  };

  const handleDeleteAllFilter = () => {
    setFilters({
      destinationID: [],
      activityID: [],
      typeID: [],
      price: undefined,
      day: undefined,
      searchText: "",
    });
    setResetFilters(true);
    navigate("/trips");
  };

  return (
    <>
      <HeroBanner $url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80">
        <HeroOverlay />
        <HeroContent>
          <HeroTag>Vivu Travel</HeroTag>
          <HeroTitle>Hành Trình Du Lịch Của Tôi</HeroTitle>
          <HeroSubtitle>
            Tìm kiếm, lựa chọn và trải nghiệm các tour du lịch được thiết kế dành riêng cho hành trình của bạn.
          </HeroSubtitle>
          <Breadcrumbs>
            <BreadcrumbLink to="/">Trang chủ</BreadcrumbLink>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbActive>Chuyến đi</BreadcrumbActive>
          </Breadcrumbs>
        </HeroContent>
      </HeroBanner>
      <Container>
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
                onSearchChange={handleSearch}
              />
            </GridCol>
            <GridCol col={9}>
              <Content
                destinationIDs={filters.destinationID}
                activityIDs={filters.activityID}
                typeIDs={filters.typeID}
                price={filters.price}
                time={filters.day}
                searchText={filters.searchText}
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

const HeroBanner = styled.div<{ $url: string }>`
  position: relative;
  padding: 120px 30px 100px;
  background-image: url(${props => props.$url});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  overflow: hidden;
  margin-top: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(28, 28, 28, 0.85) 0%, rgba(255, 104, 26, 0.45) 100%);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const HeroTag = styled.span`
  background: rgba(255, 104, 26, 0.2);
  border: 1px solid rgba(255, 104, 26, 0.4);
  color: #FF681A;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: system-ui, -apple-system, sans-serif;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
  text-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  font-family: system-ui, -apple-system, sans-serif;
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 10px;
  line-height: 1.6;
  max-width: 600px;
  font-family: system-ui, -apple-system, sans-serif;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  font-family: system-ui, -apple-system, sans-serif;
`;

const BreadcrumbLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #FF681A;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: rgba(255, 255, 255, 0.4);
`;

const BreadcrumbActive = styled.span`
  color: #ffffff;
`;

export default Trip;
