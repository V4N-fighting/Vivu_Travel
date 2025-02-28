import styled from "styled-components";
import { FlexBox, FlexBoxBetween,  Wrapper } from "../../../styled";
import FeatureCard from "./FeatureCard";

interface ListFeaturesProps {

}

const ListFeatures: React.FC<ListFeaturesProps> = ({}) => {
    return <Wrap>
            <MarginBottom>
                <FlexBoxBetween>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                </FlexBoxBetween>
            </MarginBottom>
    </Wrap>
};

const Wrap = styled(Wrapper)`
    padding: 0 0 100px;
`

const MarginBottom = styled.div`
    margin-bottom: 100px;
    
`



export default ListFeatures