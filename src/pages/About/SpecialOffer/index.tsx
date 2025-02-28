
import Button from "../../../Component/button/Button";
import Loader from "../Loader";
import { FlexBoxBetween, SupTitle, Title, Wrapper, Text } from "../../../styled";
import { styled } from 'styled-components';


interface SpecialOfferProps {
  
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({}) => {
  return (
    <Wrap>
      <Wrapper>
        <FlexBoxBetween>
        <Content>
            <SupTitle white small>Go & Discover</SupTitle>
            <Title white big>Nhận ưu đãi đặt biệt</Title>
            <Text white small>Khám phá những ưu đãi đặc biệt độc đáo và tiết kiệm hấp dẫn chỉ dành riêng cho bạn.</Text>
            <Button white >Tạo tài khoản</Button>
          </Content>
          <Content>
            <Loader />
          </Content>
        </FlexBoxBetween>
      </Wrapper>
    </Wrap>
  );
};

const Wrap = styled.div`
  padding: 30px 0;
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

export default SpecialOffer;
