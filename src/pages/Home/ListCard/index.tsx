import styled, { keyframes } from "styled-components";
import { CenterBox, SupTitle, Text, Title } from "../../../styled";
import Carousel from "../../../Component/Carousel";
import Button from "../../../Component/BaseComponent/Button/Button";
import ScrollToShow from "../../../Component/ScrollToShow";
import TourCardDetail from "../../../Component/TourCardDetail";
import { useTour } from "../../../service/tourService";


interface ListCardProps {
  
}


const ListCard: React.FC<ListCardProps> = ({}) => {

  const { data: tours, loading: tourLoading, error: tourError } = useTour({
    quantity: 10
  });
  // Xử lý trạng thái tải hoặc lỗi
  if (tourLoading) return <p>Đang tải dữ liệu...</p>;
  if (tourError) return <p>Lỗi: {tourError}</p>;
  if (!tours || tours.length === 0) return <p>Không có dữ liệu.</p>;
  console.log(tours);

  const Sildes = tours.map((item, index) => {
    return (
      <TourCardDetail
        valueID={item.id}
        key={index}
        url={item.image}
        title={item.name}
        textLocation={item.countryName}
        textTime={item.duration}
        price={item.price.adult}
        textDensity={item.maxPeople}
        textLevel={item.adventureLevel}
        horizontal={false}
        textDescr={item.description}
        isDensity={false} type={item.tourTypeName}      />
    )});

  return (
    <Wrapper url="./images/Bg.png">
      <Plane src='./images/Plane.png'></Plane>
      <Circle><CircleImage></CircleImage></Circle>
      <Header>
        <ScrollToShow leftToRight><SupTitle orange>Chuyến tham quan tuyệt vời</SupTitle></ScrollToShow>
        <ScrollToShow rightToLeft><ListCardTitle big>Gói du lịch tốt nhất</ListCardTitle></ScrollToShow>
        <ScrollToShow bottomToTop><ListCardText small>Gói du lịch tốt nhất của chúng tôi đã được thiết kế đặc biệt để mang đến cho bạn trải nghiệm tuyệt vời nhất.</ListCardText></ScrollToShow>
      </Header>
      <ScrollToShow scale><Carousel slides={Sildes} autoSlide autoSlideInterval={3000}></Carousel></ScrollToShow>
      <ScrollToShow topToBottom><Button orange>Xem thêm</Button></ScrollToShow>
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

const AutoScaleAndHidden = keyframes`
0% {
transform: scale(0.9) ;
opacity: 0;
}
50% {
opacity: 1;
}
100% {
transform: scale(1) ;
opacity: 0;
}
`;

const Plane = styled.img`
  width: 200px;
  position: absolute;
  top: 100px;
  left: 10%;
  transition: all 8s linear;
  animation: ${AutoScaleAndHidden} 8s infinite ease-out;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 50px;
`;

const ListCardTitle = styled(Title)`
  text-align: center;
  width: 700px;
  margin: 20px 0;
`

const ListCardText = styled(Text)`
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

export default ListCard;
