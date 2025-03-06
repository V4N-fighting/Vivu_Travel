import styled from "styled-components";
import { FlexBox, SupTitle, Text, Title, Wrapper } from "../../../styled";
import { PlayCircleFilled } from '@ant-design/icons';
import ScrollToShow from "../../../Component/ScrollToShow";
import { CirclePlayIcon } from './../../../Component/BaseComponent/Icons/CirclePlayIcon';
import Icons from "../../../Component/BaseComponent/Icons";

interface BestCityProps {

}

const BestCity: React.FC<BestCityProps> = ({}) => {
    return <WrapperChange>
        <FlexBoxChange>
            
                <FlexBox_50_P_0_15>
                    <ScrollToShow leftToRight>
                        <SupTitle orange>Đi & Khám Phá</SupTitle>
                        <Title big>Những thành phố tuyệt vời</Title>
                        <Text small>Nếu bạn đam mê khám phá những điểm đến độc đáo và trải nghiệm văn hóa mới, chúng tôi sẽ dẫn bạn đến những thành phố tuyệt vời nhất trên hành trình đáng nhớ này.</Text>
                        <FlexBoxChange>
                            <FlexBox_50_P_0_15>
                                <Image src='./images/gallery-1-1.jpg'></Image>
                            </FlexBox_50_P_0_15>
                            <FlexBox_50_P_0_15>
                                <Image src='./images/gallery-1-2.jpg'></Image>
                            </FlexBox_50_P_0_15>
                        </FlexBoxChange>
                    </ScrollToShow>
                </FlexBox_50_P_0_15>
            
            
                <FlexBox_50_P_0_15>
                    <ScrollToShow rightToLeft>
                        <Image src='./images/gallery-1-3.jpg'></Image>
                        <GallaryBtn>
                            <Span small>Xem video</Span>
                            <Icons.CirclePlayIcon />
                        </GallaryBtn>
                    </ScrollToShow>
                </FlexBox_50_P_0_15>
            
        </FlexBoxChange>
    </WrapperChange>
};

const WrapperChange = styled(Wrapper)`
    padding: 100px 0;
`

const FlexBoxChange = styled(FlexBox)`
    margin: 0 -15px;
`

const FlexBox_50_P_0_15 = styled.div`
    width: 50%;
    padding: 0 15px;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    border-radius: 10px;
`


const GallaryBtn = styled.div`
    padding: 10px 30px;
    border-radius: 50px;
    box-shadow: 0px 0px 15px 0px rgba(255, 104, 26, 0.15);
    border: 1px solid var(--primary-color);
    background-color: #ffffff;
    position: absolute;
    top: 10%;
    left: -55px;
    display: flex;
    align-items: center;
`

const Span = styled(SupTitle)`
    color: #333333;
    font-weight: 600;
    padding-bottom: 2px;
`
const Icon = styled.a`
    font-size: 45px;
    color: #FF681A;
    margin-left: 20px;
    line-height: 1;
    padding: 2px;
    border-radius: 50%;
    transition: all 0.5s linear;

    &:hover {
        
        color: #37D4D9;
        filter: drop-shadow(2px 4px 6px #7df1f5);
        cursor: pointer;
    }
`


export default BestCity;
