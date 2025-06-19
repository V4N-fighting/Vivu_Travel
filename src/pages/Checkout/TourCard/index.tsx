import React from "react";
import styled from "styled-components";
import { Title, Text } from "../../../styled";



// Props Type
interface TourCardProps {
  tour: {
    image: string;
    title: string;
    code: string;
    startDate: string;
    counter: number;
    duration: string;
    price: number;
  };
}

// React Component
const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <Card>
      <Image src={tour.image} alt={tour.title} />
      <Content>
        <Title medium>{tour.title}</Title>
        <Text>Code: <strong>{tour.code}</strong> </Text>
        <Text>Ngày đi: <strong>{tour.startDate}</strong> </Text>
        <Text>Thời gian: <strong>{tour.duration} ngày</strong> </Text>
        <Text>Số du khách: <strong>{tour.counter} người</strong> </Text>
        <Text>Số điện thoại liên lạc: <strong>*Lấy trong data người dùng*</strong> </Text>
        <Text>Người chịu trách nhiệm liên lạc: <strong>*Lấy trong data người dùng*</strong> </Text>
        
        <Price>
          Tổng: {tour.price.toLocaleString()} đ
        </Price>
      </Content>
    </Card>
  );
};

// Styled Components
const Card = styled.div`
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;



const Price = styled.div`
  font-size: 26px;
  color: #d32f2f;
  font-weight: bold;
  margin-top: 40px;
`;


export default TourCard;