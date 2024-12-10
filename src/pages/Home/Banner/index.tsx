import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
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
  },
];

const Banner: React.FC = () => {
  const [activeBtn, setActiveBtn] = useState<number>(1);

  const handleClick = (value: number) => {
    setActiveBtn(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBtn((prev) => (prev % contentBanner.length) + 1);
    }, 5000); // Tự chuyển sau mỗi 5 giây

    return () => clearInterval(interval); // Xóa bộ đếm thời gian khi unmount
  }, [activeBtn]);

  const { textContent, img1, img2 } = contentBanner[activeBtn - 1];

  

  return (
    <BannerWrapper>
      <Wrapper>
        <Container>
          <Content>
            <SubTitle>Lên đường ngay</SubTitle>
            <AnimatedTitle>{textContent}</AnimatedTitle>
            <Text>Thiên nhiên đẹp mê hồn với rừng cây xanh mướt, dòng suối trong vắt và những cánh hoa rực rỡ. Mỗi khoảnh khắc đều mang lại cảm giác bình yên và tươi mới.</Text>
            <Button orange>Đặt vé ngay</Button>
          </Content>
          <Content>
            <ImgWrapper1>
              <AnimatedImg src={img1} alt="Banner Image 1" />
            </ImgWrapper1>
            <ImgWrapper2>
              <AnimatedImg src={img2} alt="Banner Image 2" />
            </ImgWrapper2>
          </Content>
        </Container>
        <WrapperPavigation>
          <BannerPavigation>
            {contentBanner.map((value) => (
              <PavigationBtn
                key={value.index}
                isActive={activeBtn === value.index}
                onClick={() => handleClick(value.index)}
              >
                {value.index}
              </PavigationBtn>
            ))}
          </BannerPavigation>
        </WrapperPavigation>
      </Wrapper>
      <Purify />
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 80px;
  background-image: url('./images/banner-bg-1.png');
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

const AnimatedTitle = styled(Title)`
`;

const ImgWrapper1 = styled.div`
  width: 70%;
`;

const ImgWrapper2 = styled.div`
  width: 50%;
  position: absolute;
  top: 60%;
  right: 0;
  transform: translateY(-50%);
`;

const AnimatedImg = styled.img`
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
