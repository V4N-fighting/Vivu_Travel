import styled from "styled-components";
import Banner from "../../Component/Banner";
import Sidebar from "../Blog/Sidebar";
import * as S from "../../styled";
import Button from "../../Component/BaseComponent/Button/Button";
import Icons from "../../Component/BaseComponent/Icons";
import { useParams } from "react-router-dom";
import { useBlogs } from "../../service/blogService";
import { GET_IMAGE_URL } from "../../api";
import dayjs from "dayjs";
import React from 'react';

interface BlogDetailProps {}

const BlogDetail: React.FC<BlogDetailProps> = () => {
    const { slug } = useParams<{ slug: string }>();
    const { blogs, isLoading, isError } = useBlogs();
    
    const currentBlog = blogs?.find(b => b.slug === slug);

    if (isLoading) return <div style={{ padding: "100px", textAlign: "center" }}>Đang tải nội dung...</div>;
    if (isError || !currentBlog) return <div style={{ padding: "100px", textAlign: "center" }}>Không tìm thấy bài viết</div>;

    const imageUrl = currentBlog.thumbnail 
        ? (currentBlog.thumbnail.startsWith("http") ? currentBlog.thumbnail : `${GET_IMAGE_URL}/blogs/${currentBlog.thumbnail}`)
        : "https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg";

    return (
        <>
            <Banner
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
                pageName={"Chi tiết bài viết"}
                thisPage={`/Blog / ${currentBlog.title}`}
            />
            <BlogPage>
                <Contain>
                    <S.Title big style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>{currentBlog.title}</S.Title>
                    <TimeBox style={{ width: "100%", marginBottom: "30px" }}>
                        <Icons.CalendarIcon />
                        <S.Text style={{ marginLeft: "10px", fontSize: "14px", fontWeight: "500", color: "#505050" }}>
                            {dayjs(currentBlog.published_at).format("DD [tháng] MM, YYYY")} | Tác giả: {currentBlog.author_name || "Vivu Travel"}
                        </S.Text>
                    </TimeBox>

                    <MainThumbnail src={imageUrl} />

                    <ContentHTML 
                        dangerouslySetInnerHTML={{ __html: currentBlog.content }} 
                    />

                    <ShareBox>
                        Chia sẻ: 
                        <Button blue circle style={{margin: "0 10px 0 20px"}}><Icons.FacebookIcon /></Button>
                        <Button blue circle style={{margin: "0 10px"}}><Icons.InstagramIcon /></Button>
                        <Button blue circle style={{margin: "0 10px"}}><Icons.TwitterIcon /></Button>
                    </ShareBox>
                    <CommentBox>
                        <S.Title medium>Để lại bình luận</S.Title>
                        <S.Text>Email của bạn sẽ không được hiển thị công khai. Các trường bắt buộc được đánh dấu *</S.Text>
                        <Form>
                            <TextArea placeholder="Viết bình luận *" required />
                            <Input type="text" placeholder="Nhập tên của bạn *" required />
                            <Input type="text" placeholder="Nhập email của bạn *" required />
                            <TwoCol>
                                <div className="one">
                                    <input type="checkbox" id="register-check" />
                                    <label htmlFor="register-check">Ghi nhớ thông tin</label>
                                </div>
                            </TwoCol>
                        </Form>
                    </CommentBox>
                    <Button blue style={{alignSelf: "flex-start"}}>Đăng bình luận</Button>
                </Contain>
                <Sidebar />
            </BlogPage>
        </>
    );
};

const MainThumbnail = styled.img`
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 20px;
    margin-bottom: 40px;
`;

const ContentHTML = styled.div`
    width: 100%;
    font-size: 16px;
    line-height: 1.8;
    color: #333;
    
    h1, h2, h3, h4, h5, h6 {
        margin: 25px 0 15px;
        color: #000;
    }
    
    p {
        margin-bottom: 20px;
    }
    
    img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
        margin: 20px 0;
    }

    ul, ol {
        margin-bottom: 20px;
        padding-left: 20px;
    }
`;

const BlogPage = styled.div`
    display: flex;
    max-width: 1250px;
    width: 100%;
    margin: 0 auto;
    padding: 100px 0;
`;

const Contain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    padding: 0 10px;
`;

const TimeBox = styled.div`
    margin-bottom: 2px;
    display: flex;
`;

const ShareBox = styled.div`
    width: 100%;
    margin: 10px 0;
    padding: 30px 0;
    border-top: 1px solid var(--primary-color);
    border-bottom: 1px solid var(--primary-color);
    text-align: end;
`;

const CommentBox = styled.div`
    width: 100%;
    margin: 10px 0;
    padding: 30px 0;
`;

const Form = styled.form`
  margin: 50px 0 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 100%;
`;

const Input = styled.input`
  padding: 16px;
  border: 1px solid #f76b006d;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #ff8c42;
  }
`;

const TextArea = styled.textarea`
  grid-column: span 2;
  padding: 10px;
  border: 1px solid #f76b006d;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  height: 100px;

  &:focus {
    outline: none;
    border-color: #ff8c42;
  }
`;

const TwoCol = styled.div`
  display: flex;
  justify-content: space-between;
  color: #000000;
  font-size: small;
  margin-top: 10px;

  .one {
    display: flex;
    gap: 5px;

    input {
      margin-right: 5px;
    }
  }
`;

export default BlogDetail;
