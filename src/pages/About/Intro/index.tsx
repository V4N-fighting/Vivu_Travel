
import styled from "styled-components";
import { FlexBox, RowStretch, SupTitle, Title, Text, Wrapper, WrapperPadding } from "../../../styled";
import Button from "../../../Component/BaseComponent/Button/Button";



interface IntroProps {
    mainImg: string,
    circleImg: string,
}

const Intro: React.FC<IntroProps> = ({mainImg, circleImg}) => {
    return ( 
        <Wrapper>
            <WrapperPadding>
                <RowStretch>
                    <ImgCol>
                        <MainImg src={mainImg}/>
                        <CircleImg src={circleImg}/>
                        <TextBox backgound="orange" top="0" right="0" transform="none">25 Năm <div>Kinh nghiệm</div></TextBox>
                        <TextBox backgound="#00eeff" top="100%" right="20%" transform="translateY(-100%)">20,000+ <div>Khách hàng</div></TextBox>
                    </ImgCol>
                    <Space></Space>
                    <ContentCol>
                        <SupTitle>Chúng tôi là Vivu</SupTitle>
                        <Title>Vivu là lựa chọn tốt nhất cho chuyến đi của bạn.</Title>
                        <Text>
                            Với hàng ngàn địa điểm du lịch, hướng dẫn du lịch chi tiết và những lời khuyên hữu ích, chúng tôi sẽ giúp bạn lên kế hoạch cho những chuyến đi tuyệt vời và trải nghiệm không thể quên.
                        </Text>
                        <ListContainer>
                            <ListColumn>
                                <ListItem>Địa điểm chi tiết</ListItem>
                                <ListItem>Đánh giá nhận xét</ListItem>
                                <ListItem>Thông tin về hồ sơ du lịch</ListItem>
                                <ListItem>Giao tiếp và chia sẻ kinh nghiệm</ListItem>
                            </ListColumn>
                            <ListColumn>
                                <ListItem>Hướng dẫn lịch trình</ListItem>
                                <ListItem>Đặt vé và đặt phòng trực tuyến</ListItem>
                                <ListItem>Tin tức và xu hướng du lịch</ListItem>
                            </ListColumn>
                        </ListContainer>
                        <Button orange>Xem thêm</Button>
                    </ContentCol>
                </RowStretch>
            </WrapperPadding>
        </Wrapper>
     );
}

const ImgCol = styled.div`
    width: 50%;
    position: relative;
    padding: 60px 10px 60px 0;
    flex: 1;
`
const MainImg = styled.div<{src: string}>`
    height: 100%;
    min-height: 400px;
    margin: 20px 20px 0;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-top-left-radius: 99px;
`

const CircleImg = styled.div<{src: string}>`
    position: absolute;
    top: 50%;
    right: 0;
    z-index: 3;
    transform: translateY(-50%);
    width: 30%;
    padding-bottom: 30%;
    border-radius: 99px;
    outline: 40px solid var(--white-color);
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

const TextBox = styled.div<{backgound: string, top: string, right: string, transform: string}>`
    position: absolute;
    top: ${props => props.top};
    right: ${props => props.right};;
    z-index: 2;
    width: 40%;
    background-color: ${props => props.backgound};;
    padding: 20px;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--white-color);
    height: 200px;
    border-radius: 20px;
    outline: 20px solid var(--white-color);
    transform: ${props => props.transform};

    & div {
        font-size: 24px;
    }
`

const ContentCol = styled.div`
    width: 50%;
    position: relative;
    padding: 20px 0 20px 10px;
    flex: 1;
`
const Space = styled.div`
    width: 50px;
`
const ListContainer = styled.div`
    display: flex;              
    justify-content: space-between; 
    max-width: 600px;            
    margin: 20px auto;           
`;

const ListColumn = styled.ul`
    list-style-type: disc;       
    padding-left: 20px;          
`;

const ListItem = styled.li`
    margin-bottom: 10px;        
    color: #555;              

    &::marker {
        color: var(--primary-color);          
    }
`;


export default Intro;