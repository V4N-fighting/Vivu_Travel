import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

interface CarouselProps {
  slides: React.ReactNode[]; // Thay đổi kiểu dữ liệu
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slidesToShow?: number; // Thêm slidesToShow vào props
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoSlide = true,
  autoSlideInterval = 3000,
  slidesToShow = 3, // Giá trị mặc định
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    if (!autoSlide) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, totalSlides]);

  const getVisibleSlides = () => {
    return Array.from({ length: slidesToShow }, (_, i) => 
      slides[(currentSlide + i) % totalSlides]
    );
  };

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  return (
    <CarouselContainer>
      <SliderWrapper>
        <SliderContainer>
          {getVisibleSlides().map((slide, index) => (
            <Slide key={index} slidesToShow={slidesToShow}>
              {slide}
            </Slide>
          ))}
        </SliderContainer>
      </SliderWrapper>
      <DotsContainer>
        {[...Array(totalSlides)].map((_, index) => (
          <Dot
            key={index}
            active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-bottom: 50px;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 50px auto;
  overflow: hidden;
`;

const SliderContainer = styled.div`
  display: flex;
  justify-content: space-around;
  transition: all 0.5s ease; 
  gap: 20px;
`;

const Slide = styled.div<{ slidesToShow: number }>`
  width: calc(100% / ${props => props.slidesToShow} - 40px);
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "black" : "lightgray")};
  cursor: pointer;
`;

export default Carousel;
