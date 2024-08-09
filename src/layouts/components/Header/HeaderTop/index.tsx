import React from "react";
import { Wrapper, FlexBox, Title, FlexBoxBetween } from "../../../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

interface ItemContentProps {
    icon: IconProp;
    text?: string;
}

const Contain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1C1C1C;
`

const Text = styled(Title)`
    margin: 0 15px 0 0;
    font-weight: 500;
    cursor: pointer;
    transition: all ease 0.5s;

    &:hover {
        color: #37D4D9;
    }
`;



export const Icon = styled(FontAwesomeIcon)`
    width: 16px;
    height: 16px;
    color: #FF681A;
    transition: all ease 0.5s;

    &:hover {
        color: #ffffff
    }
`;

const UserIcon = styled(FontAwesomeIcon)`
    padding: 4px 0;
`;


const User = styled.a`
    display: block;
    padding: 17px 22px;
    color: #ffffff;
    background-color: #37D4D9;
    transition: all ease 0.5s;
    cursor: pointer;

    &:hover {
        background-color: #FF681A;
    }
`

export const BoxIcon = styled.div`
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border-radius: 50%;
    transition: all ease 0.5s;
    background-color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #37D4D9;
    }
`;

const ItemWrapper = styled.div`
    display: flex;
    align-items: center;

    &:hover {
        ${Icon} {
            color: #ffffff;
        };
        ${BoxIcon} {
            background-color: #37D4D9;
        }
    }
`;



const FlexBoxPadding = styled(FlexBox)`
    padding: 0 15px;
`;

const ItemContent: React.FC<ItemContentProps> = ({ icon, text }) => {
    return (
        <ItemWrapper>
            <BoxIcon><Icon icon={icon} /></BoxIcon>
            {text && <Text small white>{text}</Text>}
        </ItemWrapper>
    );
};

const UserContent: React.FC<ItemContentProps> = ({ icon }) => {
    return (
        <ItemWrapper>
            <User><UserIcon icon={icon} /></User>
        </ItemWrapper>
    );
};

function HeaderTop() {
    return (
        <Contain>
            <Wrapper>
                <FlexBoxBetween>
                    <FlexBoxPadding>
                        <ItemContent icon={faEnvelope} text='info@themona.global' />
                        <ItemContent icon={faPhone} text='1900 636 648' />
                    </FlexBoxPadding>
                    <FlexBoxPadding>
                        <UserContent icon={faCircleUser}  />
                    </FlexBoxPadding>
                </FlexBoxBetween>
            </Wrapper>
        </Contain>
    );
}

export default HeaderTop;
