import styled, { keyframes } from "styled-components";
import { SubTitle, Text, Title } from "../../../styled";
import ScrollToShow from "../../../Component/ScrollToShow";
import Item from "./Item";


interface BeautiCityProps {
  
}



const BeautiCity: React.FC<BeautiCityProps> = ({}) => {

  



  return (
    <Wrapper url="./images/Bg.png">
      <Circle><CircleImage></CircleImage></Circle>
      <Header>
        <ScrollToShow leftToRight><SubTitle>Đi & Khám phá</SubTitle></ScrollToShow>
        <ScrollToShow rightToLeft><BeautiCityTitle>Những thành phố đẹp</BeautiCityTitle></ScrollToShow>
        <ScrollToShow bottomToTop><BeautiCityText>Khám phá những thành phố đẹp trên thế giới, nơi sự kết hợp hoàn hảo giữa kiến trúc tuyệt vời, văn hóa đa dạng và cuộc sống sôi động tạo nên những trải nghiệm đáng nhớ.</BeautiCityText></ScrollToShow>
      </Header>
      <ScrollToShow scale>
        <Content>
          <Item url={"./images/destinations-1-1.jpg"} label={"(2 Trips)"} name={"England"}/>
          <Item url={"./images/destinations-1-2.jpg"} label={"(1 Trips)"} name={"France"}/>
          <Item url={"./images/destinations-1-3.jpg"} label={"(1 Trips)"} name={"Russia"}/>
        </Content>
      </ScrollToShow>
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
  font-size: 16px;
`

const turnAround = keyframes`
    0% {
    transform: rotate(0deg) ;
  }
  100% {
    transform: rotate(360deg) ;
  }

`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -15px;
  padding: 40px 0;
`


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
