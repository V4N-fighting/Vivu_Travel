import React from "react";
import { Wrapper, FlexBox, Text, FlexBoxBetween, Icon } from "../../../../styled";
import { faCircleUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { IconDefinition, IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CircleIcon from "../../../../Component/CircleIcon";

interface ItemContentProps {
    icon: IconDefinition;
    text?: string;
}



const ItemContent: React.FC<ItemContentProps> = ({ icon, text }) => {
    return (
        <ItemWrapper>
            <CircleIcon icon={icon}/>
            {text && <Text small white style={{margin: 0}}>{text}</Text>}
        </ItemWrapper>
    );
};

const UserContent: React.FC<ItemContentProps> = ({ icon }) => {
    return (
        <ItemWrapper>
            <User><Icon white icon={icon} style={{margin: 0}}/></User>
        </ItemWrapper>
    );
};

const HeaderTop: React.FC = () => {
    return (
        <Contain>
            <Wrapper>
                <FlexBoxBetween>
                    <FlexBoxPadding>
                        <ItemContent icon={faEnvelope} text='info@themona.global' />
                        <ItemContent icon={faPhone} text='1900 636 648' />
                    </FlexBoxPadding>
                    <FlexBoxPadding style={{justifyContent: 'end'}}>
                        <Link to='/login'><UserContent icon={faCircleUser}  /></Link>
                    </FlexBoxPadding>
                </FlexBoxBetween>
            </Wrapper>
        </Contain>
    );
}

const Contain = styled.div`
    background-color: #1C1C1C;
`


const User = styled.a`
    display: block;
    padding: 17px 22px;
    color: var(--white-color);
    background-color: var(--secondary-color);
    transition: all ease 0.5s;
    cursor: pointer;

    &:hover {
        background-color: var(--primary-color);
    }
`
const FlexBoxPadding = styled(FlexBox)`
    padding: 0 15px;
`;

export const BoxIcon = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border-radius: 50%;
    transition: all ease 0.5s;
    background-color: var(--white-color);

    &:hover {
        background-color: var(--secondary-color);
    }
`;

const ItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 15px 0 0;

    &:hover {
        ${Icon} {
            color: var(--white-color);
        };
        ${BoxIcon} {
            background-color: var(--secondary-color);
        }
    }
`;





export default HeaderTop;
