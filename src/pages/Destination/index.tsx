import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol_4, GridRow } from "../../styled";
import TourCard from "../../Component/TourCard";
import Pagination from './../../Component/Pagination/index';

// Dữ liệu mẫu
const destinations = [
  { id: 1, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "England" },
  { id: 2, url: "./images/destinations-1-1.jpg", label: "(5 Trips)", name: "France" },
  { id: 3, url: "./images/destinations-1-1.jpg", label: "(3 Trips)", name: "Italy" },
  { id: 4, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "Germany" },
  { id: 5, url: "./images/destinations-1-1.jpg", label: "(1 Trip)", name: "Spain" },
  { id: 6, url: "./images/destinations-1-1.jpg", label: "(6 Trips)", name: "USA" },
  { id: 7, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Canada" },
  { id: 8, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "China" },
  { id: 9, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Japan" },
  { id: 10, url: "./images/destinations-1-1.jpg", label: "(3 Trips)", name: "Australia" },
  { id: 11, url: "./images/destinations-1-1.jpg", label: "(7 Trips)", name: "India" },
];



function Destination() {
  return (
    <>
      <Banner
        background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
        pageName={"Các điểm đến"}
        thisPage={"/Các điểm đến"}
      />
      <Container>
        <Pagination 
          items={destinations} 
          itemsPerPage={9} 
          scrollToTop={650}
          renderItems={(curItems) => (
            <Grid>
              <GridRow margin="20px">
                {curItems.map((destination, index) => (
                  <GridCol_4 key={index}>
                    <TourCard
                      url={destination.url}
                      label={destination.label}
                      name={destination.name}
                    />
                  </GridCol_4>
                ))}
              </GridRow>
            </Grid>
          )} 
        />
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
