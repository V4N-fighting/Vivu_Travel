import styled from "styled-components";
import Banner from "./Banner";
import Tip from "./Tip";
import ListCard from "./ListCard";
import BestCity from "./BestCity";
import ListFeatures from "./ListFeatures";
import SpecialOffer from "./SpecialOffer";
import BeautiCity from "./BeautiCity";
import Feedback from "./Feedback";
import News from "./News";



function Home() {
    return ( 
        <HomePage>
            <Banner/>
            <Tip/>
            <ListCard/>
            <BestCity/>
            <ListFeatures/>
            <SpecialOffer/>
            <BeautiCity/>
            <Feedback/>
            <News/>
        </HomePage>
    );
}

const HomePage = styled.div`
`

export default Home;