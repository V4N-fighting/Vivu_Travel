import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



  
const StarRating: React.FC<{ star: number }> = ({ star }) => {
  return (
    <StarContainer>
      {Array.from({ length: star }, (_, index) => (
        <FontAwesomeIcon key={index} icon={faStar} />
      ))}
    </StarContainer>
  );
};


const StarContainer = styled.div`
  display: flex;
  gap: 5px; 
  color: var(--secondary-color);
`;

export default StarRating;
