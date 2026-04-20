import React from 'react';
import styled from 'styled-components';
import { SupTitle, Text, Title } from '../../../../styled';
import Button from '../../../../Component/BaseComponent/Button/Button';
import { TagOutlined, CalendarOutlined } from '@ant-design/icons';
import { SocialIcon } from './../../../../layouts/components/Header/HeaderBottom/SideMenu/index';

interface TipItemProps {
    url: string, 
    label: string, 
    suptitle: string, 
    title: string, 
    text: string,
    reverse?: boolean,
}



const TipItem: React.FC<TipItemProps> = ({url, label, suptitle, title, text, reverse}) => {
  return (
    <Wrapper reverse={reverse}>
        <ImageBox url={url}>
            <Label reverse={reverse}><Icon><TagOutlined /></Icon>{label}</Label>
        </ImageBox>
        <ContentBox reverse={reverse} >
            <Content>
                <ContentSupTitle><Icon><CalendarOutlined /></Icon>{suptitle}</ContentSupTitle>
                <ContentTitle>{title}</ContentTitle>
                <Text>{text}</Text>
                <Button orange>Đọc thêm</Button>
            </Content>
        </ContentBox>
    </Wrapper>
  );
};

const Wrapper = styled.div<{reverse?: boolean}>`
    width: 1024px;
    max-width: 100%;
    position: relative;
    display: flex;
    flex-direction: ${props => props.reverse ? 'row-reverse' : undefined};
    margin: 30px 0;
`;

const ImageBox = styled.div<{url: string}>`
    width: 705px;
    height: 540px;
    border-radius: 30px;
    background-image: url(${props => props.url});
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    position: relative;
`;

const Label = styled.div<{reverse?: boolean}>`
    padding: 20px 30px;
    background-color: #ffffff;
    color: #FF681A;
    position: absolute;
    left: ${props => props.reverse ? undefined : 0};
    top: 30%;
    right: ${props => props.reverse ? 0 : undefined};
    border-top-right-radius: ${props => props.reverse ? 0 : '20px'};
    border-bottom-right-radius: ${props => props.reverse ? 0 : '20px'};
    border-top-left-radius: ${props => props.reverse ? '20px' : 0};
    border-bottom-left-radius: ${props => props.reverse ? '20px' : 0};
    font-size: 16px;
    font-weight: 700;
`;

const Icon = styled.span`
    margin-right: 15px;
`;

const ContentBox = styled.div<{reverse?: boolean}>`
    width: 50%;
    position: absolute;
    top: 50%;
    left: ${props => props.reverse ? 0 : undefined};
    right: ${props => props.reverse ? undefined : 0};
    transform: translateY(-50%);
    background-color: #ffffff;
    border-radius: 30px;
    padding: 30px 40px 30px 30px;
    border: 0.5px solid #FF681A;
    background-image: url('./images/blog-bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const ContentTitle = styled(Title)`
    font-size: 24px;
    line-height: 1.2;
`;

const ContentSupTitle = styled(SupTitle)`
    font-size: 20px;
    line-height: 1.4;
    margin-bottom: 15px;
`;

const Content = styled.div`
`;

export default TipItem;
