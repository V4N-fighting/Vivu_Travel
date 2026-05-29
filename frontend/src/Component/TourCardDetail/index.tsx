import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Title, Text, UnifiedCardWrapper } from '../../styled';
import Button from '../BaseComponent/Button/Button';
import Icons from '../BaseComponent/Icons';
import { useNavigate } from 'react-router-dom';
import config from '../../config';
import { GET_IMAGE_URL } from '../../api';

interface TourCardDetailProps {
    valueID: string,
    url: string,  
    title: string, 
    textLocation: string,
    textTime: string,
    textDescr: string,
    textDensity: string,
    textLevel: string,
    price: string,
    type: string,
    horizontal?: boolean,
    isDensity?: boolean,
    nextTour?: string[]
}

const TourCardDetail: React.FC<TourCardDetailProps> = 
({valueID, 
  url, 
  price, 
  textLocation, 
  title, 
  textTime, 
  textDensity, 
  textLevel, 
  horizontal = false, 
  textDescr, 
  isDensity = true, 
  type,
  nextTour
}) => {
  const [isfullYear, setIsFullYear] = useState<boolean>(true)

  const navigate = useNavigate();

  const imageUrl = (() => {
    if (!url) return '';
    const trimmed = String(url).trim();
    if (/^(https?:)?\/\//i.test(trimmed)) return trimmed;
    if (trimmed.startsWith('data:')) return trimmed;
    if (trimmed.startsWith('/uploads')) return `http://localhost:3000${trimmed}`;
    const normalized = trimmed.replace(/^\/+/, '');
    const finalPath = normalized.includes('/') ? normalized : `tours/${normalized}`;
    return `${GET_IMAGE_URL}/${finalPath}`;
  })();

  const handleViewDetail = () => {
      navigate(config.routes.tour_detail + '?tourId=' + valueID, { state: { valueID } });
      window.scrollTo({ top: 200, behavior: 'smooth' });
  };
  
  const details = [
    { icon: <Icons.LocationDotIcon orange/>, text: textLocation },
    { icon: <Icons.CalendarIcon orange/>, text: textTime + ' ngày' },
    { icon: <Icons.UserIcon orange/>, text: textDensity + ' người' },
    { icon: <Icons.ChartSimpleIcon orange/>, text: textLevel },
  ];

  const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12' ];

  const availableMonth = months.join(' ');

  useEffect(() => {
    months.length === 12 ? setIsFullYear(true): setIsFullYear(false);
  }, [])

  const priceDisplay = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(price));

  return (
        <UnifiedCardWrapper $horizontal={horizontal}>
            <Label>{type}</Label>
            <WrapperImage onClick={handleViewDetail}><Image src={imageUrl} alt={title}></Image></WrapperImage>
            <Content>
                <CardTitle onClick={handleViewDetail}>{title}</CardTitle>
                <Descr $horizontal={horizontal}>
                    <Left $horizontal={horizontal}>
                      <DetailsGrid $horizontal={horizontal}>
                        {details.map((detail, index) => (
                          <ItemBox key={index}>
                            <WrapperIcon>{detail.icon}</WrapperIcon>
                            <TextDescr style={{margin: 0}}>{detail.text}</TextDescr>
                          </ItemBox>
                        ))}
                      </DetailsGrid>
                      <TextDescr style={{margin: horizontal ? '20px 0' : '12px 0 0'}}>{textDescr}</TextDescr>
                    </Left>
                    <Right $horizontal={horizontal}>
                        <PriceGroup $horizontal={horizontal}>
                            <PriceLabel>Từ</PriceLabel>
                            <PriceValue>{priceDisplay}</PriceValue>
                            <PriceUnit>/khách</PriceUnit>
                        </PriceGroup>
                        {nextTour && nextTour.length > 0 && (
                          <DepartureGroup $horizontal={horizontal}>
                            <DepartureLabel>Khởi hành gần nhất</DepartureLabel>
                            <DepartureBadges $horizontal={horizontal}>
                              {nextTour.slice(0, 3).map((day, index) => {
                                return (
                                  <DepartureBadge key={index} $horizontal={horizontal}>
                                    {horizontal && <Icons.CheckIcon style={{marginRight: '6px', fontSize: '12px', color: '#ff681a'}} />}
                                    {day}
                                  </DepartureBadge>
                                );
                              })}
                            </DepartureBadges>
                          </DepartureGroup>
                        )}
                    </Right>
                </Descr>
                <CardButton orange onClick={handleViewDetail}>Xem chi tiết</CardButton>
                {isDensity && <>
                  <TextDescr>{isfullYear ? 'Có sẵn quanh năm' : 'Có ở các tháng'}</TextDescr>
                  <TextDescr style={{fontSize: '12px'}}><Icons.CalendarIcon orange/>{availableMonth}</TextDescr>
                </>}
            </Content>
        </UnifiedCardWrapper>
  );
};




