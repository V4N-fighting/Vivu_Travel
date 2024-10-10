import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


interface SliderProps {
  slides: React.ReactElement[]; // Array of image URLs or any content
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 3; // Số slide hiển thị cùng lúc
  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 2000); // Chuyển slide sau mỗi 2 giây

    return () => clearInterval(interval); // Clear interval khi component unmount
  }, [totalSlides]);

  const getVisibleSlides = () => {
    // Xử lý vòng lặp khi đến cuối, quay lại đầu
    let visibleSlides = [];
    for (let i = 0; i < slidesToShow; i++) {
      visibleSlides.push(slides[(currentSlide + i) % totalSlides]);
    }
    return visibleSlides;
  };

  return (
    <SliderWrapper>
      <SliderContainer>
        {getVisibleSlides().map((slide, index) => (
          <Slide key={index}>
            {slide}
          </Slide>
        ))}
      </SliderContainer>
    </SliderWrapper>
  );
};


export const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
`;

export const SliderContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

export const Slide = styled.div`
  min-width: calc(100% / 3); /* Hiển thị 3 slide trên một hàng */
  
  img {
    width: 100%;
    display: block;
  }
`;


export default Slider;
