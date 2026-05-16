import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Banner from './Banner';
import ListFeatures from './ListFeatures';
import BestCity from './BestCity';
import ListCard from './ListCard';
import BeautiCity from './BeautiCity';
import SpecialOffer from './SpecialOffer';
import Tip from './Tip';
import Feedback from './Feedback';
import News from './News';

// Animated counter hook
const useCounter = (end: number, duration: number = 2000, startCounting: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, startCounting]);

  return count;
};

// Stats counter section
const StatsCounter: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const tours = useCounter(150, 2000, isVisible);
  const customers = useCounter(2500, 2500, isVisible);
  const destinations = useCounter(50, 1800, isVisible);
  const reviews = useCounter(4800, 2200, isVisible);

  const stats = [
    { icon: '🌍', value: tours, suffix: '+', label: 'Tours' },
    { icon: '👥', value: customers, suffix: '+', label: 'Khách hàng' },
    { icon: '📍', value: destinations, suffix: '+', label: 'Điểm đến' },
    { icon: '⭐', value: reviews, suffix: '+', label: 'Đánh giá' },
  ];

  return (
    <StatsSection ref={ref}>
      <StatsOverlay />
      <StatsWrapper>
        {stats.map((stat, index) => (
          <StatItem key={index} $delay={index * 0.15}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value.toLocaleString()}{stat.suffix}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatItem>
        ))}
      </StatsWrapper>
    </StatsSection>
  );
};

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

      {/* Features Section */}
      <SectionWrapper>
        <ListFeatures />
      </SectionWrapper>

      {/* Stats Counter */}
      <StatsCounter />

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

      {/* Travel Tips Section */}
      <SectionWrapper>
        <Tip />
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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

/* ====================== STYLED COMPONENTS ====================== */

const HomeWrapper = styled.div`
  overflow-x: hidden;
  background-color: #fefefe;
`;

const SectionWrapper = styled.div`
  position: relative;
`;

/* ---- Stats Counter Section ---- */

const StatsSection = styled.div`
  position: relative;
  padding: 80px 0;
  background-image: url('./images/testimonial-bg.jpg');
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StatsOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(28, 28, 28, 0.85), rgba(255, 104, 26, 0.7));
`;

const StatsWrapper = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 1250px;
  margin: 0 auto;
  padding: 0 30px;
  flex-wrap: wrap;
  gap: 30px;
`;

const StatItem = styled.div<{ $delay: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeInUp} 0.8s ease-out ${props => props.$delay}s both;
  padding: 30px 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  min-width: 200px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const StatIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
  animation: ${float} 3s ease-in-out infinite;
`;

const StatValue = styled.div`
  font-size: 42px;
  font-weight: 800;
  color: #ffffff;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  background: linear-gradient(90deg, #ffffff, #FF681A, #ffffff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 3s linear infinite;
`;

const StatLabel = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
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
