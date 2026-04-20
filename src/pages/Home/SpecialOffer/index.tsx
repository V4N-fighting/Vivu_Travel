
import Button from "../../../Component/BaseComponent/Button/Button";
import { RowBetween, SupTitle, Title, Wrapper, Text } from "../../../styled";
import { styled } from 'styled-components';


interface SpecialOfferProps {
  
}



const SpecialOffer: React.FC<SpecialOfferProps> = ({}) => {
  return (
    <Wrap>
      <Wrapper>
        <RowBetween>
        <Content>
            <SupTitle white small>Go & Discover</SupTitle>
            <Title white big>Ưu đãi đặt biệt</Title>
            <Text white small>Khám phá những ưu đãi đặc biệt độc đáo và tiết kiệm hấp dẫn chỉ dành riêng cho bạn.</Text>
            <Button white >Đặt vé ngay</Button>
          </Content>
          <Content>
            <ImageBox>
              <Box1>
                <Image src="./images/offer-1-1.png"></Image>
              </Box1>
              <Box2>
                <Image src="./images/bag.png"></Image>
              </Box2>
            </ImageBox>
          </Content>
        </RowBetween>
      </Wrapper>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 120px 0 90px;
  background-image: url('./images/offer-bg.jpg') ;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
`

const Content = styled.div`
  flex: 0 0 auto;
  width: 41.67%;
  padding: 15px;
`
const ImageBox = styled.div`

`
const Box1 = styled.div`
`
const Box2 = styled.div`
  position: absolute;
    right: 0;
    bottom: 0;
    width: 320px;
`
const Image = styled.img`
    max-width: 100%;
    height: auto;
    border: none;
    border-radius: 0;
    box-shadow: none;
`





export default SpecialOffer;
