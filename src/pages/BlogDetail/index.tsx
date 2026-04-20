import styled from "styled-components";
import Banner from "../../Component/Banner";
import Sidebar from "../Blog/Sidebar";
import VideoPlayer from "../../Component/VideoPlayer";
import { Title, Text, GridRow, Grid, Icon } from "../../styled";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { GridCol } from './../../styled/index';
import Button from "../../Component/BaseComponent/Button/Button";
import { faFacebookF, faInstagram, faPinterestP, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Calendar } from 'antd';
import Icons from "../../Component/BaseComponent/Icons";

interface BlogDetailProps {
    url: string,
    title: string,
    timeText: string,
    img1: string,
    img2: string,
    img3: string,

}

const TextContent1 = `
    Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet for a quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada. Donec sollicitudin molestie malesuada. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing ipsum dolor sit amet, consectetur elit.

Vestibulum ac diam sit amet for a quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada. Donec sollicitudin molestie malesuada. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
`

const TextContent2 = `
    Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vestibulum ac diam sit amet for a quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada. Donec sollicitudin molestie malesuada. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing ipsum dolor sit amet, consectetur elit.

Vestibulum ac diam sit amet for a quam vehicula elementum sed sit amet dui. Donec sollicitudin molestie malesuada. Donec sollicitudin molestie malesuada. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
`


const BlogDetail:React.FC<BlogDetailProps> = ({
    url, 
    title='Sao cứ phải khó chịu với Lương Ngọc Văn', 
    timeText='14 thg10 2004', 
    img1='https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg', 
    img2='https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg', 
    img3='https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg'
}
) => {
    return (
        <>
            <Banner
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
                pageName={"Blog_detail"}
                thisPage={"/Blog_detail"}
            />
            <BlogPage>
                <Contain>
                    <VideoPlayer
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        controls
                        autoPlay={false}
                        loop={false}
                        muted={false}
                    />
                    <Title medium>{title}</Title>
                    <TimeBox>
                        <Icons.CalendarIcon />
                        <TimeText>{timeText}</TimeText>
                    </TimeBox>
                    <Text>{TextContent1}</Text>
                    <Grid>
                        <GridRow margin="20px">
                            <GridCol col={4}><Image src={img1}/></GridCol>
                            <GridCol col={4}><Image src={img2}/></GridCol>
                            <GridCol col={4}><Image src={img3}/></GridCol>
                        </GridRow>
                    </Grid>
                    <Text>{TextContent2}</Text>
                    <ShareBox>
                        Chia sẻ: 
                        <Button blue circle style={{margin: '0 10px 0 20px'}}><Icons.FacebookIcon /></Button>
                        <Button blue circle style={{margin: '0 10px'}}><Icons.InstagramIcon /></Button>
                        <Button blue circle style={{margin: '0 10px'}}><Icons.TwitterIcon /></Button>
                        <Button blue circle style={{margin: '0 10px'}}><Icons.TwitterIcon /></Button>
                    </ShareBox>
                    <CommentBox>
                        <Title medium>Để lại bình luận</Title>
                        <Text>Your email address will not be published. Required fields are marked *</Text>
                        <Form>
                            <TextArea placeholder="Viết bình luận *" required />
                            <Input type="text" placeholder="Enter your name *" required />
                            <Input type="text" placeholder="Enter your E-mail address *" required />
                            <TwoCol>
                                <div className="one">
                                    <input type="checkbox" id="register-check" />
                                    <label htmlFor="register-check">Remember Me</label>
                                </div>
                            </TwoCol>
                        </Form>
                    </CommentBox>
                    <Button  blue style={{alignSelf: 'flex-start'}}>Đăng bình luận</Button>
                </Contain>
                <Sidebar />
            </BlogPage>
            
        </>
    );
}

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
    
`

const TimeBox = styled.div`
    margin-bottom: 2px;
    display: flex;
`

const TimeText = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #505050;
`
const Image = styled.div<{src: string}>`
    height: 200px;
    width: 100%;
    background-image: url(${props => "'" + props.src +  "'"});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`
const ShareBox = styled.div`
    width: 100%;
    margin: 10px 0;
    padding: 30px 0;
    border-top: 1px solid var(--primary-color);
    border-bottom: 1px solid var(--primary-color);
    text-align: end;
`

const CommentBox = styled.div`
    width: 100%;
    margin: 10px 0;
    padding: 30px 0;
`

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
