import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Title, Text, Icon } from '../../styled';
import Button from '../button/Button';
import { faChartSimple, faCheck, faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';

interface CardProps {
    url: string,  
    title: string, 
    textLocation: string,
    textTime: string,
    textDensity: string,
    textLevel: string,
    price: string,
    horizontal?: boolean
}



const Card: React.FC<CardProps> = ({url, price, textLocation, title, textTime, textDensity, textLevel, horizontal}) => {
  return (
        <WrapperCard horizontal={horizontal}>
            <WrapperImage><Image src={url}></Image></WrapperImage>
            <Content>
                <CardTitle>{title}</CardTitle>
                <Descr>
                    <Left>
                        <TextDescr><Icon margin='0 10px 0 0' color='orange' icon={faLocationDot} />{textLocation}</TextDescr>
                        <TextDescr><Icon margin='0 10px 0 0' color='orange' icon={faClock} />{textTime}</TextDescr>
                        <TextDescr><Icon margin='0 10px 0 0' color='orange' icon={faUsers} />{textDensity}</TextDescr>
                        <TextDescr><Icon margin='0 10px 0 0' color='orange' icon={faChartSimple} />{textLevel}</TextDescr>

                        <TextDescr>
                        Travel is the movement of people between relatively distant geographical locations, and can involve travel by foot, bicycle, automobile, train, boat, bus, airplane, or other means, with or without luggage, and can be one way or round trip. Travel can also include relatively short stays between successive movements.
                        </TextDescr>
                    </Left>
                    <Right>
                        <Price>{price}</Price>
                        <TextDescr>Chuyến khởi hành tiếp theo</TextDescr>
                        <TextDescr><Icon margin='0 10px 0 0' color='orange' icon={faCheck} />Th1 04</TextDescr>
                        <TextDescr><Icon margin='0 10px 0 0' color='orange' icon={faCheck} />Th1 05</TextDescr>
                        <TextDescr><Icon margin='0 10px 0 0' color='orange' icon={faCheck} />Th1 06</TextDescr>
                    </Right>
                </Descr>
                <CardButton orange>Xem chi tiết</CardButton>
                <TextDescr>Có sẵn quanh năm</TextDescr>
                <TextDescr style={{fontSize: '12px'}}><Icon margin='0 10px 0 0' color='orange' icon={faCalendar} />Th1  Th2  Th3  Th4  Th5  Th6  Th7  Th8  Th9  Th10  Th11  Th12</TextDescr>

            </Content>
        </WrapperCard>
  );
};



const WrapperCard = styled.div<{horizontal?: boolean}>`
  display: ${props => props.horizontal ? 'flex' : 'block'};
  width: 100%;
  max-width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
const CardTitle = styled.div`
  display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  padding: 0;
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.4;
  color: #1C1C1C;
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
  border-bottom: 1px solid #999999;

`
const Left = styled.div`
  width: calc(60% - 1px);
  margin-bottom: -18px;
  border-right: 1px solid #9f9f9f;
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


export default Card;
