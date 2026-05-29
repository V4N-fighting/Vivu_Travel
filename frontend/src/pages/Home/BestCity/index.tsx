import styled from "styled-components";
import { FlexBox, SupTitle, Text, Title, Wrapper } from "../../../styled";
import ScrollToShow from "../../../Component/ScrollToShow";


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




export default BestCity;
