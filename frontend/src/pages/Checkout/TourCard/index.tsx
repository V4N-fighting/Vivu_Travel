import React from "react";
import styled from "styled-components";
import { Title, Text } from "../../../styled";
import dayjs from "dayjs";

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
    originalTotal?: number;
    discount?: number;
    couponCode?: string;
  };
}

// Helper: format date nicely
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Chưa xác định';
  try {
    const d = dayjs(dateStr);
    if (!d.isValid()) return dateStr;
    return d.format('DD/MM/YYYY');
  } catch {
    return dateStr;
  }
};

// React Component
const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const hasDiscount = !!(tour.discount && tour.discount > 0);

  return (
    <Card>
      <Image src={tour.image} alt={tour.title} />
      <Content>
        <Title medium>{tour.title}</Title>
        <InfoRow>
          <InfoLabel>Code:</InfoLabel>
          <InfoValue><strong>{tour.code}</strong></InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Ngày đi:</InfoLabel>
          <InfoValue><strong>{formatDate(tour.startDate)}</strong></InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Thời gian:</InfoLabel>
          <InfoValue><strong>{tour.duration}</strong></InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Số du khách:</InfoLabel>
          <InfoValue><strong>{tour.counter} người</strong></InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>SĐT liên lạc:</InfoLabel>
          <InfoValue><strong>{user?.phone || 'Chưa cập nhật'}</strong></InfoValue>
        </InfoRow>
        <InfoRow>
          <InfoLabel>Người liên lạc:</InfoLabel>
          <InfoValue><strong>{user?.fullName || user?.username || 'Khách hàng'}</strong></InfoValue>
        </InfoRow>

        <Divider />

        {/* Price breakdown */}
        {((hasDiscount || tour.couponCode) && tour.originalTotal) ? (
          <>
            <InfoRow>
              <InfoLabel>Giá gốc:</InfoLabel>
              <InfoValue style={{ textDecoration: 'line-through', color: '#999' }}>
                {new Intl.NumberFormat('vi-VN').format(tour.originalTotal)} đ
              </InfoValue>
            </InfoRow>
            {hasDiscount ? (
              <InfoRow>
                <InfoLabel>Giảm giá:</InfoLabel>
                <InfoValue style={{ color: '#52c41a' }}>
                  -{new Intl.NumberFormat('vi-VN').format(tour.discount || 0)} đ
                </InfoValue>
              </InfoRow>
            ) : null}
            {tour.couponCode && (
              <InfoRow>
                <InfoLabel>Mã KM:</InfoLabel>
                <InfoValue>
                  <CouponBadge>{tour.couponCode}</CouponBadge>
                </InfoValue>
              </InfoRow>
            )}
          </>
        ) : null}

        <PriceRow>
          <PriceLabel>Tổng cộng:</PriceLabel>
          <Price>{new Intl.NumberFormat('vi-VN').format(tour.price)} đ</Price>
        </PriceRow>
      </Content>
    </Card>
  );
};

// Styled Components
const Card = styled.div`
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 12px;
  overflow: hidden;
  position: sticky;
  top: 100px;
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 6px;
`;

const InfoLabel = styled.span`
  font-size: 13px;
  color: #666;
  min-width: 110px;
  flex-shrink: 0;
`;

const InfoValue = styled.span`
  font-size: 13px;
  color: #333;
  flex: 1;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 14px 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const PriceLabel = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #333;
`;

const Price = styled.div`
  font-size: 22px;
  color: #d32f2f;
  font-weight: bold;
`;

const CouponBadge = styled.span`
  background: #fff3e0;
  color: #e65100;
  border: 1px dashed #e65100;
  border-radius: 4px;
  padding: 1px 8px;
  font-size: 12px;
  font-weight: 600;
`;

export default TourCard;