const Label = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  background: rgba(55, 212, 217, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 50px;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const WrapperImage = styled.div`
    width: 100%;
    aspect-ratio: 900 / 700;
    overflow: hidden;
    cursor: pointer;
    border-radius: 15px;
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 900 / 700;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`

const Content = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 20px 0 0;
  display: flex;
  flex-direction: column;
`
const CardTitle = styled(Title)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  line-height: 1.4;
  color: #000;
  margin: 0 0 10px;
  transition: color 0.3s ease;

  &:hover {
    cursor: pointer;
    color: #ff681a;
  }
`
const Descr = styled.div<{ $horizontal?: boolean }>`
  width: 100%;
  max-width: 100%;
  display: flex;
  margin: 15px 0;
  padding: 5px 0;
  flex-direction: ${props => props.$horizontal ? 'row' : 'column'};
  gap: ${props => props.$horizontal ? '0' : '20px'};
`

const Left = styled.div<{ $horizontal?: boolean }>`
  width: ${props => props.$horizontal ? 'calc(50% - 1px)' : '100%'};
  border-right: ${props => props.$horizontal ? 'var(--border)' : 'none'};
  padding-right: ${props => props.$horizontal ? '15px' : '0'};
`

const DetailsGrid = styled.div<{ $horizontal?: boolean }>`
  width: 100%;
  display: ${props => props.$horizontal ? 'block' : 'grid'};
  grid-template-columns: ${props => props.$horizontal ? 'initial' : 'repeat(2, 1fr)'};
  gap: ${props => props.$horizontal ? 'initial' : '10px 15px'};
`

const ItemBox = styled.div`
  display: flex;
  padding: 4px 0;
  align-items: center;
  gap: 8px;
`

const WrapperIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ff681a;
  
  svg {
    font-size: 15px;
    width: 15px;
    height: 15px;
  }
`

const Right = styled.div<{ $horizontal?: boolean }>`
  width: ${props => props.$horizontal ? '50%' : '100%'};
  padding: ${props => props.$horizontal ? '0 10px' : '15px 0 0'};
  border-top: ${props => props.$horizontal ? 'none' : '1px dashed #eee'};
  display: flex;
  flex-direction: ${props => props.$horizontal ? 'column' : 'row'};
  justify-content: ${props => props.$horizontal ? 'center' : 'space-between'};
  align-items: ${props => props.$horizontal ? 'center' : 'center'};
  gap: 15px;
`

const PriceGroup = styled.div<{ $horizontal?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$horizontal ? 'center' : 'flex-start'};
  justify-content: center;
  gap: 2px;
`

const PriceLabel = styled.span`
  font-size: 11px;
  text-transform: uppercase;
  color: #888;
  font-weight: 600;
  letter-spacing: 0.5px;
`

const PriceValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: #ff681a;
  line-height: 1.2;
`

const PriceUnit = styled.span`
  font-size: 12px;
  color: #666;
`

const DepartureGroup = styled.div<{ $horizontal?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$horizontal ? 'center' : 'flex-end'};
  gap: 6px;
`

const DepartureLabel = styled.span`
  font-size: 11px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const DepartureBadges = styled.div<{ $horizontal?: boolean }>`
  display: flex;
  flex-direction: ${props => props.$horizontal ? 'column' : 'row'};
  gap: ${props => props.$horizontal ? '6px' : '8px'};
  align-items: ${props => props.$horizontal ? 'center' : 'center'};
  justify-content: ${props => props.$horizontal ? 'center' : 'flex-end'};
  flex-wrap: wrap;
`

const DepartureBadge = styled.span<{ $horizontal?: boolean }>`
  font-size: ${props => props.$horizontal ? '14px' : '11px'};
  font-weight: ${props => props.$horizontal ? '400' : '600'};
  color: ${props => props.$horizontal ? '#666' : '#ff681a'};
  background: ${props => props.$horizontal ? 'transparent' : '#fff3ec'};
  border: ${props => props.$horizontal ? 'none' : '1px solid #ffe2d1'};
  border-radius: ${props => props.$horizontal ? '0' : '6px'};
  padding: ${props => props.$horizontal ? '0' : '4px 8px'};
  display: flex;
  align-items: center;
  white-space: nowrap;
`

const TextDescr = styled(Text)`
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`

const CardButton = styled(Button)`
  width: 100%;
  margin: 10px 0;
`

export default TourCardDetail;
