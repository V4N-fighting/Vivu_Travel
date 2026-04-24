
import styled from "styled-components";
import {  SupTitle, Title } from "../../../styled";
import Carousel from "../../../Component/Carousel";
import ReviewCard from "../../../Component/ReviewCard";



interface ReviewProps {
   
}

const cards = [
    <ReviewCard key='1' src={"https://wordpress.vecurosoft.com/travolo/wp-content/uploads/2023/11/avater-1-1.jpg"} name={"Franchhhhhhhhhhhhhhhhhhh"} star={4} auth={"Vanw"} descr={"so sweet"} ></ReviewCard>,
    <ReviewCard key='2' src={"https://wordpress.vecurosoft.com/travolo/wp-content/uploads/2023/11/avater-1-1.jpg"} name={"China"} star={5} auth={"Vanw"} descr={"so sweetttttttttttttttttttttttt"} ></ReviewCard>,
    <ReviewCard key='3' src={"https://wordpress.vecurosoft.com/travolo/wp-content/uploads/2023/11/avater-1-1.jpg"} name={"Russia"} star={4} auth={"Vanw"} descr={"so sweet"} ></ReviewCard>,
    <ReviewCard key='4' src={"https://wordpress.vecurosoft.com/travolo/wp-content/uploads/2023/11/avater-1-1.jpg"} name={"Korea"} star={1} auth={"Vanw"} descr={"so sweet"} ></ReviewCard>,
    <ReviewCard key='5' src={"https://wordpress.vecurosoft.com/travolo/wp-content/uploads/2023/11/avater-1-1.jpg"} name={"VietNam"} star={4} auth={"Vanw"} descr={"so sweet"} ></ReviewCard>,
];

const Review: React.FC<ReviewProps> = ({}) => {
    return ( 
        <Wrapper background='https://cdn-media.sforum.vn/storage/app/media/thanhhuyen/h%C3%ACnh%20n%E1%BB%81n%20b%E1%BA%A7u%20tr%E1%BB%9Di/1/hinh-nen-bau-troi-5.jpg'>
             <Contain>
                 <SupTitle blue>Đánh giá tốt</SupTitle>
                 <Title white>Hơn 50.000 khách hàng hài lòng trên khắp thế giới </Title>
                 <Carousel slidesToShow={3} slides={cards} autoSlide autoSlideInterval={300000}></Carousel>
             </Contain>
        </Wrapper>
    );
}

const Wrapper = styled.div<{background: string}>`
    position: relative;
    padding: 150px 0 100px;
    background-image: url(${props => props.background});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;

    &::before {
        content: '';
        position: absolute;
        top: -30px;
        left: 0;
        width: 110%;
        transform: translateX(-5%);
        height: 80px;
        filter: blur(15px);
        background: #ff6600;
        z-index: 2;
    }
`
const Contain = styled.div`
    max-width: 1250px;
    width: 100%;
    margin: 0 auto;
`

export default Review;