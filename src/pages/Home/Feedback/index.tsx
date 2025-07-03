import styled from "styled-components";
import { RowBetween, SupTitle, Title, Wrapper, WrapperPadding, Text } from "../../../styled";
import Button from "../../../Component/BaseComponent/Button/Button";
import { StarFilled } from '@ant-design/icons';
import StarRating from "../../../Component/StarRating";



interface FeedbackProps {

}

const Feedback: React.FC<FeedbackProps> = ({}) => {
    return <Background>
            <Wrapper>
                <WrapperPadding>
                        <RowBetween>
                            <Content>
                                <SupTitle blue>Đi & Khám phá</SupTitle>
                                <Title white big>Khách hàng của chúng tôi</Title>
                                <Text white>Đánh giá khách hàng là một phần quan trọng trong việc đánh giá chất lượng dịch vụ hoặc sản phẩm mà một công ty cung cấp.</Text>
                                <Button blue>Xem thêm</Button>
                            </Content>
                            <Content>
                                <FeedbackContent>
                                    <BorderLine>
                                        <Contain>
                                            <Avatar>
                                                <PaddingAvatar topLeft><AvatarItem url="./images/avater-1-1.jpg"></AvatarItem></PaddingAvatar>
                                                <PaddingAvatar topRight><AvatarItem url="./images/avater-1-2.jpg"></AvatarItem></PaddingAvatar>
                                                <PaddingAvatar bottomLeft><AvatarItem url="./images/avater-1-3.jpg"></AvatarItem></PaddingAvatar>
                                                <PaddingAvatar bottomRight><AvatarItem url="./images/avater-1-4.jpg"></AvatarItem></PaddingAvatar>
                                            </Avatar>
                                            <FeedbackContain>
                                                <Icon src="./images/quote1.png"/>
                                                <StarRating star={5} />
                                                <TextContain>
                                                    Quả là 1 nơi tuyệt vời để tìm kiếm 1 nơi nghỉ ngơi cho mình, tôi rất yêu nơi này.
                                                </TextContain>
                                                <CurAvatar main url='./images/avater-1-1.jpg' ></CurAvatar>
                                                <Name>Lương Lã Lướt</Name>
                                                <Country>VietNam</Country>
                                            </FeedbackContain>
                                            <Image src="./images/testi-slider-bg1.png"></Image>
                                        </Contain>
                                    </BorderLine>
                                </FeedbackContent>
                            </Content>
                        </RowBetween>
                </WrapperPadding>
            </Wrapper>
     </Background>
};

const Background = styled.div`
    background-image: url('./images/testimonial-bg.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`

const Content = styled.div`
  width: 50%;
  max-width: 100%;
  margin: 0 13px;
  position: relative;
`;

const FeedbackContent = styled.div`
    width: 480px;
    height: 480px;
    text-align: center;
    margin: 10px auto;
    align-self: center;
    position: relative;
`

const BorderLine = styled.div`
    width: 500px;
    height: 500px;
    transform: rotate(45deg) translate(-10px, -10px);
    border-radius: 180px;
    border: 1px solid #FF681A;
`
const Contain = styled.div`
    width: 480px;
    height: 480px;
    transform: translate(10px ,10px);
    background-color: #FF681A;
    border-radius: 180px;
`
const Avatar = styled.div`
    width: 480px;
    height: 480px;
    border-radius: 180px;
    position: relative;
`
const Image = styled.img`
    transform: translate(-50%, -50%) rotate(-45deg);
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
`
const PaddingAvatar = styled.div<{main?: boolean, topLeft?: boolean, topRight?: boolean, bottomLeft?: boolean, bottomRight?: boolean}>`
    padding: 10px;
    border-radius: 50%;
    background-color: #FF681A;
    position: absolute;
    top: ${props => props.topLeft || props.bottomRight ? "50%" : 
                                    props.bottomLeft ? "100%" :
                                    props.topRight ? 0 : "undefined"};
    left: ${props => props.topRight || props.bottomLeft ? "50%" : 
                                    props.bottomRight ? "100%" :
                                    props.topLeft ? 0 : "undefined"};
    transform: translate(-50%, -50%);
`
const AvatarItem = styled.div<{main?: boolean, url: string}>`
    width: 80px;
    height: 80px;
    border-radius: ${props => props.main ? "0" : "50%"};
    background-image: url(${props => props.url});
    background-position: center;
    background-size: contain;
    transform: rotate(-45deg);
`
const FeedbackContain = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 480px;
    height: 480px;
    border-radius: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Icon = styled.img`
    width: 50px;
    position: absolute;
    top: 90px;
    left: 15%;
    transform: rotate(315deg);
`
const Rating = styled.div`
    display: flex;
    position: absolute;
    top: 129px;
    left: 139px;
    transform: translateX(-50%) rotate(-45deg);
`
const RatingIcon = styled(StarFilled)`
    padding: 5px;
    color: white;
`
const TextContain = styled.p`
    font-size: 18px;
    color: white;
    width: 60%;
    text-align: center;
    line-height: 1.6;
    position: absolute;
    top: 31%;
    left: 11%;
    transform: rotate(-45deg);
`
const CurAvatar = styled(AvatarItem)`
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    outline: 1px solid white;
    outline-offset: 10px;
`
const Name = styled.p`
    font-size: 22px;
    color: white;
    font-weight: 600;
    position: absolute;
    top: 66%;
    left: 54%;
    transform: rotate(-45deg);
`
const Country = styled.p`
    font-size: 16px;
    color: white;
    font-weight: 500;
    position: absolute;
    top: 73%;
    left: 68%;
    transform: rotate(-45deg);

`



export default Feedback;
