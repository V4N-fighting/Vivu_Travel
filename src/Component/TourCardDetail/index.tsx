import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Title, Text, Icon } from '../../styled';
import Button from '../BaseComponent/Button/Button';
import { faChartSimple, faCheck, faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

interface TourCardDetailProps {
    url: string,  
    title: string, 
    textLocation: string,
    textTime: string,
    textDescr: string,
    textDensity: string,
    textLevel: string,
    price: string,
    horizontal?: boolean,
    isDensity?: boolean
}

const TourCardDetail: React.FC<TourCardDetailProps> = 
({url, price, textLocation, title, textTime, textDensity, textLevel, horizontal, textDescr, isDensity = true}) => {
  const [isfullYear, setIsFullYear] = useState<boolean>(true)
  
  const details = [
    { icon: faLocationDot, text: textLocation },
    { icon: faClock, text: textTime },
    { icon: faUsers, text: textDensity },
    { icon: faChartSimple, text: textLevel },
  ];

  const next_tour = ['Th1 04', 'Th1 05', 'Th1 06' ];

  const months = ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12' ];

  const availableMonth = months.join(' ');

  useEffect(() => {
    months.length == 12 ? setIsFullYear(true): setIsFullYear(false);
  }, [])

  
  return (
        <WrapperCard horizontal={horizontal}>
            <WrapperImage><Image src={url}></Image></WrapperImage>
            <Content>
                <CardTitle>{title}</CardTitle>
                <Descr>
                    <Left>
                      {details.map((detail, index) => (
                        <TextDescr key={index}>
                          <Icon color="orange" icon={detail.icon} />
                          {detail.text}
                        </TextDescr>
                      ))}
                      <TextDescr>{textDescr}</TextDescr>
                    </Left>
                    <Right>
                        <Price>{price}</Price>
                        <TextDescr>Chuyến khởi hành tiếp theo</TextDescr>
                        {next_tour.map((day, index) => {
                          return <TextDescr key={index}><Icon color='orange' icon={faCheck} />{day}</TextDescr>
                        })}
                    </Right>
                </Descr>
                <CardButton orange>Xem chi tiết</CardButton>
                {isDensity && <>
                  <TextDescr>{isfullYear ? 'Có sẵn quanh năm' : 'Có ở các tháng'}</TextDescr>
                  <TextDescr style={{fontSize: '12px'}}><Icon color='orange' icon={faCalendar} />{availableMonth}</TextDescr>
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
  overflow: hidden;
  box-shadow: var(--box-shadow);
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
const Left = styled.div`
  width: calc(60% - 1px);
  margin-bottom: -18px;
  border-right: var(--border);
  padding-right: 15px;
`
const Right = styled.div`
  width: 40%;
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
