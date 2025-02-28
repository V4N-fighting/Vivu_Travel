import React from 'react';
import styled from 'styled-components';
import { FlexBox, FlexBoxBetween, Icon, Text, Title } from '../../styled';
import Button from '../button/Button';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';

interface NewsCardProps {
    url: string,  
    title: string, 
    textDescr: string,
    textTime: string,
    label: string,
    view: string,
}



const NewsCard: React.FC<NewsCardProps> = ({url, textDescr, title, textTime, label, view}) => {
  return (
        <WrapperNewsCard>
            <Label >{label}</Label>
            <WrapperImage><Image src={url}></Image></WrapperImage>
            <Content>
                <NewsCardTitle>{title}</NewsCardTitle>
                <Descr>
                    <Local><Text>{textDescr}</Text></Local>
                    <FlexBox>
                      <Text bold><Icon icon={faCalendarDay}/>{textTime}</Text>
                      <Text style={{width: '20%', display: 'flex'}}><Icon icon={faEye}/>{view}</Text>
                    </FlexBox>
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
const Time = styled.div`
  width: 80%;
`


export default NewsCard;
