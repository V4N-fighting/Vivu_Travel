import styled from "styled-components";
import {  Icon, Title, Text } from "../../styled";
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
                    <Text>{timeText}</Text>
                </TimeBox>
                <Title medium>{blogTitle}</Title>
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
     flex: 1;
`

const TimeBox = styled.div`
    margin-bottom: 2px;
    display: flex;
`


export default BlogItem;