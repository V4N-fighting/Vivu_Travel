import styled from "styled-components";
import { Icon, UnifiedCardWrapper } from '../../styled';
import {  faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


interface TourCardProps {
  url: string,
  label: string,
  name: string,
  current: [
    page:string, 
    id: string,
    value: string
  ]
}



const TourCard: React.FC<TourCardProps> = ({url, label, name, current}) => {
  const navigate = useNavigate();

  const [page, id, value] = current;
  const handleViewDetail = () => {
    const queryParams = new URLSearchParams();
    if (current) queryParams.append(page, String(id));


    navigate(`/trips?${queryParams.toString()}`);

    window.scrollTo({ top: 200, behavior: 'smooth' });
};
  
  return (
    <UnifiedCardWrapper>
        <Wrap onClick={handleViewDetail}>
          <Image url={url} className="zoom-hover" />
          <Label>{label}</Label>
        </Wrap>
        <Name>{name}<Icon icon={faArrowRight}/></Name>
    </UnifiedCardWrapper>
  );
};



const Wrap = styled.div`
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
`
const Image = styled.div<{url: string}>`
  padding-top: 100%;
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.5s ease;
`
const Label = styled.span`
  background: rgba(55, 212, 217, 0.9);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 50px;
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 10;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
`

const Name = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #111111;
  text-transform: capitalize;
  margin: 15px 0 0; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.3s ease;

  &:hover {
    color: #ff681a;

    ${Icon} {
      transform: translateX(5px);
      transition: transform 0.3s ease;
    }
  }
`


export default TourCard;
