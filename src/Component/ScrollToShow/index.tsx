
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';



interface ScrollToShowProps {
  children: React.ReactNode; // Nội dung bên trong component
  scale?: boolean; // Thêm prop scale
  fullWidth?: boolean;
  leftToRight?: boolean; 
  rightToLeft?: boolean; 
  bottomToTop?: boolean; 
  topToBottom?: boolean; 
}
// Component ScrollToShow
const ScrollToShow: React.FC<ScrollToShowProps> = ({ children, fullWidth = false, scale = false, leftToRight = false, rightToLeft=false, bottomToTop=false, topToBottom=false }) => {
  const itemRef = useRef<HTMLDivElement | null>(null); // Tạo tham chiếu đến phần tử

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Thêm lớp 'show' khi phần tử vào tầm nhìn
          if (itemRef.current) {
            itemRef.current.classList.add('show');
          }
          observer.unobserve(entry.target); // Dừng quan sát sau khi đã hiển thị
        }
      });
    }, { threshold: 0.1 });

    if (itemRef.current) {
      observer.observe(itemRef.current); // Bắt đầu quan sát phần tử
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current); // Ngừng quan sát khi component unmount
      }
    };
  }, []);

  return <Item ref={itemRef} isFullWidth={fullWidth} scale={scale} leftToRight={leftToRight} rightToLeft={rightToLeft}  topToBottom={topToBottom}  bottomToTop={bottomToTop}>{children}</Item>; // Trả về phần tử với hiệu ứng
};

const Item = styled.div<{ scale: boolean; leftToRight: boolean; rightToLeft: boolean; bottomToTop: boolean; topToBottom: boolean, isFullWidth?: boolean }>`
  opacity: 0;
  width: ${props => props.isFullWidth && '100%'};
  transform: ${({ scale, leftToRight, rightToLeft, bottomToTop, topToBottom }) =>
      scale
      ? 'scale(0)'
      : leftToRight
      ? 'translateX(-90px)'
      : rightToLeft
      ? 'translateX(90px)' 
      : bottomToTop
      ? 'translateY(90px)'
      : topToBottom
      ? 'translateY(-90px)'
      : 'translateY(90px)'};
  transition: opacity 1.2s ease-out, transform 1.2s ease-out;

  &.show {
    opacity: 1;
    transform: ${({ scale, leftToRight, rightToLeft, bottomToTop, topToBottom }) =>
      scale
        ? 'scale(1)'
        : leftToRight
        ? 'translateX(0px)'
        : rightToLeft
        ? 'translateX(0px)' // Khôi phục về vị trí 0 cho rightToLeft
        : bottomToTop
        ? 'translateY(0px)'
        : topToBottom
        ? 'translateY(0px)'
        : 'translateY(0px)'};
  }
`;

export default ScrollToShow;
