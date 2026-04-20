import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FlexBox, Wrapper } from "../../../../styled";
import Navigation from "./Navigation";
import SideMenu from "./SideMenu"; 
import SideSearch from "./SideSearch";
import { Link, useNavigate } from "react-router-dom";
import CircleIcon from "../../../../Component/BaseComponent/Icons/CircleIcon";
import Icons from "../../../../Component/BaseComponent/Icons";
import {logout} from "../../../../service/authService"
import { useClickAway } from "react-use";
import config from "../../../../config";

export enum MenuOptionUser {
    History,
    Information,
    Setting,
    Logout
}

const menuAvatarList = [
        {
            id: 0,
            name: 'Lịch sử du lịch',
            action: MenuOptionUser.History
        },
        {
            id: 1,
            name: 'Thông tin tài khoản',
            action: MenuOptionUser.Information
        },
        {
            id: 2,
            name: 'Cài đặt',
            action: MenuOptionUser.Setting
        },
        {
            id: 3,
            name: 'Đăng xuất',
            action: MenuOptionUser.Logout
        },
    ]


const HeaderBottom: React.FC = () => {



    const [isSideMenuVisible, setSideMenuVisible] = useState(false);
    const [isSideSearchVisible, setSideSearchVisible] = useState(false);
    const [isAvatarMenuVisible, setAvatarMenuVisible] = useState(false);
    const [user, setUser] = useState(() => {
    const local = localStorage.getItem('user');
        return local ? JSON.parse(local) : null;    
    });

    const menuAvatarRef = useRef(null);

    useEffect(() => {
    const listener = () => {
        const updatedUser = localStorage.getItem('user');
        if (updatedUser) setUser(JSON.parse(updatedUser));
    };
        window.addEventListener('userUpdated', listener);
        return () => window.removeEventListener('userUpdated', listener);
    }, []);




    const navigate = useNavigate();

    // handle hide menuAvatar when clicking anywhere else MenuAvatar
    useClickAway(menuAvatarRef, () => {
        setAvatarMenuVisible(false);
    });

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

    const handleAvatarClick = () => {
        setAvatarMenuVisible(prev => !prev);
    };

    const handleAvatarItemClick = (action: MenuOptionUser) => {
        switch (action ) {
            case MenuOptionUser.Logout: 
                logout();
                navigate(config.routes.login);
            break;
            case MenuOptionUser.History: 
                setAvatarMenuVisible(false)
                navigate(config.routes.profile + '?action=' + MenuOptionUser.History);
            break;
            case MenuOptionUser.Information: 
                setAvatarMenuVisible(false)
                navigate(config.routes.profile + '?action=' + MenuOptionUser.Information);
            break;
            case MenuOptionUser.Setting: 
                alert("Wait.....")
            break;
        }
    }


    return (
        <Contain>
            <Wrapper>
                <FlexBox>
                    <Flex20Percent>
                        <FlexBoxPadding>
                            {/* logo */}
                            <LogoLink to='/'>
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
                            <CircleIcon  onClick={handleSearchClick}><Icons.MagnifyingGlassIcon  /></CircleIcon>
                            <CircleIcon  onClick={handleMenuClick}><Icons.BarIcon /></CircleIcon>
                            {user && <AvatarBox>
                                <CircleIcon  onClick={handleAvatarClick}><Avatar src={user.avatar ?? "https://via.placeholder.com/40"} /></CircleIcon>
                                {isAvatarMenuVisible && <MenuAvatar ref={menuAvatarRef}>
                                    {menuAvatarList.map((item) => {
                                        return <MenuAvtItem key={item.id} onClick={() => handleAvatarItemClick(item.action)}>{item.name}</MenuAvtItem>
                                    })}
                                    
                                </MenuAvatar>}
                            </AvatarBox>}
                            
                        </FlexBoxPadding>
                    </Flex20Percent>
                </FlexBox>
            </Wrapper>

            
            <SideMenu onClose={handleCloseSideMenu} isVisible={isSideMenuVisible} />
            <SideSearch onClose={handleCloseSideSearch} isVisible={isSideSearchVisible} />
        </Contain>
    );
}

const Contain = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: #ffffff; */
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

export const LogoLink = styled(Link)`
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

const AvatarBox = styled.div`
    position: relative;
`

const Avatar = styled.img<{src: string}>`
    max-width: 100%;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: none;
    src: ${(props) => props.src};
`
const MenuAvatar = styled.div`
    position: absolute;
    top: 130%;
    right: 0;
    z-index: 99;
    background-color: #fff;
    padding: 10px 0;
    width: max-content;
    max-width: 200px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
const MenuAvtItem = styled.div`
    padding: 10px 15px;
    font-size: 16px;

    &:hover {
        color: red;
        cursor: pointer;
    }
`

// const IconOnHeaderBottom = styled(Icon)`
//     width: 20px;
//     height: 20px;
//     color: #ffffff;
// `;

// const SearchBoxIcon = styled(BoxIcon)`
//     width: 50px;
//     height: 50px;
//     background-color: #FF681A;
//     transition: all ease 0.5s;
//     cursor: pointer;
//     margin-right: 15px;

//     &:hover {
//         background-color: #37D4D9;
//     }
// `;

// const MenuBoxIcon = styled(SearchBoxIcon)`
//     margin-right: 0;
// `;

export default HeaderBottom;
