import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol,  GridRow } from "../../styled";
import TourCard from "../../Component/TourCard";
import Pagination from "../../Component/Pagination";
import { usePagination } from "../../Hooks/usePagination";
import { useActivityFullData } from "../../service/activitiesService";
import { PARAM } from "../../api/param";


const ITEM_PER_PAGE = 6;

function Activity() {
  const {data, isLoading, isError} = useActivityFullData()

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
        pageName={"Các hoạt động"}
        thisPage={"/Các hoạt động"}
      />
      <Container>
        <Grid>
          <GridRow margin="20px">
            {listContent?.map((item, index) => {
              return <GridCol col={4} key={index}>
                        <TourCard
                          url={ "./images/destinations-1-1.jpg"}
                          label={String(item.numberOfTrip) + " trips"}
                          name={item.name}
                          current={[PARAM.ACTIVITY, item.id, item.name]}
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


export default Activity;
