import styled from "styled-components"
import { Text, Title } from "../../../../styled"

interface MapProps {
}

export const Map:React.FC<MapProps> = ({}) => {
    return (
        <Wrap>
            <Title small>Map</Title>
            <StyledIframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.9078174334218!2d106.67313687442847!3d10.818366258419962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291dfa96f209%3A0x5cba9b5f3bf3ab28!2zNDM5IE5ndXnhu4VuIFbEg24gQ8O0bmcsIFBoxrDhu51uZyAzLCBHw7IgVuG6pXAsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1736763212684!5m2!1svi!2s"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
`

const StyledIframe = styled.iframe`
    width: 100%;
    height: 450px;
    border: 0;
`;
