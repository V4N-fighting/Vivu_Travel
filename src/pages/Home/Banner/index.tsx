import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { SupTitle, Title, Text, Wrapper } from "../../../styled";
import Button from "../../../Component/button/Button";
import Purify from "./Purify";
import { Link } from "react-router-dom";
import { useFetch } from "../../../Hooks/useFetch";
import { GET_BANNER } from "../../../api";

interface BannerItem {
  id: number;
  textContent: string;
  img1: string;
  img2: string;
}

const Banner: React.FC = () => {
  const { data, loading, error } = useFetch<BannerItem[]>(GET_BANNER);
  const [activeId, setActiveId] = useState<number | null>(null);

  // Cập nhật banner đầu tiên khi có dữ liệu
  useEffect(() => {
    if (data && data.length > 0) {
      setActiveId(data[0].id);
    }
  }, [data]);

  // Tự động đổi banner mỗi 5 giây
  useEffect(() => {
    if (!data || data.length === 0 || activeId === null) return;

    const interval = setInterval(() => {
      const currentIndex = data.findIndex((item) => item.id === activeId);
      const nextIndex = (currentIndex + 1) % data.length;
      setActiveId(data[nextIndex].id);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeId, data]);

  // Giữ handleClick cố định giữa các lần render
  const handleClick = useCallback((id: number) => {
    setActiveId(id);
  }, []);

  // Xử lý trạng thái tải hoặc lỗi
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!data || data.length === 0) return <p>Không có dữ liệu.</p>;

  const activeContent = data.find((item) => item.id === activeId);

  return (
    <BannerWrapper>
      <Wrapper>
        <Container>
          <Content>
            <SupTitle medium orange>Lên đường ngay</SupTitle>
            <AnimatedTitle big>{activeContent?.textContent}</AnimatedTitle>
            <Text>Thiên nhiên đẹp mê hồn với rừng cây xanh mướt, dòng suối trong vắt và những cánh hoa rực rỡ.</Text>
            <Link to={"/trips"}>
              <Button orange>Đặt vé ngay</Button>
            </Link>
          </Content>
          <Content>
            <ImgWrapper1>
              <AnimatedImg src={activeContent?.img1} alt="Banner Image 1" />
            </ImgWrapper1>
            <ImgWrapper2>
              <AnimatedImg src={activeContent?.img2} alt="Banner Image 2" />
            </ImgWrapper2>
          </Content>
        </Container>
        <WrapperPavigation>
          <BannerPavigation>
            {data.map((item) => (
              <PavigationBtn key={item.id} isActive={activeId === item.id} onClick={() => handleClick(item.id)}>
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

const PavigationBtn = styled.button<{ isActive: boolean }>`
  position: relative;
  background-color: ${(props) => (props.isActive ? '#FF681A' : '#ffffff')};
  color: ${(props) => (props.isActive ? '#ffffff' : '#FF681A')};
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
