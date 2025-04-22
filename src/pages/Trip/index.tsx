import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol, GridRow, Title } from "../../styled";
import SideBar from "./SideBar";
import Content from "./Content";
import { useState } from "react";



function Trip() {
  const [price, setPrice] = useState<[number, number]>()
  const [day, setDay] = useState<[number, number]>()
  const [destinationID, setDestinationID] = useState<string[]>([])
  const [activityID, setActivityID] = useState<string[]>([])
  const [typeID, setTypeID] = useState<string[]>([])
  
  const handlefilterByPrice = (val: [number, number]) => {
    setPrice(val);
  }

  const handlefilterByTime = (val: [number, number]) => {
    setDay(val);
  }
  
  const handleCheckDestination = (isChecked: boolean, val: string) => {
    if (isChecked) {
      setDestinationID(prev => [...prev, val]);
    } else {
      const newDestinationID = destinationID.filter(item => item !== val);
      setDestinationID(newDestinationID);
    }
  };
  

  const handleCheckActivity = (isChecked: boolean, val: string) => {
    if (isChecked) {
      setActivityID(prev => [...prev, val]);
    } else {
      const newActivityID = activityID.filter(item => item !== val);
      setActivityID(newActivityID);
    }
  };
  

  const handleCheckType = (isChecked: boolean, val: string) => {
    
    if (isChecked) {
      setTypeID(prev => [...prev, val])
    } else {
      const NewTypeID = typeID.filter(item => item !== val)
      setTypeID(NewTypeID)
    }
  }

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
              <SideBar
                onFilterByPrice = {handlefilterByPrice}
                onFilterByTime = {handlefilterByTime}
                onCheckDestination = {handleCheckDestination} 
                onCheckActivity = {handleCheckActivity} 
                onCheckType = {handleCheckType} 
              />
            </GridCol>
            <GridCol col={9}>
              <Content destinationIDs={destinationID} activityIDs={activityID} typeIDs={typeID} price={price} time={day} />
            </GridCol>
          </GridRow>
        </Grid>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding:  50px 0 100px;
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
