import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol, GridRow } from "../../styled";
import TourCard from "../../Component/TourCard";
import Pagination from "../../Component/Pagination";
import { usePagination } from "../../Hooks/usePagination";
import { useTourTypeFullData } from "../../service/tourTypeService";

// Dữ liệu mẫu
// const tours = [
//   { id: 1, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Boating" },
//   { id: 2, url: "./images/destinations-1-1.jpg", label: "(5 Trips)", name: "City Tour" },
//   { id: 3, url: "./images/destinations-1-1.jpg", label: "(3 Trips)", name: "Cycling" },
//   { id: 4, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "Hiking" },
//   { id: 5, url: "./images/destinations-1-1.jpg", label: "(1 Trip)", name: "Jungle Safari" },
//   { id: 6, url: "./images/destinations-1-1.jpg", label: "(6 Trips)", name: "Peak Climbing" },
//   { id: 7, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Rafting" },
//   { id: 8, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "Skiing" },
//   { id: 9, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Trekking" },
// ];


const ITEM_PER_PAGE = 6

function Tour() {

   const {data, isLoading, isError} = useTourTypeFullData()

   const dataLenth = data ? data.length : 0

  const {
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    getCurrentPage
  } =  usePagination(ITEM_PER_PAGE, dataLenth)
      
  const listContent = data?.slice(indexOfFirstItem,indexOfLastItem)

  if (isLoading) return <p>Đang tải dữ liệu...</p>
  if (isError) return <p>Lỗi dữ liệu..</p>
  if (!data || data.length === 0) return <p>Không có dữ liệu</p>

  return (
    <>
      <Banner
        background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
        pageName={"Các loại tour"}
        thisPage={"/Các loại tour"}
      />
      <Container>
      <Grid>
          <GridRow margin="20px">
            {listContent?.map((item, index) => {
              return <GridCol col={4} key={index}>
                        <TourCard
                          url={"./images/destinations-1-1.jpg"}
                          label={String(item.numberOfTrip) + " trips"}
                          name={item.name}
                          current={['tour_type', item.id, item.name]}
                        />
                      </GridCol>
            })}
            <Pagination 
                itemsPerPage={ITEM_PER_PAGE} 
                totalPage={totalPages} 
                onChange={(value : number)=> {getCurrentPage(value)}} 
            />
          </GridRow>
        </Grid>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 100px 0;
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export default Tour;
