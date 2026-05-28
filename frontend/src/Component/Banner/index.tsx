import { Link } from "react-router-dom";
import styled from "styled-components";
import config from "../../config";
import { useBannerByLocation } from "../../service/bannerService";
import { GET_IMAGE_URL } from "../../api";


interface BannerProps {
    background: string,
    pageName: string,
    thisPage: string,
    pageLocation?: string
}

const Banner: React.FC<BannerProps> = ({background, pageName, thisPage, pageLocation}) => {
    const { banner } = useBannerByLocation(pageLocation || '');
    
    // Nếu có banner từ admin cho page này, dùng ảnh đó; nếu không, dùng prop background
    const activeBanner = banner && banner.length > 0 ? banner[0] : null;
    const bgUrl = activeBanner?.firstImage 
        ? (activeBanner.firstImage.startsWith('http') ? activeBanner.firstImage : `${GET_IMAGE_URL}/banners/${activeBanner.firstImage}`)
        : background;
    
    const displayName = activeBanner?.textContent || pageName;

    return ( 
        <Wrapper url={bgUrl}>
            <Overlay />
            <Contain>
                <PageName>{displayName}</PageName>
                <Navigate>
                    <LinkPage to={config.routes.home}>Trang chủ</LinkPage>
                    <Space>/</Space>
                    <LinkPage to={thisPage}>{pageName}</LinkPage>
                </Navigate>
            </Contain>
        </Wrapper>
     );
}

const Wrapper = styled.div<{url: string}>`
    background-repeat: no-repeat;
    background-position: center top;
    background-image: url(${props => props.url});
    background-size: cover;
    padding-top: 180px;
    padding-bottom: 180px;
    position: relative;
`

const Overlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(28, 28, 28, 0.5), rgba(255, 104, 26, 0.3));
`

const Contain = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`

const PageName = styled.div`
    font-size: 65px;
    color: var(--white-text-color);
    text-transform: capitalize;
    line-height: 1.4;
    margin-bottom: 20px;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
`

const Navigate = styled.div`
    font-size: 20px;
    color: var(--white-text-color);
    text-transform: capitalize;
    line-height: 1.4;
    display: flex;
`

const LinkPage = styled(Link)`
    color: var(--white-text-color);
    transition: color 0.3s ease;
    
    &:hover {
        color: #FF681A;
    }
`

const Space = styled.div`
    margin: 0 10px;
`


export default Banner;