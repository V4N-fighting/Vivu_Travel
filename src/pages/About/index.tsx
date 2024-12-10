import styled from "styled-components";
import Banner from "../../Component/Banner";
import Intro from "./Intro";
import News from "../Home/News";
import SpecialOffer from "./SpecialOffer";
import Loader from "./Loader";
import ReviewCard from "../../Component/ReviewCard";
import Review from "./Review";


function About() {
    return ( 
        <AboutPage>
            <Banner 
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"} 
                pageName={"About"} 
                thisPage={"/about"}
            />
            <Intro 
                mainImg={"https://wordpress.vecurosoft.com/travolo/wp-content/uploads/2023/11/img-2-1.jpg"} 
                circleImg={"https://wordpress.vecurosoft.com/travolo/wp-content/uploads/2023/11/img-2-2.jpg"} 
            />
            <SpecialOffer />
            <Review />
            <News/>
        </AboutPage>
    );
}

const AboutPage = styled.div`
`

export default About;