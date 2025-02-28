import styled from "styled-components"
import { faHotel, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../../styled";
import { Text } from './../../../../styled/index';

interface ContainProps {
    item: string,
    value: string,
    icon: IconDefinition,
}


export const InfoDetail: React.FC<ContainProps> = ({item, value, icon}) => {
    return (
        <Wrap>
            <Text small bold >
                <Icon icon={icon} style={{color: 'red'}} />{item}
            </Text>
            <Text small>{value}</Text>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    padding: 5px 0;
    margin: 0 0 10px;
`

