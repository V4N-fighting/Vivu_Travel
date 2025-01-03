import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FlexBoxBetween, SubTitle, Text, Title } from '../../styled';
import Button from '../button/Button';
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons';

interface NewsCardProps {
    url: string,  
    title: string, 
    textLocation: string,
    textTime: string,
    label: string,
    view: string,
}



const NewsCard: React.FC<NewsCardProps> = ({url, textLocation, title, textTime, label, view}) => {
  return (
        <WrapperNewsCard>
            <Label >{label}</Label>
            <WrapperImage><Image src={url}></Image></WrapperImage>
            <Content>
                <NewsCardTitle>{title}</NewsCardTitle>
                <Descr>
                    <Local><TextDescr>{textLocation}</TextDescr></Local>
                    <Time><TextDescr bold><CalendarOutlinedIcon />{textTime}</TextDescr></Time>
                </Descr>
                <FlexBoxBetween>
                  <Button orange>Đọc thêm</Button>
                  <TextDescr><EyeOutlinedIcon />{view}</TextDescr>
                </FlexBoxBetween>
            </Content>
        </WrapperNewsCard>
  );
};



const WrapperNewsCard = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: #ffffff;
  border-radius: 25px;
  /* overflow: hidden; */
  padding: 20px;
  border: 1px solid red;
  position: relative;
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
    border-radius: 15px;
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
  padding: 20px 15px 0;
`
const NewsCardTitle = styled(Title)`
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
  margin: 0 0 30px;
`
const Local = styled.div`
  width: 100%;
`


const CalendarOutlinedIcon = styled(CalendarOutlined)`
    margin-right: 10px;
`

const EyeOutlinedIcon = styled(EyeOutlined)`
    margin-right: 10px;
`

const Time = styled.div`
  width: 80%;
  margin-bottom: -18px;
`
const TextDescr = styled(Text)<{bold?: boolean}>`
    font-size: 16px;
    margin: 10px 0;
    font-weight: ${props => props.bold ? "bold" : "normal"};
`






export default NewsCard;
