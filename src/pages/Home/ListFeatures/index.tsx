import styled from "styled-components";
import { FlexBox, FlexBoxBetween, Margin_15, Wrapper } from "../../../styled";
import FeatureCard from "./FeatureCard";

interface ListFeaturesProps {

}

const ListFeatures: React.FC<ListFeaturesProps> = ({}) => {
    return <Wrap>
        <Margin_15>
            <MarginBottom>
                <FlexBoxBetween>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                </FlexBoxBetween>
            </MarginBottom>
        </Margin_15>
    </Wrap>
};

const Wrap = styled(Wrapper)`
    padding: 0 0 100px;
`

const MarginBottom = styled.div`
    margin-bottom: 100px;
    
`



export default ListFeatures