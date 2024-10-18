import styled from "styled-components";
import Banner from "./Banner";
import Tip from "./Tip";
import ListCard from "./ListCard";
import BestCity from "./BestCity";
import ListFeatures from "./ListFeatures";



function Home() {
    return ( 
        <HomePage>
            <Banner></Banner>
            <Tip></Tip>
            <ListCard></ListCard>
            <BestCity></BestCity>
            <ListFeatures></ListFeatures>
        </HomePage>
    );
}

const HomePage = styled.div`
    height: 5000px;
`

export default Home;