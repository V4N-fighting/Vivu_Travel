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
`;


export default Footer;
