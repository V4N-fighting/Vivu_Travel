import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol, GridRow } from "../../styled";
import TourCard from "../../Component/TourCard";
import Pagination from './../../Component/Pagination/index';
import { usePagination } from "../../Hooks/usePagination";
import { useCountry } from "../../service/countryService";
import { useDestination } from "../../service/destinationSerive";

// Dữ liệu mẫu
// const destinations = [
//   { id: 1, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "England" },
//   { id: 2, url: "./images/destinations-1-1.jpg", label: "(5 Trips)", name: "France" },
//   { id: 3, url: "./images/destinations-1-1.jpg", label: "(3 Trips)", name: "Italy" },
//   { id: 4, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "Germany" },
//   { id: 5, url: "./images/destinations-1-1.jpg", label: "(1 Trip)", name: "Spain" },
//   { id: 6, url: "./images/destinations-1-1.jpg", label: "(6 Trips)", name: "USA" },
//   { id: 7, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Canada" },
//   { id: 8, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "China" },
//   { id: 9, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Japan" },
//   { id: 10, url: "./images/destinations-1-1.jpg", label: "(3 Trips)", name: "Australia" },
//   { id: 11, url: "./images/destinations-1-1.jpg", label: "(7 Trips)", name: "India" },
// ];

const ITEM_PER_PAGE = 6

function Destination() {

  const {data, isLoading, isError} = useDestination()



  const dataLenth = data ? data.length : 0

  const {
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    getCurrentPage
  } =  usePagination(ITEM_PER_PAGE, dataLenth)

  
      
  const listContent = data && data.slice(indexOfFirstItem,indexOfLastItem)

  if (isLoading) {
    return <>"Đang tải...."</>
  }

  if (isError) {
    return <>"Có lỗi xảy ra..."</>
  }

  return (
    <>
      <Banner
        background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
        pageName={"Các điểm đến"}
        thisPage={"/Các điểm đến"}
      />
      <Container>
        <Grid>
          <GridRow margin="20px">
            {listContent?.map((item, index) => {
              return <GridCol col={4} key={index}>
                        <TourCard
                          url="./images/destinations-1-1.jpg"
                          label={item.numberOfTrip + ' trips'}
                          name={item.name}
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



export default Destination;
