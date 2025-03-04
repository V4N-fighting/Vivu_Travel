import styled, { keyframes } from "styled-components";
import { Wrapper, Text, FlexBox, Title, Icon, Grid, GridRow, GridCol } from "../../../../styled";
import { LogoLink, Logo } from "../../Header/HeaderBottom";
import { SocialIcon } from "../../Header/HeaderBottom/SideMenu";
import { faTwitter, faInstagram, faPinterestP, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import Button from "../../../../Component/BaseComponent/Button/Button";
import { Link } from "react-router-dom";

// Define the props type for the FooterBottomWrapper component
interface FooterBottomWrapperProps {
    url: string;
}

const handleScroll = () => {
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }

const FooterBottom: React.FC = () => {
    return (
        <FooterBottomWrapper url="./images/footer-bg-scaled-1.jpg">
            <ContentWrapper>
                <Wrapper>
                    <Content>
                        <Grid>
                            <GridRow margin="10px">
                                <GridCol col={3}>
                                    <LogoLink to='/'>
                                        <Logo src="./images/2-e1708591603100.png" />
                                    </LogoLink>
                                    <Descr>
                                        Chào mừng bạn đến với gói du lịch tốt nhất của chúng tôi! Nếu bạn đang tìm kiếm một hành trình đáng nhớ và tiện ích, đây là lựa chọn hoàn hảo dành cho bạn.
                                    </Descr>
                                    <FlexBox>
                                            <Icon icon={faFacebookF} />
                                            <Icon icon={faTwitter} />
                                            <Icon icon={faInstagram} />
                                            <Icon icon={faPinterestP} />
                                    </FlexBox>
                                </GridCol>
                                <GridCol col={2}>
                                    <TitleColumn>Điều hướng</TitleColumn>
                                    <MenuList>
                                        <MenuItem><LinkElement to="/home" onClick={handleScroll}>Trang chủ</LinkElement></MenuItem>
                                        <MenuItem><LinkElement to="/tours" onClick={handleScroll}>Tours</LinkElement></MenuItem>
                                        <MenuItem><LinkElement to="/about" onClick={handleScroll}>Về chúng tôi</LinkElement></MenuItem>
                                        <MenuItem><LinkElement to="/blog" onClick={handleScroll}>Blog</LinkElement></MenuItem>
                                        <MenuItem><LinkElement to="/contact" onClick={handleScroll}>Liên hệ</LinkElement></MenuItem>
                                    </MenuList>
                                </GridCol>
                                <GridCol col={3}>
                                    <TitleColumn>Instagram</TitleColumn>
                                    <GridBox>
                                        <GridItem>
                                            <ItemImg src="./images/insta1.jpg" />
                                        </GridItem>
                                        <GridItem>
                                            <ItemImg src="./images/insta2.jpg" />
                                        </GridItem>
                                        <GridItem>
                                            <ItemImg src="./images/insta3.jpg" />
                                        </GridItem>
                                        <GridItem>
                                            <ItemImg src="./images/insta4.jpg" />
                                        </GridItem>
                                        <GridItem>
                                            <ItemImg src="./images/insta5.jpg" />
                                        </GridItem>
                                        <GridItem>
                                            <ItemImg src="./images/insta6.jpg" />
                                        </GridItem>
                                    </GridBox>
                                </GridCol>
                                <GridCol col={4}>
                                    <TitleColumn>Theo dõi</TitleColumn>
                                    <Descr>Đăng ký để nhận được tin tức mới nhất</Descr>
                                    <Input placeholder="Email..." />
                                    <Button uppercase orange>Đăng ký</Button>
                                </GridCol>
                            </GridRow>
                        </Grid>
                    </Content>
                </Wrapper>
            </ContentWrapper>
            <FooterEnd>
                <Wrapper>
                    <ContentEndWrapper>
                        <EndItem>
                            <Descr>© Thiết kế và lập trình bởi</Descr>
                            <ImageEnd src="./images/logo-mona-thu-gon-trang.png" />
                        </EndItem>
                        <EndItem>
                            <LinkDescr>Chính sách</LinkDescr>
                            <LinkDescr>Điều khoản</LinkDescr>
                        </EndItem>
                    </ContentEndWrapper>
                </Wrapper>
            </FooterEnd>
        </FooterBottomWrapper>
    );
};

const LinkElement = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const FooterBottomWrapper = styled.div<FooterBottomWrapperProps>`
    background-image: url(${props => props.url});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: auto;
    padding-top: 290px;
`;

const ContentWrapper = styled.div``;

const FooterEnd = styled.div``;

const Content = styled.div`
    display: flex;
    flex-wrap: initial;
    justify-content: space-between;
    align-items: initial;
    align-content: initial;
    flex-basis: auto;
    flex-grow: 1;
    flex-shrink: 1;
    align-self: auto;
    flex-direction: row;
    gap: 0px 0px;
    width: 100%;
    max-width: 1250px;
    margin: 0 auto;
    padding-inline-start: 0;
    padding-inline-end: 0;
    height: 100%;
    text-align: initial;
    padding-block-start: 0px;
    padding-block-end: 93px;
`;


const leftToRight = keyframes`
    0%, 100% {
        left: 0px;
    }
    50% {
        left: 56px;
    }
`;

const TitleColumn = styled.p`
    border: none;
    font-size: 22px;
    margin: 0 0 30px 0;
    padding: 0 0 20px 0;
    color: #ffffff;
    position: relative;
    font-weight: 600;
    line-height: 1em;

    &::before {
        content: "";
        position: absolute;
        width: 60px;
        height: 2px;
        background-color: #ff681a;
        left: 0;
        bottom: 0;
    }

    &::after {
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        outline: 4px solid #ff681a;
        border-radius: 50%;
        background-color: #ffffff;
        left: 4px;
        bottom: -1px;
        animation: ${leftToRight} infinite 5s linear;
    }
`;

const Descr = styled(Text)`
    font-size: 16px;
    margin: 20px 0 18px;
    color: #ffffff;
`;

const SocialIconItem = styled(SocialIcon)`
    border: 0.5px solid #ffffff;
    background-color: transparent;
    margin-right: 10px;
    padding: 25px;
`;


const MenuList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const MenuItem = styled(Descr)`
    color: #ffffff;
    padding: 0;
    margin-bottom: 15px;
    letter-spacing: 0.05em;
    cursor: pointer;

    &:hover {
        color: #ff681a;
    }

    &::before {
        content: '›';
        margin-right: 10px;
    }
`;

const GridBox = styled.div`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(3, 1fr);
`;

const GridItem = styled.div`
    overflow: hidden;
    border-radius: 5px;
`;

const ItemImg = styled.img`
    height: auto;
    max-width: 100%;
    border: none;
    border-radius: 0;
    box-shadow: none;
    width: 100% !important;
    transition: 0.5s ease-in-out;
`;

const Input = styled.input`
    display: block;
    font-weight: 400;
    line-height: 1.5;
    background-clip: padding-box;
    appearance: none;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    font-size: 14px;
    width: 100%;
    border-radius: 10px;
    color: #ffffff;
    border: 1px solid #ffccb1;
    padding: 16px;
    outline: none;
    margin-bottom: 15px;
    background-color: transparent;
    height: 46px;

    &:focus {
        border: 1px solid #ff681a;
    }
`;

const ContentEndWrapper = styled.div`
    padding: 20px 0;
    margin: 0 15px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ffccb1;
`;

const EndItem = styled.div`
    display: flex;
    height: fit-content;
    align-items: center;
`;

const ImageEnd = styled.img`
    max-width: 100%;
    height: auto;
    width: 200px;
    object-fit: contain;
    margin: 0;
    height: calc(200px * 56 / 870);
`;

const LinkDescr = styled(Descr).attrs({ as: 'a' })`
    padding: 0 15px;
    margin: 0;

    &:hover {
        color: #ff681a;
        cursor: pointer;
    }

    & + & {
        border-left: 1px solid #ff681a;
    }
`;

export default FooterBottom;
