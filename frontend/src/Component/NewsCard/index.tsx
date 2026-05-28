import React from 'react';
import styled from 'styled-components';
import Button from '../BaseComponent/Button/Button';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import Icons from '../BaseComponent/Icons';
import { Link } from 'react-router-dom';
import * as S from '../../styled';

interface NewsCardProps {
    url: string,  
    title: string, 
    textDescr: string,
    textTime: string,
    label: string,
    view: string,
    slug?: string,
}

const NewsCard: React.FC<NewsCardProps> = ({url, textDescr, title, textTime, label, view, slug}) => {
  const blogLink = slug ? `/blog/${slug}` : '#';

  return (
        <WrapperNewsCard>
            <Label >{label}</Label>
            <Link to={blogLink}>
              <WrapperImage><Image src={url}></Image></WrapperImage>
            </Link>
            <Content>
                <Link to={blogLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <NewsCardTitle>{title}</NewsCardTitle>
                </Link>
                <Descr>
                    <Local><S.Text>{textDescr}</S.Text></Local>
                    <MetaInfo>
                      <MetaItem><Icons.CalendarIcon/><span>{textTime}</span></MetaItem>
                      <MetaItem><S.Icon icon={faEye}/><span>{view}</span></MetaItem>
                    </MetaInfo>
                </Descr>
                
                <Link to={blogLink}>
                  <Button orange>Đọc thêm</Button>
                </Link>

            </Content>
        </WrapperNewsCard>
  );
};



const WrapperNewsCard = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 25px;
  padding: 25px;
  border: 1px solid #eee;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    border-color: #ff681a;
  }
`
const Label = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #37d4d9;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  padding: 6px 15px;
  border-radius: 8px;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px;
`

const WrapperImage = styled.div`
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    cursor: pointer;
    border-radius: 15px;
    position: relative;
`



const Image = styled.img<{src: string}>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;


  &:hover {
    transform: scale(1.1);
  }
`


const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const NewsCardTitle = styled(S.Title)`
  width: 100%;
  margin: 0 0 15px;
  font-size: 20px;
  line-height: 1.4;
  color: #000;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    color: #ff681a;
  }
`
const Descr = styled.div`
  width: 100%;
  margin: 0 0 20px;
`
const Local = styled.div`
  width: 100%;
  margin-bottom: 15px;
  
  & p {
    color: #666;
    font-size: 15px;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
  }
`

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
`

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  white-space: nowrap;
  
  & span {
    margin-left: 2px;
  }
  
  & svg, & i {
    margin-right: 6px;
    color: #ff681a;
  }
`

export default NewsCard;
