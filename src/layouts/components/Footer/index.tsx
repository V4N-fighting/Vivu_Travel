import styled from "styled-components";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

const FooterWrapper = styled.div`
   position: relative;

`



function Footer() {
    return ( <FooterWrapper>
       <FooterTop />
       <FooterBottom />
    </FooterWrapper> 
    );
}

export default Footer;