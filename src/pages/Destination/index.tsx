import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol, GridRow } from "../../styled";
import TourCard from "../../Component/TourCard";
import Pagination from './../../Component/Pagination/index';
import { usePagination } from "../../Hooks/usePagination";
import { useDestination } from "../../service/destinationSerive";
import { useNavigate } from "react-router-dom";
import { PARAM } from "../../api/param";

const ITEM_PER_PAGE = 6

function Destination() {

  const {destinations, isLoading, isError} = useDestination()



  const dataLenth = destinations ? destinations.length : 0

  const {
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    getCurrentPage
  } =  usePagination(ITEM_PER_PAGE, dataLenth)

  
      
  const listContent = destinations && destinations.slice(indexOfFirstItem,indexOfLastItem)

  
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
                          current={[PARAM.DESTINATION, item.id, item.name]}
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
