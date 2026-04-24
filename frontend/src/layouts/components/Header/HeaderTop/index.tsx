import React, { ReactNode } from "react";
import { Wrapper, FlexBox, Text, RowBetween, Icon } from "../../../../styled";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CircleIcon from "../../../../Component/BaseComponent/Icons/CircleIcon";
import Icons from "../../../../Component/BaseComponent/Icons";
import { useCurrentUser } from "../../../../Hooks/useCurrentUser";
import {User} from "../../../../service/authService"

interface ItemContentProps {
    icon: ReactNode;
    text?: string;
}



const ItemContent: React.FC<ItemContentProps> = ({ icon, text }) => {
    return (
        <ItemWrapper>
            <CircleIcon>{icon}</CircleIcon>
            {text && <Text small white style={{margin: 0}}>{text}</Text>}
        </ItemWrapper>
    );
};

const UserContent: React.FC<ItemContentProps> = ({ icon }) => {
    return (
        <ItemWrapper>
            <UserBox>{icon}</UserBox>
        </ItemWrapper>
    );
};

const HeaderTop: React.FC = () => {
    const user: User | null = useCurrentUser();
    return (
        <Contain>
            <Wrapper>
                <RowBetween>
                    <FlexBoxPadding>
                        <ItemContent icon={<Icons.EnvelopeIcon />} text='info@themona.global' />
                        <ItemContent icon={<Icons.PhoneIcon />} text='1900 636 648' />
                    </FlexBoxPadding>
                    <FlexBoxPadding style={{justifyContent: 'end'}}>
                        {!user && <Link to='/login'>
                            <UserContent icon={<Icons.CircleUserIcon white style={{padding: 0, margin: 0}}/>}  />
                        </Link>
                        }
                        
                    </FlexBoxPadding>
                </RowBetween>
            </Wrapper>
        </Contain>
    );
}

const Contain = styled.div`
    background-color: #1C1C1C;
`


const UserBox = styled.a`
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
