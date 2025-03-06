import styled from "styled-components"
import { Text } from './../../../../styled/index';
import { ReactNode } from "react";

interface ContainProps {
    item: string,
    value: string,
    icon: ReactNode,
}


export const InfoDetail: React.FC<ContainProps> = ({item, value, icon}) => {
    return (
        <Wrap>
            <Text small bold >
                {icon}{item}
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

