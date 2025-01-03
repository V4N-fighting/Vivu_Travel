import styled from "styled-components";
import Banner from "../../Component/Banner";
import Card from "./Card";
import { SubTitle, Text, Title } from "../../styled";
import Button from "../../Component/button/Button";


function Contact() {
    return ( 
        <ContactPage>
            <Banner 
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"} 
                pageName={"Contact"} 
                thisPage={"/Contact"}
            />
            <Container>
                {/* <Card /> */}
                <SubTitle style={{marginBottom: "20px"}}>Liên hệ chúng tôi</SubTitle>
                <Title big>Liên hệ </Title>
                <TextContact>
                    Chúng tôi luôn sẵn lòng lắng nghe ý kiến, câu hỏi và đề xuất từ bạn. Trên trang liên hệ, bạn sẽ tìm thấy một biểu mẫu đơn giản mà bạn có thể điền thông tin cần thiết.
                </TextContact>
                <Form>
                    <Input type="text" placeholder="Họ *" required />
                    <Input type="text" placeholder="Tên *" required />
                    <Input type="email" placeholder="Email *" required />
                    <Input type="tel" placeholder="Số điện thoại *" required />
                    <TextArea placeholder="Nhập nội dung..." required />
                </Form>
                <Button orange>GỬI</Button>
            </Container>
        </ContactPage>
    );
}

const ContactPage = styled.div`
`
const Container = styled.div`
  padding: 100px 0;
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TextContact = styled(Text)`
  font-size: 16px;
  max-width: 800px;
  text-align: center;
`

const Form = styled.form`
  margin: 50px 0 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  width: 100%;
`;

const Input = styled.input`
  padding: 20px;
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



export default Contact;