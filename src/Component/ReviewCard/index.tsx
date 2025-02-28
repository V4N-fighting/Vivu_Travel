
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
                <Name>{auth}</Name>
            </Content>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
    padding: 40px;
    margin: 25px 0;
    background-color: #fff;
    display: flex;
    box-shadow: 0 0 45.92px 0.08px rgb(0 0 0 / 7%);
    border-radius: 6px;
    justify-content: space-between;
    cursor: grab;
`
const Avatar = styled.div`
    margin-right: 20px;
    width: 100px;
`
const AvatarImg = styled.img<{src: string}>`
    width: 100px;
    height: 100px;  
`
const Content = styled.div`
    flex: 1;
    max-width: calc(100% - 100px);
`

const Title = styled.div`
    margin: 0 0 15px;
`
const TitleLink = styled(Link)`
    text-decoration: none;
    font-size: 24px;
    color: #212121;
    font-weight: 600;
    transition: color 0.3s ease;
    display: block;
    width: 80%;
    overflow: hidden; /* Ẩn phần vượt quá */
    white-space: nowrap; /* Ngăn không cho xuống dòng */
    text-overflow: ellipsis; /* Thêm dấu ba chấm khi nội dung vượt giới hạn */
`
const Descr = styled.p`
    margin: 12px 0 0;
    font-size: 1.4rem;
    line-height: 2.3rem;
    color: #505050;
    font-size: 1.4rem;
    width: 80%;
    overflow: hidden; /* Ẩn phần vượt quá */
    white-space: nowrap; /* Ngăn không cho xuống dòng */
    text-overflow: ellipsis; /* Thêm dấu ba chấm khi nội dung vượt giới hạn */
`
const Name = styled.h6`
    font-size: 1.3rem;
    color: #212121;
    margin: 15px 0 0;
`



export default ReviewCard;