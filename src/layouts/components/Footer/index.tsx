import styled from 'styled-components';
import FooterTop from './FooterTop';
import FooterBottom from './FooterBottom';

const Footer: React.FC = () => {
    return (
        <FooterWrapper>
            <FooterTop />
            <FooterBottom />
        </FooterWrapper>
    );
};

const FooterWrapper = styled.div`
    position: relative;
    margin-top: 200px;
`;


export default Footer;
