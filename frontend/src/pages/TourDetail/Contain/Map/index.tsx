import styled from "styled-components"
import { Title } from "../../../../styled"

interface MapProps {
    data: any;
}

export const Map:React.FC<MapProps> = ({data}) => {
    const query = encodeURIComponent(data?.name || "");
    const mapUrl = query 
        ? `https://maps.google.com/maps?q=${query}&output=embed` 
        : "https://maps.google.com/maps?q=Vietnam&output=embed";

    return (
        <Wrap>
            <Title small>Bản đồ lộ trình - {data?.name || ""}</Title>
            <StyledIframe
                src={mapUrl}
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
