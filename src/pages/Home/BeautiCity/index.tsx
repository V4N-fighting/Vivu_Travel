import styled, { keyframes } from "styled-components";
import { Grid, GridCol, GridRow, SupTitle, Text, Title } from "../../../styled";
import ScrollToShow from "../../../Component/ScrollToShow";
import TourCard from "../../../Component/TourCard";
import Carousel from "../../../Component/Carousel";


interface BeautiCityProps {
  
}

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



const BeautiCity: React.FC<BeautiCityProps> = ({}) => {

  
  const listContent = activities.map((activity, index) => (
    
      <TourCard
        key={index}
        url={activity.url}
        label={activity.label}
        name={activity.name}
      />
    
  ))


  return (
    <Wrapper url="./images/Bg.png">
      <Circle><CircleImage></CircleImage></Circle>
      <Header>
        <ScrollToShow leftToRight><SupTitle orange>Đi & Khám phá</SupTitle></ScrollToShow>
        <ScrollToShow rightToLeft><BeautiCityTitle big>Những thành phố đẹp</BeautiCityTitle></ScrollToShow>
        <ScrollToShow bottomToTop><BeautiCityText small>Khám phá những thành phố đẹp trên thế giới, nơi sự kết hợp hoàn hảo giữa kiến trúc tuyệt vời, văn hóa đa dạng và cuộc sống sôi động tạo nên những trải nghiệm đáng nhớ.</BeautiCityText></ScrollToShow>
      </Header>
      <ScrollToShow scale fullWidth><Carousel slides={listContent} autoSlide autoSlideInterval={3000}></Carousel></ScrollToShow>
     
    </Wrapper>
  );
};

const Wrapper = styled.div<{url: string}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: 100px;
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;


const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const BeautiCityTitle = styled(Title)`
  text-align: center;
  width: 700px;
  margin: 20px 0;
`

const BeautiCityText = styled(Text)`
  text-align: center;
  width: 700px;
`

const turnAround = keyframes`
    0% {
    transform: rotate(0deg) ;
  }
  100% {
    transform: rotate(360deg) ;
  }

`;


const Circle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(30%, 30%);
  width: 334px;
  height: 334px;
`

const CircleImage = styled.div`
  background-image: url('./images/circle1-1.png');
  width: 100%;
  height: 100%;
  animation: ${turnAround} 20s infinite linear;
  
`

export default BeautiCity;
