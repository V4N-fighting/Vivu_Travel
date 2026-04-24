import React from 'react';
import styled, { keyframes } from 'styled-components';
import TipItem from './Tip/TipItem';
import { CenterBox, SupTitle, Title } from '../../styled';
import ScrollToShow from '../../Component/ScrollToShow';

interface TipProps {
  
}

const tipItems = [
  {
    url: './images/6-2-705x540.jpg',
    label: 'Điểm đến biển',
    suptitle: '12 Tháng Mười Hai, 2023',
    title: 'Phú Quốc - Thiên đường biển đảo',
    text: 'Phú Quốc nổi bật với Bãi Sao, Bãi Khem và nước biển trong xanh, phù hợp cho nghỉ dưỡng và lặn ngắm san hô.',
  },
  {
    url: './images/7-2-705x540.jpg',
    label: 'Điểm đến núi',
    suptitle: '12 Tháng Mười Hai, 2023',
    title: 'Sa Pa - Trải nghiệm núi rừng Tây Bắc',
    text: 'Sa Pa hấp dẫn với ruộng bậc thang, bản làng vùng cao và cảnh quan Fansipan, lý tưởng cho trekking và săn mây.',
    reverse: true,
  },
];



const Tip: React.FC<TipProps> = ({}) => {
  return (
    <Wrapper>
      <Circle><CircleImage></CircleImage></Circle>
      <Header>
        <ScrollToShow topToBottom>
          <CenterBox>
            <SupTitle orange medium>Mẹo vặt cần thiết</SupTitle> 
            <TipTitle big>Những Mẹo Tuyệt Vời Làm Cho Chuyến Đi Của Bạn</TipTitle>
          </CenterBox>  
        </ScrollToShow>
      </Header>
      {tipItems.map((item, index) => (
        <ScrollToShow key={item.title} leftToRight={index === 0} rightToLeft={index === 1}>
          <TipItem
            reverse={item.reverse}
            url={item.url}
            label={item.label}
            suptitle={item.suptitle}
            title={item.title}
            text={item.text}
          />
        </ScrollToShow>
      ))}
      <Dot><DotImage></DotImage></Dot>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: 100px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 200px;
`;

const TipTitle = styled(Title)`
  width: 700px;
  margin: 40px 0;
`
const turnAround = keyframes`
    0% {
    transform: rotate(0deg) ;
  }
  100% {
    transform: rotate(360deg) ;
  }

`;

const turnUpTurnDown = keyframes`
  0% {
    transform: translateY(0) ;
  }
  50% {
    transform: translateY(40px) ;
  }
  100% {
    transform: translateY(0px) ;
  }
`;

const Dot = styled.div`
  width: 1024px;
  position: relative;
`
const DotImage = styled.div`
  position: absolute;
  bottom: 20px;
  right: -70px;
  width: 100px;
  height: 160px;
  animation: ${turnUpTurnDown} 5s infinite linear;
  background-image: url('./images/Dot.png');
  z-index: -1;
`


const Circle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-30%, -30%);
  width: 334px;
  height: 334px;
  
`

const CircleImage = styled.div`
  background-image: url('./images/circle1-1.png');
  width: 100%;
  height: 100%;
  animation: ${turnAround} 20s infinite linear;
  
`



export default Tip;
