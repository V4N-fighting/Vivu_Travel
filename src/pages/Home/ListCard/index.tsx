import styled, { keyframes } from "styled-components";
import { CenterBox, SupTitle, Text, Title } from "../../../styled";
import Carousel from "../../../Component/Carousel";
import Button from "../../../Component/button/Button";
import ScrollToShow from "../../../Component/ScrollToShow";
import TourCardDetail from "../../../Component/TourCardDetail";


interface ListCardProps {
  
}



const ListCard: React.FC<ListCardProps> = ({}) => {

 

  const listContent = [
    <TourCardDetail 
      key='1'
      url={"./images/4-900x490.jpg"}
      title={"Maldives: The Travel and Experience of the Lifetime"}
      textLocation={"Colombo, England, France"}
      textTime={"8 Ngày - 6 Đêm"}
      price={"100,000đ"}
      textDensity={'1-3 người'}
      textLevel={'Trung bình'}
      horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}
      isDensity={false}  />,
      
    <TourCardDetail 
      key='2'
      url={"./images/4-900x490.jpg"}
      title={"Maldives: The Travel and Experience of the Lifetime"}
      textLocation={"Colombo, England, France"}
      textTime={"8 Ngày - 6 Đêm"}
      price={"200,000đ"}
      textDensity={'1-3 người'}
      textLevel={'Trung bình'}
      horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  
      isDensity={false}/>,
    <TourCardDetail 
      key='3'
      url={"./images/4-900x490.jpg"}
      title={"Maldives: The Travel and Experience of the Lifetime"}
      textLocation={"Colombo, England, France"}
      textTime={"8 Ngày - 6 Đêm"}
      price={"300,000đ"}
      textDensity={'1-3 người'}
      textLevel={'Trung bình'}
      horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  
      isDensity={false}/>,
    <TourCardDetail 
      key='4'
      url={"./images/4-900x490.jpg"}
      title={"Maldives: The Travel and Experience of the Lifetime"}
      textLocation={"Colombo, England, France"}
      textTime={"8 Ngày - 6 Đêm"}
      price={"400,000đ"}
      textDensity={'1-3 người'}
      textLevel={'Trung bình'}
      horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  
      isDensity={false}/>,
    <TourCardDetail 
      key='5'
      url={"./images/4-900x490.jpg"}
      title={"Maldives: The Travel and Experience of the Lifetime"}
      textLocation={"Colombo, England, France"}
      textTime={"8 Ngày - 6 Đêm"}
      price={"500,000đ"}
      textDensity={'1-3 người'}
      textLevel={'Trung bình'}
      horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  
      isDensity={false}/>,
  ];

 



  return (
    <Wrapper url="./images/Bg.png">
      <Plane src='./images/Plane.png'></Plane>
      <Circle><CircleImage></CircleImage></Circle>
      <Header>
        <ScrollToShow leftToRight><SupTitle orange>Chuyến tham quan tuyệt vời</SupTitle></ScrollToShow>
        <ScrollToShow rightToLeft><ListCardTitle big>Gói du lịch tốt nhất</ListCardTitle></ScrollToShow>
        <ScrollToShow bottomToTop><ListCardText small>Gói du lịch tốt nhất của chúng tôi đã được thiết kế đặc biệt để mang đến cho bạn trải nghiệm tuyệt vời nhất.</ListCardText></ScrollToShow>
      </Header>
      <ScrollToShow scale><Carousel slides={listContent} autoSlide autoSlideInterval={3000}></Carousel></ScrollToShow>
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
