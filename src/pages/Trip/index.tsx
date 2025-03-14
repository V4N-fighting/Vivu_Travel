import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol, GridRow, Title } from "../../styled";
import SideBar from "./SideBar";
import Content from "./Content";



function Trip() {

  return (
    <>
      <Banner
        background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
        pageName={"Lưu trữ: Trips"}
        thisPage={"/Tripss"}
      />
      <Container>
        <TitleTrip>Trips</TitleTrip>
        <Grid>
          <GridRow margin="10px">
            <GridCol col={3}>
              <SideBar />
            </GridCol>
            <GridCol col={9}>
              <Content />
            </GridCol>
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
`;

const TitleTrip = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #000000;
  margin: 20px 0;
`

export default Trip;
