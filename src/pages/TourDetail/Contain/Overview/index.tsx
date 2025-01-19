import styled from "styled-components"
import { Text, Title } from "../../../../styled"

interface OverviewProps {
}

export const Overview:React.FC<OverviewProps> = ({}) => {
    return (
        <Wrap>
            <Title small>Overview</Title>
            <Text small>
            Travel is the movement of people between relatively distant geographical locations, and can involve travel by foot, bicycle, automobile, train, boat, bus, airplane, or other means, with or without luggage, and can be one way or round trip. Travel can also include relatively short stays between successive movements.

            The origin of the word “travel” is most likely lost to history. The term “travel” may originate from the Old French word travail, which means ‘work’. According to the Merriam Webster dictionary, the first known use of the word travel was in the 14th century.
            </Text>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
`