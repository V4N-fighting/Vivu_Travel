import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { SupTitle, Title, Text, Wrapper } from "../../../styled";
import Button from "../../../Component/BaseComponent/Button/Button";
import Purify from "./Purify";
import { Link } from "react-router-dom";
import { useBanner } from "../../../service/bannerService";
import config from "../../../config";


const TIME_CHANGE = 4000;
const DEFAULT_BANNER_INDEX = 0;

const Banner: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(DEFAULT_BANNER_INDEX);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { data, loading, error } = useBanner()


  useEffect(() => {
    if (!data || data.length === 0) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, TIME_CHANGE);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data]); 

  const handleClick = (index: number) => {
    setActiveIndex(index); // Cập nhật active index
  };
  

  // Xử lý trạng thái tải hoặc lỗi
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!data || data.length === 0) return <p>Không có dữ liệu.</p>;

  const activeContent = data[activeIndex];

  return (
    <BannerWrapper>
      <Wrapper>
        <Container>
          <Content>
            <SupTitle medium orange>Lên đường ngay</SupTitle>
            <AnimatedTitle big>{activeContent?.textContent}</AnimatedTitle>
            <Text>Thiên nhiên đẹp mê hồn với rừng cây xanh mướt, dòng suối trong vắt và những cánh hoa rực rỡ.</Text>
            <Link to={config.routes.trip}>
              <Button orange>Đặt vé ngay</Button>
            </Link>
          </Content>
          <Content>
            <ImgWrapper1>
              <AnimatedImg src={activeContent?.firstImage} alt="Banner Image 1" />
            </ImgWrapper1>
            <ImgWrapper2>
              <AnimatedImg src={activeContent?.secondImage} alt="Banner Image 2" />
            </ImgWrapper2>
          </Content>
        </Container>
        <WrapperPavigation>
          <BannerPavigation>
            {data.map((item, index) => (
              <PavigationBtn key={item.id} onClick={() => handleClick(index)} style={{ backgroundColor: activeIndex === index ? '#FF681A' : '#ffffff', color:  activeIndex === index ? '#fff' : '#FF681A'}}>
                {item.id}
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

const AnimatedTitle = styled(Title)``;

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

const PavigationBtn = styled.button`
  position: relative;
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

  &:hover, &:focus {
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
