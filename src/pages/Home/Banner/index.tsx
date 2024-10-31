import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { SubTitle, Title, Text, Wrapper } from '../../../styled';
import Button from '../../../Component/button/Button';
import Purify from './Purify';

const contentBanner = [
  {
    index: 1,
    textContent: "Khám phá thế giới",
    img1: './images/banner-img-1-1.jpg',
    img2: './images/banner-img-1-2.jpg',
  },
  {
    index: 2,
    textContent: "Vẻ đẹp thiên nhiên",
    img1: './images/banner-img-2-1.jpg',
    img2: './images/banner-img-2-2.jpg',
  },
  {
    index: 3,
    textContent: "Lịch sử & văn hóa",
    img1: './images/banner-img-3-1.jpg',
    img2: './images/banner-img-3-2.jpg',
  }
];

const Banner: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState<number>(1);

  const title = contentBanner.find(value => value.index === activeBtn)?.textContent || '';
  const img1 = contentBanner.find(value => value.index === activeBtn)?.img1 || '';
  const img2 = contentBanner.find(value => value.index === activeBtn)?.img2 || '';

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBtn(prevActiveBtn => (prevActiveBtn % contentBanner.length) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (value: number) => {
    setActiveBtn(value);
  };

 

  return (
    <BannerWrapper url='./images/banner-bg-1.png'>
      <Wrapper>
        <Container>
          <Content>
            <SubTitle>Lên đường ngay</SubTitle>
            <Title>{title}</Title>
            <Text>Thiên nhiên đẹp mê hồn với rừng cây xanh mướt, dòng suối trong vắt và những cánh hoa rực rỡ. Mỗi khoảnh khắc đều mang lại cảm giác bình yên và tươi mới.</Text>
            <Button orange>Đặt vé ngay</Button>
          </Content>
          <Content>
            <ImgWrapper1><Img src={img1}></Img></ImgWrapper1>
            <ImgWrapper2><Img src={img2}></Img></ImgWrapper2>
          </Content>
        </Container>
        <WrapperPavigation>
          <BannerPavigation>
            {[1, 2, 3].map((value, index) => {
              return (
                <PavigationBtn 
                  key={index} 
                  isActive={activeBtn === value} 
                  onClick={() => handleClick(value)}
                >
                  {value}
                </PavigationBtn>
              );
            })}
          </BannerPavigation>
        </WrapperPavigation>
        
      </Wrapper>
      <Purify />
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div<{ url: string }>`
  padding-top: 100px;
  padding-bottom: 80px;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  position: relative;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -15px;
`;

const Content = styled.div`
  flex: 0 0 auto;
  width: 50%;
  max-width: 100%;
  margin: 0 13px;
  position: relative;
`;

const ImgWrapper1 = styled.div<{ small?: boolean }>`
  width: 70%;
`;

const ImgWrapper2 = styled.div<{ small?: boolean }>`
  width: 50%;
  position: absolute;
  top: 60%;
  right: 0;
  transform: translateY(-50%);
`;

const Img = styled.img`
  width: 100%;
  border-radius: 340px;
  background-color: white;
  border: 20px solid white;
  display: inline-block;
`;

const WrapperPavigation = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PavigationBtn = styled.button<{ isActive: boolean }>`
  position: relative;
  background-color: ${props => props.isActive ? '#FF681A' : '#ffffff'};
  color:  ${props => props.isActive ? '#ffffff' : '#FF681A'};
  text-decoration: none;
  text-align: center;
  font-weight: 900;
  font-size: 20px;
  line-height: 1;
  outline: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  border-radius: 99px;
  border: none;
  vertical-align: middle;
  display: inline-block;
  width: 60px;
  height: 60px;
  margin: 0 15px;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  -webkit-transition: 0.3s all ease;
  transition: 0.3s ease all;

  &:hover {
    color: #FFF;
    background-color: #FF681A;
  }

  &:focus {
    color: #FFF;
    background-color: #FF681A;
  }
`;

const BannerPavigation = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: calc(15px * 4 + 60px * 2);
    height: 4px;
    background-color: #FF681A;
    display: block;
    left: 40px;
    top: 30px;
  }
`;

export default Banner;
