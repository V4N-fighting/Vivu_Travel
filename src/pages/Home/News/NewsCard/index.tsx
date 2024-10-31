import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SubTitle, Text, Title } from '../../../../styled';
import Button from '../../../../Component/button/Button';
import { CalendarOutlined } from '@ant-design/icons';

interface NewsCardProps {
    url: string,  
    title: string, 
    textLocation: string,
    textTime: string,
}



const NewsCard: React.FC<NewsCardProps> = ({url, textLocation, title, textTime}) => {
  return (
        <WrapperNewsCard>
            <WrapperImage><Image src={url}></Image></WrapperImage>
            <Content>
                <NewsCardTitle>{title}</NewsCardTitle>
                <Descr>
                    <Left>
                        <Local><TextDescr>{textLocation}</TextDescr></Local>
                        <Time><TextDescr><CalendarOutlinedIcon />{textTime}</TextDescr></Time>
                    </Left>
                </Descr>
                <Button orange>Đọc thêm</Button>
            </Content>
        </WrapperNewsCard>
  );
};



const WrapperNewsCard = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: #ffffff;
  border-radius: 25px;
  overflow: hidden;
  margin: 0 15px;
  padding: 20px;
  border: 1px solid red;
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
  padding: 20px 15px
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
  margin: 20px 0;
`
const Left = styled.div`
  padding: 10px 0;
`
const Local = styled.div`
  width: 100%;
`


const CalendarOutlinedIcon = styled(CalendarOutlined)`
    margin-right: 10px;
`

const Time = styled.div`
  width: 80%;
  margin-bottom: -18px;
`
const TextDescr = styled(Text)`
    font-size: 16px;
`






export default NewsCard;
