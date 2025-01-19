import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol_4, GridRow } from "../../styled";
import { useState } from "react";
import TourCard from "../../Component/TourCard";
import Pagination from "../../Component/Pagination";

// Dữ liệu mẫu
const activities = [
  { id: 1, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Boating" },
  { id: 2, url: "./images/destinations-1-1.jpg", label: "(5 Trips)", name: "City Tour" },
  { id: 3, url: "./images/destinations-1-1.jpg", label: "(3 Trips)", name: "Cycling" },
  { id: 4, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "Hiking" },
  { id: 5, url: "./images/destinations-1-1.jpg", label: "(1 Trip)", name: "Jungle Safari" },
  { id: 6, url: "./images/destinations-1-1.jpg", label: "(6 Trips)", name: "Peak Climbing" },
  { id: 7, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Rafting" },
  { id: 8, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "Skiing" },
  { id: 9, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Trekking" },
  { id: 10, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Trekking" },
];



function Activity() {
  return (
    <>
      <Banner
        background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
        pageName={"Các hoạt động"}
        thisPage={"/Các hoạt động"}
      />
      <Container>
        <Pagination 
          items={activities} 
          itemsPerPage={9} 
          scrollToTop={650}
          renderItems={(curItems) => (
            <Grid>
              <GridRow margin="20px">
                {curItems.map((activity, index) => (
                  <GridCol_4 key={index}>
                    <TourCard
                      url={activity.url}
                      label={activity.label}
                      name={activity.name}
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


export default Activity;
