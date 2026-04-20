import styled, { keyframes } from "styled-components";
import { SupTitle, Text, Title } from "../../../styled";
import ScrollToShow from "../../../Component/ScrollToShow";
import NewsCard from "../../../Component/NewsCard";
import Button from "../../../Component/BaseComponent/Button/Button";


interface NewsProps {
  
}



const News: React.FC<NewsProps> = ({}) => {

  return (
    <Wrapper >
      <Header>
        <ScrollToShow leftToRight><SupTitle orange>Blog & Tin tức</SupTitle></ScrollToShow>
        <ScrollToShow rightToLeft><NewsTitle big>Bài viết mới</NewsTitle></ScrollToShow>
        <ScrollToShow bottomToTop><NewsText>Khám phá bài viết mới nhất với thông tin nổi bật, các xu hướng mới nhất và nội dung hữu ích để giúp bạn cập nhật và được thông tin tức thời.</NewsText></ScrollToShow>
      </Header>
      <ScrollToShow scale>
        <Content>
            <Col><NewsCard key='1' url={"./images/4-900x490.jpg"} title={"Maldives: The Travel and Experience of the Lifetime"} textDescr={"a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg "} textTime={"12 tháng Năm, 2024"} label={"Universe"} view={"2400"}></NewsCard></Col>
            <Col><NewsCard key='2' url={"./images/5-1-900x490.jpg"} title={"Maldives: The Travel and Experience of the Lifetime"} textDescr={"a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg "} textTime={"2 tháng Năm, 2024"} label={"Universe"} view={"2454"}></NewsCard></Col>
            <Col><NewsCard key='3' url={"./images/6-1-900x490.jpg"} title={"Maldives: The Travel and Experience of the Lifetime"} textDescr={"a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg "} textTime={"2 tháng Năm, 2024"} label={"Universe"} view={"7819"}></NewsCard></Col>
        </Content>
      </ScrollToShow>
      <ScrollToShow topToBottom><Button blue>Xem thêm</Button></ScrollToShow>
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
