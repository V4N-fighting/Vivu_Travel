import styled from "styled-components";
import Purity from "./Purity";
import Banner from "./Banner";



function Home() {
    return ( 
        <HomePage>
            <Banner></Banner>
        </HomePage>
    );
}

const HomePage = styled.div`
    height: 5000px;
    background-color: rgba(233, 90, 45, 0.4)
`

export default Home;