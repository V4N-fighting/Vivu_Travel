import styled from "styled-components"
import { Text, Title } from "../../../../styled"

interface OverviewProps {
    content: string;
}

export const Overview:React.FC<OverviewProps> = ({content}) => {
    return (
        <Wrap>
            <Title small>Overview</Title>
            <Text small>{content && content}</Text>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
`