import styled from "styled-components";
import { Icon } from '../../styled';
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
    <Wrapper>
        <Wrap onClick={handleViewDetail}>
          <Image url={url} />
          <Label>{label}</Label>
        </Wrap>
        <Name>{name}<Icon icon={faArrowRight}/></Name>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  width: 100%;
`
const Wrap = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

`
const Image = styled.div<{url: string}>`
  padding-top: 100%;
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  border-radius: 20px;

  transition: all 0.5s linear;

  &:hover {
    transform: scale(1.1);
  }
`
const Label = styled.span`
  background-color: var(--secondary-color);
  padding: 5px 8px;
  position: absolute;
  top: 5%;
  left: 5%;
  color: var(--white-color);
  font-size: 12px;
  font-weight: 600;
  border-radius: 10px;
`

const Name = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: #111111;
  text-transform: capitalize;
  margin: 20px 0 40px; 
  cursor: pointer;
  &:hover {
    color: orange;

    ${Icon} {
      transform: translateX(5px);
      transition: transform 0.5s linear;
    }
  }
`


export default TourCard;
