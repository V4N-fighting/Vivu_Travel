import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Title, Text, Icon, FlexBox } from '../../styled';
import Button from '../BaseComponent/Button/Button';
import Icons from '../BaseComponent/Icons';
import TourItem from '../../types/tour';
import { useNavigate } from 'react-router-dom';

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
    isDensity?: boolean
}

const TourCardDetail: React.FC<TourCardDetailProps> = 
({valueID, url, price, textLocation, title, textTime, textDensity, textLevel, horizontal, textDescr, isDensity = true, type}) => {
  const [isfullYear, setIsFullYear] = useState<boolean>(true)

  const navigate = useNavigate();

  const handleViewDetail = () => {
      navigate(`/tour_detail/${valueID}`, { state: { valueID } }); // Gửi state nếu cần
      window.scrollTo({ top: 200, behavior: 'smooth' });
  };
  
  const details = [
    { icon: <Icons.LocationDotIcon orange/>, text: textLocation },
    { icon: <Icons.CalendarIcon orange/>, text: textTime + ' ngày' },
    { icon: <Icons.UserIcon orange/>, text: textDensity + ' người' },
    { icon: <Icons.ChartSimpleIcon orange/>, text: textLevel },
  ];

  const next_tour = ['Th1 04', 'Th1 05', 'Th1 06' ];

  const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12' ];

  const availableMonth = months.join(' ');

  useEffect(() => {
    months.length == 12 ? setIsFullYear(true): setIsFullYear(false);
  }, [])

  
  return (
        <WrapperCard horizontal={horizontal}>
            <Label >{type}</Label>
            <WrapperImage><Image src={url}></Image></WrapperImage>
            <Content>
                <CardTitle>{title}</CardTitle>
                <Descr>
                    <Left>
                      {details.map((detail, index) => (
                        <ItemBox key={index}>
                          <WrapperIcon>{detail.icon}</WrapperIcon>
                          <TextDescr style={{margin: 0}}>{detail.text}</TextDescr>
                        </ItemBox>
                      ))}
                      <TextDescr style={{margin: '20px 0'}}>{textDescr}</TextDescr>
                    </Left>
                    <Right>
                        <Price>{price}</Price>
                        <TextDescr>Chuyến khởi hành tiếp theo</TextDescr>
                        {next_tour.map((day, index) => {
                          return <TextDescr key={index}><Icons.CheckIcon />{day}</TextDescr>
                        })}
                    </Right>
                </Descr>
                <CardButton orange onClick={handleViewDetail}>Xem chi tiết</CardButton>
                {isDensity && <>
                  <TextDescr>{isfullYear ? 'Có sẵn quanh năm' : 'Có ở các tháng'}</TextDescr>
                  <TextDescr style={{fontSize: '12px'}}><Icons.CalendarIcon orange/>{availableMonth}</TextDescr>
                </>}
            </Content>
        </WrapperCard>
  );
};



const WrapperCard = styled.div<{horizontal?: boolean}>`
  display: ${props => props.horizontal ? 'flex' : 'block'};
  width: 100%;
  max-width: 100%;
  background-color: var(--white-color);
  border-radius: 5px;
  /* overflow: hidden; */
  box-shadow: var(--box-shadow);
  position: relative;
  margin: 0 0 20px;
  `
const Label = styled.div`
  position: absolute;
  top: 10%;
  right: -10px;
  background-color: #37d4d9;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  z-index: 99;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &::after {
    position: absolute;
    content: "";
    top: 100%;
    right: 0;
    border-top: 10px solid #37d4d9;
    border-right: 10px solid transparent;
    filter: brightness(70%);
  }
`

const WrapperImage = styled.div`
    width: 100%;
    aspect-ratio: 900 / 700;
    overflow: hidden;
    cursor: pointer;
`



const Image = styled.img<{src: string}>`
  width: 100%;
  aspect-ratio: 900 / 700;
  object-fit: cover;
  transition: all 3s linear;


  &:hover {
    transform: scale(1.1);
  }
`


const Content = styled.div`
  width: 100%;
  max-width: 100%;
  padding: 20px 15px;
`
const CardTitle = styled(Title)`
  display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
const Descr = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: var(--border);


`
const ItemBox = styled.div`
  display: flex;
  padding: 5px 0;
  align-items: center;
`

const WrapperIcon = styled.div`
  width: 70px;
`


const Left = styled.div`
  width: calc(50% - 1px);
  margin-bottom: -18px;
  border-right: var(--border);
  padding-right: 15px;
`
const Right = styled.div`
  width: 50%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Price = styled(Text)`
    font-size: 20px;
    color: #222222;
    font-weight: 400;
`


const TextDescr = styled(Text)`
    font-size: 14px;
  display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`

const CardButton = styled(Button)`
  width: 100%;
  margin: 10px 0;
`


export default TourCardDetail;
