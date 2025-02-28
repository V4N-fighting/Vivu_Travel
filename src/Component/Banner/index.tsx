import { Link } from "react-router-dom";
import styled from "styled-components";



interface BannerProps {
    background: string,
    pageName: string,
    thisPage: string
}

const Banner: React.FC<BannerProps> = ({background, pageName, thisPage}) => {
    return ( 
        <Wrapper url={background}>
            <Contain>
                <PageName>{pageName}</PageName>
                <Navigate>
                    <LinkPage to={"/home"}>Trang chủ</LinkPage>
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
`

const Contain = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
`

const PageName = styled.div`
    font-size: 65px;
    color: var(--white-text-color);
    text-transform: capitalize;
    line-height: 1.4;
    margin-bottom: 20px;
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
`

const Space = styled.div`
    margin: 0 10px;
`


export default Banner;