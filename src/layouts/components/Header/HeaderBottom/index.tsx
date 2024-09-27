import React, { useState } from "react";
import styled from "styled-components";
import { FlexBox, Wrapper } from "../../../../styled";
import { BoxIcon, Icon } from "../HeaderTop";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";
import SideMenu from "./SideMenu"; // Import SideMenu component
import SideSearch from "./SideSearch";


const HeaderBottom: React.FC = () => {
    const [isSideMenuVisible, setSideMenuVisible] = useState(false);
    const [isSideSearchVisible, setSideSearchVisible] = useState(false);

    const handleMenuClick = () => {
        setSideMenuVisible(true);
    };

    const handleCloseSideMenu = () => {
        setSideMenuVisible(false);
    };

    const handleSearchClick = () => {
        setSideSearchVisible(true);
    };

    const handleCloseSideSearch = () => {
        setSideSearchVisible(false);
    };

    return (
        <Contain>
            <Wrapper>
                <FlexBox>
                    <Flex20Percent>
                        <FlexBoxPadding>
                            {/* logo */}
                            <LogoLink>
                                <Logo src="./images/logo.png" />
                            </LogoLink>
                        </FlexBoxPadding>
                    </Flex20Percent>
                    <Flex60Percent>
                        <FlexBoxPadding>
                            {/* navigation */}
                            <Navigation />
                        </FlexBoxPadding>
                    </Flex60Percent>
                    <Flex20Percent>
                        <FlexBoxPadding end={true}>
                            {/* 2 button */}
                            <SearchBoxIcon onClick={handleSearchClick}>
                                <IconOnHeaderBottom icon={faMagnifyingGlass} />
                            </SearchBoxIcon>
                            <MenuBoxIcon onClick={handleMenuClick}>
                                <IconOnHeaderBottom icon={faBars} />
                            </MenuBoxIcon>
                        </FlexBoxPadding>
                    </Flex20Percent>
                </FlexBox>
            </Wrapper>

            {/* Render SideMenu if isSideMenuVisible is true */}
            <SideMenu onClose={handleCloseSideMenu} isVisible={isSideMenuVisible} />
            <SideSearch onClose={handleCloseSideSearch} isVisible={isSideSearchVisible} />
        </Contain>
    );
}

const Contain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`;

const FlexBoxPadding = styled(FlexBox)<{ end?: boolean }>`
    padding: 0 15px;
    justify-content: ${(props) => props.end && 'end'};
`;

const Flex20Percent = styled.div`
    width: 20%;
`;

const Flex60Percent = styled.div`
    width: 60%;
`;

export const LogoLink = styled.a`
    text-decoration: none;
    display: block;
`;

export const Logo = styled.img<{ src?: string }>`
    max-width: 100%;
    height: auto;
    border: none;
    border-radius: 0;
    box-shadow: none;
    src: ${(props) => props.src};
`;

const IconOnHeaderBottom = styled(Icon)`
    width: 20px;
    height: 20px;
    color: #ffffff;
`;

const SearchBoxIcon = styled(BoxIcon)`
    width: 50px;
    height: 50px;
    background-color: #FF681A;
    transition: all ease 0.5s;
    cursor: pointer;
    margin-right: 15px;

    &:hover {
        background-color: #37D4D9;
    }
`;

const MenuBoxIcon = styled(SearchBoxIcon)`
    margin-right: 0;
`;

export default HeaderBottom;
