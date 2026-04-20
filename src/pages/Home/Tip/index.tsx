import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Select } from 'antd';
import TipItem from './TipItem';
import { CenterBox, SupTitle, Title } from '../../../styled';
import ScrollToShow from '../../../Component/ScrollToShow';

const { Option } = Select;

interface TipProps {
  
}



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
      <ScrollToShow leftToRight><TipItem  url={'./images/6-2-705x540.jpg'} label={'Camera'} suptitle={'12 Tháng Mười Hai, 2023'} title={'10 Sun Hats For Beach Days, Long Hikes, And'} text={'Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit'} ></TipItem></ScrollToShow>
      <ScrollToShow rightToLeft>
        <TipItem reverse url={'./images/7-2-705x540.jpg'} label={'Camera'} suptitle={'12 Tháng Mười Hai, 2023'} title={'10 Sun Hats For Beach Days, Long Hikes, And'} text={'Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit'} ></TipItem>
        
      </ScrollToShow><Dot><DotImage></DotImage></Dot>
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
