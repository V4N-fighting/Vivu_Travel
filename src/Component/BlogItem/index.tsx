import styled from "styled-components";
import {  Title } from "../../styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";



interface BlogItemProps {
    imgUrl: string,
    blogTitle: string,
    timeText: string
}

const BlogItem: React.FC<BlogItemProps> = ({imgUrl, blogTitle, timeText}) => {
    return ( 
        <Wrapper>
            <ImageWrapper>
                <Image src={imgUrl}/>
            </ImageWrapper>
            <Content>
                <TimeBox>
                    <Icon icon={faCalendarDays} />
                    <TimeText>{timeText}</TimeText>
                </TimeBox>
                <BlogTitle>{blogTitle}</BlogTitle>
            </Content>
        </Wrapper>
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
`

const TimeBox = styled.div`
    margin-bottom: 2px;
    display: flex;
    align-item: center;
`

const BlogTitle = styled(Title)`
    font-size: 20px;
    font-weight: 500;
    margin: 0;
`

const Icon = styled(FontAwesomeIcon)`
    margin-right: 5px;
    font-size: 14px;
`
const TimeText = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #505050;
`


export default BlogItem;