import styled, { keyframes } from "styled-components";
import { SupTitle, Text, Title } from "../../../styled";
import ScrollToShow from "../../../Component/ScrollToShow";
import NewsCard from "../../../Component/NewsCard";
import Button from "../../../Component/BaseComponent/Button/Button";
import { useBlogs } from "../../../service/blogService";
import { GET_IMAGE_URL } from "../../../api";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import config from "../../../config";


interface NewsProps {
  
}



const News: React.FC<NewsProps> = ({}) => {
  const { blogs, isLoading, isError } = useBlogs();

  const topBlogs = blogs?.slice(0, 3) || [];

  return (
    <Wrapper >
      <Header>
        <ScrollToShow leftToRight><SupTitle orange>Blog & Tin tức</SupTitle></ScrollToShow>
        <ScrollToShow rightToLeft><NewsTitle big>Bài viết mới</NewsTitle></ScrollToShow>
        <ScrollToShow bottomToTop><NewsText>Khám phá bài viết mới nhất với thông tin nổi bật, các xu hướng mới nhất và nội dung hữu ích để giúp bạn cập nhật và được thông tin tức thời.</NewsText></ScrollToShow>
      </Header>
      <ScrollToShow scale>
        <Content>
            {topBlogs.map((item) => {
              const imageUrl = item.thumbnail ? (item.thumbnail.startsWith('http') ? item.thumbnail : `${GET_IMAGE_URL}/blogs/${item.thumbnail}`) : "./images/4-900x490.jpg";
              const plainText = item.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...';
              
              return (
                <Col key={item.id}>
                  <NewsCard 
                    url={imageUrl} 
                    title={item.title} 
                    textDescr={plainText} 
                    textTime={dayjs(item.published_at).format('DD [tháng] MM, YYYY')} 
                    label={item.category || "Universe"} 
                    view={"0"}
                    slug={item.slug}
                  />
                </Col>
              );
            })}
        </Content>
      </ScrollToShow>
      <ScrollToShow topToBottom>
        <Link to={config.routes.blog}>
          <Button blue>Xem thêm</Button>
        </Link>
      </ScrollToShow>
    </Wrapper>
  );
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
`;

const NewsTitle = styled(Title)`
  text-align: center;
  width: 700px;
  margin: 20px 0;
`

const NewsText = styled(Text)`
  text-align: center;
  width: 700px;
  font-size: 16px;
`

const turnAround = keyframes`
    0% {
    transform: rotate(0deg) ;
  }
  100% {
    transform: rotate(360deg) ;
  }

`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -15px;
  padding: 40px 0;
`
const Col = styled.div`
  padding: 0 15px 30px;
`

export default News;
