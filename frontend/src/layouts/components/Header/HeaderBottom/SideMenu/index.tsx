import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CloseButton from '../../../../../Component/BaseComponent/Button/CloseButton';
import { LogoLink, Logo } from '..';
import { FlexBox, Icon, Title } from '../../../../../styled';
import BlogItem from '../../../../../Component/BlogItem';
import Icons from '../../../../../Component/BaseComponent/Icons';
import { useBlogs } from '../../../../../service/blogService';
import { GET_IMAGE_URL } from '../../../../../api';
import dayjs from 'dayjs';

interface SideMenuProps {
    onClose: () => void;
    isVisible: boolean;
}

const SideMenu: React.FC<SideMenuProps> = ({ onClose, isVisible }) => {
    const [isClosing, setIsClosing] = useState(false);
    const { blogs } = useBlogs();
    
    const recentBlogs = blogs?.slice(0, 4) || [];

    useEffect(() => {
        if (isVisible) {
            setIsClosing(false);
        } else {
            setIsClosing(true);
            const timer = setTimeout(() => {
                onClose();
            }, 800); 
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 800);
    };

    const handleWrapperClick = () => {
        handleClose();
    };

    const handleContentClick = (event: React.MouseEvent) => {
        event.stopPropagation(); 
    };

    return (
        <SideMenuWrapper isVisible={isVisible} isClosing={isClosing} onClick={handleWrapperClick}>
            <ContentWrapper>
                <CloseButtonBox>
                    <CloseButton onClick={handleClose} />
                </CloseButtonBox>
                <Content onClick={handleContentClick}>
                    <LogoBox>
                        <LogoLink to='/'>
                            <Logo src="./images/logo.png" />
                        </LogoLink>
                    </LogoBox>
                    <TextBox>
                        <TitleDescr small>
                            Vivu Travel - Đồng hành cùng bạn trên mọi hành trình khám phá. Chúng tôi mang đến những trải nghiệm du lịch tuyệt vời với giá tốt nhất.
                        </TitleDescr>
                    </TextBox>
                    <SocialLinks>
                        <SocialLink href="#"><Icons.TwitterIcon /></SocialLink>
                        <SocialLink href="#"><Icons.InstagramIcon /></SocialLink>
                        <SocialLink href="#"><Icons.PinterestIcon /></SocialLink>
                    </SocialLinks>
                    <TitleMarginTop medium>Bài viết gần đây</TitleMarginTop>
                    <ListBlog>
                        {recentBlogs.map((blog) => {
                            const imageUrl = blog.thumbnail 
                                ? (blog.thumbnail.startsWith('http') ? blog.thumbnail : `${GET_IMAGE_URL}/blogs/${blog.thumbnail}`) 
                                : "./images/insta6.jpg";
                            return (
                                <BlogItem
                                    key={blog.id}
                                    imgUrl={imageUrl}
                                    timeText={dayjs(blog.published_at).format('DD [tháng] MM, YYYY')}
                                    blogTitle={blog.title}
                                    slug={blog.slug}
                                />
                            );
                        })}
                    </ListBlog>
                </Content>
            </ContentWrapper>
        </SideMenuWrapper>
    );
}

const SideMenuWrapper = styled.div<{ isVisible: boolean; isClosing: boolean }>`
    position: fixed;
    z-index: 99999;
    right: ${({ isClosing }) => (isClosing ? '-500px' : '0')};
    top: 0;
    height: 100%;
    width: ${({ isClosing }) => (isClosing ? '0%' : '100%')};
    background-color: rgba(0, 0, 0, 0.75);
    opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
    visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
    transition: right 0.8s ease, opacity 0.8s ease, visibility 0.8s ease, width 0.8s ease;
`;

const CloseButtonBox = styled.div`
    display: flex;
    justify-content: end;
`;

const ContentWrapper = styled.div`
    background-color: #ffffff;
    width: 450px;
    margin-left: auto;
    padding: 50px 30px;
    height: 100%;
    overflow-y: auto;
    position: relative;
    right: 0;
    opacity: 1;
    visibility: visible;
    transition: right 1s ease;
`;

const Content = styled.div`
    padding: 0 15px;
`;

const LogoBox = styled.div`
    margin-bottom: 20px;
`;

const TextBox = styled.div`
    margin-bottom: 20px;
`;

const TitleDescr = styled(Title)`
    font-weight: 400;
    line-height: 1.7;
    color: #666;
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
`

const SocialLink = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #FF681A;
    color: #FF681A;
    transition: all 0.3s ease;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        background-color: #FF681A;
        color: #fff;
    }
`

export const SocialIcon = styled(Icon)`
    border: 0.5px solid #FF681A;
    cursor: pointer;
`;

const TitleMarginTop = styled(Title)`
    margin-top: 46px;
    padding-bottom: 15px;
    position: relative;

    &::before {
        content: '';
        height: 2px;
        width: 15px;
        left: 0;
        border-radius: 50px;
        background-color: #FF681A;
        position: absolute;
        bottom: 0;
    }

    &::after {
        content: '';
        height: 2px;
        width: 55px;
        left: 20px;
        border-radius: 50px;
        background-color: #FF681A;
        position: absolute;
        bottom: 0;
    }
`;

const ListBlog = styled.div`
    margin-top: 23px;
`;

export default SideMenu;
