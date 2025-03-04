import React from 'react';
import styled from 'styled-components';
import Icons from '../BaseComponent/Icons';



  
const StarRating: React.FC<{ star: number }> = ({ star }) => {
  return (
    <StarContainer>
      {Array.from({ length: star }, (_, index) => (
        <Icons.StarIcon key={index}/>
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
