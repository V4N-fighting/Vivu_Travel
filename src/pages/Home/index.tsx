import styled from "styled-components";
import Banner from "./Banner";
import Tip from "./Tip";
import ListCard from "./ListCard";



function Home() {
    return ( 
        <HomePage>
            <Banner></Banner>
            <Tip></Tip>
            <ListCard></ListCard>
        </HomePage>
    );
}

const HomePage = styled.div`
    height: 5000px;
`

export default Home;