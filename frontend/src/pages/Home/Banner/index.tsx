import React from "react";
import styled from "styled-components";
import { SupTitle, Title, Text, Wrapper } from "../../../styled";
import Button from "../../../Component/BaseComponent/Button/Button";
import { Link } from "react-router-dom";
import config from "../../../config";

const Banner: React.FC = () => {
  return (
    <BannerWrapper>
      <Wrapper>
        <Container>
          <Content
            style={{
              width: "100%",
              maxWidth: "800px",
              margin: "0 auto",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SupTitle medium orange>
              Lên đường ngay
            </SupTitle>
            <AnimatedTitle big>Khám Phá Thế Giới Cùng Vivu Travel</AnimatedTitle>
            <Text style={{ textAlign: "center" }}>
              Thiên nhiên đẹp mê hồn với rừng cây xanh mướt, dòng suối trong vắt
              và những cánh hoa rực rỡ.
            </Text>
            <Link to={config.routes.trip}>
              <Button orange>Đặt vé ngay</Button>
            </Link>
          </Content>
        </Container>
      </Wrapper>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 80px;
  background-image: url("/images/banner-bg-1.png");
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

export default Banner;
