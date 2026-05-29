import React from 'react';
import styled, { keyframes } from 'styled-components';
import Banner from './Banner';

import BestCity from './BestCity';
import ListCard from './ListCard';
import BeautiCity from './BeautiCity';
import SpecialOffer from './SpecialOffer';
import Tip from './Tip';
import Feedback from './Feedback';
import News from './News';



// Parallax divider between sections
const ParallaxDivider: React.FC<{ imageUrl: string; quote: string; author?: string }> = ({ imageUrl, quote, author }) => {
  return (
    <DividerSection $imageUrl={imageUrl}>
      <DividerOverlay />
      <DividerContent>
        <QuoteIcon>"</QuoteIcon>
        <QuoteText>{quote}</QuoteText>
        {author && <QuoteAuthor>— {author}</QuoteAuthor>}
      </DividerContent>
    </DividerSection>
  );
};

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      {/* Hero Banner Section */}
      <SectionWrapper>
        <Banner />
      </SectionWrapper>


      {/* Best Cities Section */}
      <SectionWrapper>
        <BestCity />
      </SectionWrapper>

      {/* Tour Packages Carousel */}
      <SectionWrapper>
        <ListCard />
      </SectionWrapper>

      {/* Parallax Quote Divider */}
      <ParallaxDivider
        imageUrl="./images/offer-bg.jpg"
        quote="Cuộc sống là một hành trình, không phải đích đến. Hãy tận hưởng từng khoảnh khắc."
        author="Vivu Travel"
      />

      {/* Beautiful Cities / Activities */}
      <SectionWrapper>
        <BeautiCity />
      </SectionWrapper>

      {/* Special Offer Section */}
      <SectionWrapper>
        <SpecialOffer />
      </SectionWrapper>

      {/* Customer Feedback */}
      <SectionWrapper>
        <Feedback />
      </SectionWrapper>

      {/* News / Blog Section */}
      <SectionWrapper>
        <News />
      </SectionWrapper>

      {/* Call to Action */}
      <CTASection>
        <CTAOverlay />
        <CTAContent>
          <CTATitle>Sẵn sàng cho chuyến phiêu lưu tiếp theo?</CTATitle>
          <CTASubtitle>Đặt tour ngay hôm nay và nhận ưu đãi đặc biệt lên đến 30%</CTASubtitle>
          <CTAButton href="/trips">Khám phá ngay →</CTAButton>
        </CTAContent>
      </CTASection>
    </HomeWrapper>
  );
};

/* ====================== ANIMATIONS ====================== */

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

/* ====================== STYLED COMPONENTS ====================== */

const HomeWrapper = styled.div`
  overflow-x: hidden;
  background-color: #fefefe;
`;

const SectionWrapper = styled.div`
  position: relative;
`;



/* ---- Parallax Divider ---- */

const DividerSection = styled.div<{ $imageUrl: string }>`
  position: relative;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.$imageUrl});
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const DividerOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(55, 212, 217, 0.75), rgba(255, 104, 26, 0.75));
`;

const DividerContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 30px;
`;

const QuoteIcon = styled.span`
  font-size: 80px;
  color: rgba(255, 255, 255, 0.3);
  font-family: Georgia, serif;
  line-height: 0.5;
  display: block;
  margin-bottom: 10px;
`;

const QuoteText = styled.p`
  font-size: 26px;
  color: #ffffff;
  font-weight: 600;
  line-height: 1.6;
  font-style: italic;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

const QuoteAuthor = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
`;

/* ---- Call to Action Section ---- */

const CTASection = styled.div`
  position: relative;
  padding: 120px 30px;
  background-image: url('./images/banner-bg-1.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
`;

const CTAOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(28, 28, 28, 0.9) 0%, rgba(255, 104, 26, 0.85) 100%);
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 42px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.3;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
`;

const CTASubtitle = styled.p`
  font-size: 18px;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 40px;
  line-height: 1.6;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 18px 50px;
  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  color: #FF681A;
  background: #ffffff;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  cursor: pointer;
  animation: ${pulse} 2s ease-in-out infinite;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: #FF681A;
    color: #ffffff;
    animation-play-state: paused;
  }
`;

export default Home;
