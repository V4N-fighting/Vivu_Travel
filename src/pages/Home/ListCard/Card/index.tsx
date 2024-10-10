import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SubTitle, Text, Title } from '../../../../styled';
import Button from '../../../../Component/button/Button';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';

interface CardProps {
    url: string,  
    title: string, 
    textLocation: string,
    textTime: string,
    price: string,
}



const Card: React.FC<CardProps> = ({url, price, textLocation, title, textTime}) => {
  return (
        <WrapperCard>
            <WrapperImage><Image src={url}></Image></WrapperImage>
            <Content>
                <CardTitle>{title}</CardTitle>
                <Descr>
                    <Left>
                        <Local><TextDescr><EnvironmentOutlinedIcon />{textLocation}</TextDescr></Local>
                        <Time><TextDescr><ClockCircleOutlinedIcon />{textTime}</TextDescr></Time>
                    </Left>
                    <Right>
                        <Price>{price}</Price>
                    </Right>
                </Descr>
                <CardButton orange>Xem chi tiết</CardButton>
            </Content>
        </WrapperCard>
  );
};



const WrapperCard = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: #ffffff;
  border-radius: 15px;
  overflow: hidden;
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
  padding: 20px 15px
`
const CardTitle = styled(Title)`
  width: 100%;
  max-width: 100%;
  margin: 0 0 10px;
  padding: 0;
  font-size: 20px;
  align-items: center;
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
`
const Left = styled.div`
  width: calc(50% - 1px);
  border-right: 1px solid #9f9f9f;
  padding-right: 5px;
`
const Right = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Price = styled(Text)`
    font-size: 26px;
    color: #222222;
    font-weight: 400;
`
const Local = styled.div`
  width: 80%;
`

const EnvironmentOutlinedIcon = styled(EnvironmentOutlined)`
    margin-right: 10px;
`
const ClockCircleOutlinedIcon = styled(ClockCircleOutlined)`
    margin-right: 10px;
`

const Time = styled.div`
  width: 80%;
  margin-bottom: -18px;
`
const TextDescr = styled(Text)`
    font-size: 16px;
`

const CardButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
`


export default Card;
