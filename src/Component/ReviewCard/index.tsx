
import styled from "styled-components";
import StarRating from "../StarRating";
import { Link } from "react-router-dom";



interface ReviewCardProps {
    src: string,
    name: string,
    star: number,
    auth: string,
    descr: string,
}

const ReviewCard: React.FC<ReviewCardProps> = ({src, name, star, auth, descr}) => {
    return ( 
        <Wrapper>
            <Avatar>
                <AvatarImg src={src}/>
            </Avatar>
            <Content>
                <Title>
                    <TitleLink to="/ReviewPage">{name}</TitleLink>
                </Title>
                <StarRating star={star} />
                <Descr>{descr}</Descr>
                <AuthDate>{auth}</AuthDate>
            </Content>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    padding: 20px 30px;
    margin: 15px 0;
    background-color: #fff;
    display: flex;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    border-radius: 12px;
    border: 1px solid #f0f0f0;
    align-items: center;
`
const Avatar = styled.div`
    margin-right: 20px;
    width: 60px;
`
const AvatarImg = styled.img<{src: string}>`
    width: 60px;
    height: 60px;  
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #FF681A;
`
const Content = styled.div`
    flex: 1;
    max-width: calc(100% - 80px);
`

const Title = styled.div`
    margin: 0 0 5px;
`
const TitleLink = styled(Link)`
    text-decoration: none;
    font-size: 18px;
    color: #212121;
    font-weight: 600;
    transition: color 0.3s ease;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
const Descr = styled.p`
    margin: 8px 0;
    font-size: 14px;
    line-height: 1.5;
    color: #4a4a4a;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`
const AuthDate = styled.span`
    font-size: 12px;
    color: #999;
    display: block;
    margin-top: 5px;
`



export default ReviewCard;