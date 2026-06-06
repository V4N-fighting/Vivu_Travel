import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Select } from 'antd';
import TipItem from './TipItem';
import { CenterBox, SupTitle, Title } from '../../../styled';
import ScrollToShow from '../../../Component/ScrollToShow';
import { useBlogs } from '../../../service/blogService';
import { GET_IMAGE_URL } from '../../../api';
import dayjs from 'dayjs';
import { useBannerByLocation } from '../../../service/bannerService'; // kept for compatibility, returns []

const { Option } = Select;

interface TipProps {
  
}

const Tip: React.FC<TipProps> = () => {
  const { blogs } = useBlogs();

  // Lấy 2 bài blog mới nhất để hiển thị
  const tipBlogs = blogs?.slice(0, 2) || []; 

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
      
      {/* Hiển thị 2 bài blog mới nhất */}
      {tipBlogs.map((item: any, index: number) => {
        const imageUrl = item?.thumbnail 
          ? getImageUrl(item.thumbnail, 'blogs') 
          : `./images/${index === 0 ? '6-2-705x540.jpg' : '7-2-705x540.jpg'}`;
        const title = item?.title || '';
        const suptitle = item ? dayjs(item.published_at).format('DD [Tháng] MM, YYYY') : '';
        const text = item?.content 
          ? item.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'
          : '';
        const label = item?.category || 'Mẹo du lịch';

        return (
          <div key={item.id} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <TipItem 
              reverse={index === 1}
              url={imageUrl} 
              label={label} 
              suptitle={suptitle} 
              title={title} 
              text={text} 
            />
          </div>
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
