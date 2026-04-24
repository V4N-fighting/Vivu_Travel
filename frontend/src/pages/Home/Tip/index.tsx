import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Select } from 'antd';
import TipItem from './TipItem';
import { CenterBox, SupTitle, Title } from '../../../styled';
import ScrollToShow from '../../../Component/ScrollToShow';
import { useBlogs } from '../../../service/blogService';
import { GET_IMAGE_URL } from '../../../api';
import dayjs from 'dayjs';
import { useBanner } from '../../../service/bannerService';

const { Option } = Select;

interface TipProps {
  
}



const Tip: React.FC<TipProps> = ({}) => {
  const { blogs, isLoading: blogLoading, isError: blogError } = useBlogs();
  const { banner, isLoading: bannerLoading, isError: bannerError } = useBanner();

  // Lấy các bài viết (blogs) hoặc nếu không có thì dùng banner từ admin
  // Banners đầu trang (index 0, 1) đã dùng ở component Banner, nên ở đây lấy từ index 2 trở đi
  const tipBlogs = blogs?.slice(3, 5) || [];
  const tipBanners = banner?.filter((b: any) => b.isActive).slice(2, 4) || []; 

  return (
    <Wrapper>
      <Circle><CircleImage></CircleImage></Circle>
      <Header>
        <ScrollToShow topToBottom>
          <CenterBox>
            <SupTitle orange medium>Mẹo vặt cần thiết</SupTitle> 
            <TipTitle big>Những Mẹo Tuyệt Vời Làm Cho Chuyến Đi Của Bạn</TipTitle>
          </CenterBox>  
        </ScrollToShow>
      </Header>
      
      {/* Ưu tiên hiển thị Banner từ Admin nếu có, không thì dùng Blog */}
      {(tipBanners.length > 0 ? tipBanners : tipBlogs).map((item, index) => {
        const isBanner = !!(item as any).textContent;
        const bannerItem = isBanner ? (item as any) : null;
        const blogItem = !isBanner ? (item as any) : null;

        const imageUrl = bannerItem 
          ? getImageUrl(bannerItem.firstImage)
          : (blogItem?.thumbnail ? getImageUrl(blogItem.thumbnail, 'blogs') : `./images/${index === 0 ? '6-2-705x540.jpg' : '7-2-705x540.jpg'}`);
        
        const title = bannerItem?.textContent || blogItem?.title || '';
        const suptitle = bannerItem 
          ? 'Mẹo du lịch' 
          : (blogItem ? dayjs(blogItem.published_at).format('DD [Tháng] MM, YYYY') : '');
        
        const text = bannerItem 
          ? 'Khám phá những mẹo du lịch hữu ích giúp chuyến đi của bạn trở nên tuyệt vời và tiết kiệm hơn bao giờ hết.'
          : (blogItem?.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' || '');
        
        const label = bannerItem ? 'Vivu Travel' : (blogItem?.category || 'Mẹo du lịch');

        return (
          <ScrollToShow key={item.id} leftToRight={index === 0} rightToLeft={index === 1}>
            <TipItem 
              reverse={index === 1}
              url={imageUrl} 
              label={label} 
              suptitle={suptitle} 
              title={title} 
              text={text} 
            />
          </ScrollToShow>
        );
      })}
      <Dot><DotImage></DotImage></Dot>
    </Wrapper>
  );
};

// Hàm helper để lấy URL ảnh đúng định dạng
const getImageUrl = (url: string, type: 'banners' | 'blogs' = 'banners') => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${GET_IMAGE_URL}/${type}/${url}`;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding: 100px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 200px;
`;

const TipTitle = styled(Title)`
  width: 700px;
  margin: 40px 0;
`
const turnAround = keyframes`
    0% {
    transform: rotate(0deg) ;
  }
  100% {
    transform: rotate(360deg) ;
  }

`;

const turnUpTurnDown = keyframes`
  0% {
    transform: translateY(0) ;
  }
  50% {
    transform: translateY(40px) ;
  }
  100% {
    transform: translateY(0px) ;
  }
`;

const Dot = styled.div`
  width: 1024px;
  position: relative;
`
const DotImage = styled.div`
  position: absolute;
  bottom: 20px;
  right: -70px;
  width: 100px;
  height: 160px;
  animation: ${turnUpTurnDown} 5s infinite linear;
  background-image: url('./images/Dot.png');
  z-index: -1;
`


const Circle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-30%, -30%);
  width: 334px;
  height: 334px;
  
`

const CircleImage = styled.div`
  background-image: url('./images/circle1-1.png');
  width: 100%;
  height: 100%;
  animation: ${turnAround} 20s infinite linear;
  
`



export default Tip;
