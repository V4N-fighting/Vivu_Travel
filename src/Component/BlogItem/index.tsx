import styled from "styled-components";
import {  Title, Text } from "../../styled";
import Icons from "../BaseComponent/Icons";



import { Link } from "react-router-dom";

interface BlogItemProps {
    imgUrl: string,
    blogTitle: string,
    timeText: string,
    slug?: string,
}

const BlogItem: React.FC<BlogItemProps> = ({imgUrl, blogTitle, timeText, slug}) => {
    const blogLink = slug ? `/blog/${slug}` : '#';
    
    return ( 
        <Link to={blogLink} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Wrapper>
                <ImageWrapper>
                    <Image src={imgUrl}/>
                </ImageWrapper>
                <Content>
                    <TimeBox>
                        <Icons.CalendarIcon />
                        <Text>{timeText}</Text>
                    </TimeBox>
                    <Title medium style={{ fontSize: '14px', lineHeight: '1.4' }}>{blogTitle}</Title>
                </Content>
            </Wrapper>
        </Link>
     );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ImageWrapper = styled.div`
    margin-right: 20px;
    width: 90px;
`

const Image = styled.img`
    border-radius: 6px;
    width: 100%;
    max-width: 100%;
    height: auto;
`

const Content = styled.div`
     display: flex;
     flex-direction: column;
     justify-content: space-between;
     flex: 1;
`

const TimeBox = styled.div`
    margin-bottom: 2px;
    display: flex;
`


export default BlogItem;