import styled from "styled-components";
import {  FontBody } from "../../../../styled";

interface FeatureCardProps {

}

const FeatureCard: React.FC<FeatureCardProps> = ({}) => {
    return <Wrap>
                <Contain>
                    <Image>
                        <MainImage src="./images/features-1-1.png"></MainImage>
                    </Image>
                    <Content>
                        <CardTitle>Các hoạt động đặc biệt</CardTitle>
                        <CardText>Các hoạt động đặc biệt mang đến trải nghiệm khác biệt và độc đáo</CardText>
                    </Content>
                </Contain>
            </Wrap>
};

const Image = styled.div`
    position: relative;
    z-index: 1;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    transition: 0.5s ease-in-out;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;

    &::before {
        content: "";
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transition: 0.5s ease-in-out;
        background-color: #37D4D9;
        position: absolute;
        left: 10px;
        top: 0;
    }

    &::after {
        content: "";
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transition: 0.5s ease-in-out;
        background-color: #37D4D9;
        position: absolute;
        right: 10px;
        bottom: 0;
    }
`

const Wrap = styled.div`
    width: 25%;
    background-color: #FF681A;
    padding: 0 15px;
    margin: 0 15px;
    border-radius: 20px;
    transition: all 0.4s ease-out;

    &:hover {
        background-color: #37D4D9;
        
    }

    &:hover ${Image} {
    &::after {
        background-color: #FF681A;
    }
    &::before {
        background-color: #FF681A;
    }
}
`
const Contain = styled.div`
    padding: 30px 30px 10px;
    background-image: url('./images/features.png');
`

const MainImage = styled.img`
    width: 40px;
`

const Content = styled.div`
    
`
const CardTitle = styled(FontBody)`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    transition: 0.5s ease-in-out;
    color: #ffffff;
    line-height: 1.4;
    margin: 0 0 15px 0;
    text-align: center;
`
const CardText = styled(FontBody)`
    margin: 0 0 18px 0;
    color: #ffffff;
    line-height: 1.625;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
`

export default FeatureCard;