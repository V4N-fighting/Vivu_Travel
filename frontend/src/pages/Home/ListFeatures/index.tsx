import styled from "styled-components";
import { RowBetween,  Wrapper } from "../../../styled";
import FeatureCard from "./FeatureCard";

interface ListFeaturesProps {

}

const ListFeatures: React.FC<ListFeaturesProps> = ({}) => {
    return <Wrap>
            <MarginBottom>
                <RowBetween>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                    <FeatureCard></FeatureCard>
                </RowBetween>
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