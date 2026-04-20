import { useState } from "react";
import styled from "styled-components";
import Banner from "../../Component/Banner";
import { SupTitle, Text, Title } from "../../styled";
import Button from "../../Component/BaseComponent/Button/Button";
import axios from "axios";
import { GET_CONTACT } from "../../api";

function Contact() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.message) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        setSubmitting(true);
        try {
            await axios.post(GET_CONTACT, form);
            setSuccess(true);
            setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
        } catch (error: any) {
            alert("Gửi thất bại: " + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    return ( 
        <ContactPage>
            <Banner 
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"} 
                pageName={"Contact"} 
                thisPage={"/Contact"}
            />
            <Container>
                <SupTitle style={{marginBottom: "20px"}}>Liên hệ chúng tôi</SupTitle>
                <Title big>Liên hệ </Title>
                <TextContact>
                    Chúng tôi luôn sẵn lòng lắng nghe ý kiến, câu hỏi và đề xuất từ bạn. Trên trang liên hệ, bạn sẽ tìm thấy một biểu mẫu đơn giản mà bạn có thể điền thông tin cần thiết.
                </TextContact>
                {success ? (
                    <SuccessMessage>
                        ✅ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                    </SuccessMessage>
                ) : (
                    <>
                        <Form onSubmit={handleSubmit}>
                            <Input type="text" name="lastName" placeholder="Họ *" value={form.lastName} onChange={handleChange} required />
                            <Input type="text" name="firstName" placeholder="Tên *" value={form.firstName} onChange={handleChange} required />
                            <Input type="email" name="email" placeholder="Email *" value={form.email} onChange={handleChange} required />
                            <Input type="tel" name="phone" placeholder="Số điện thoại *" value={form.phone} onChange={handleChange} required />
                            <TextArea name="message" placeholder="Nhập nội dung..." value={form.message} onChange={handleChange} required />
                        </Form>
                        <Button orange onClick={handleSubmit} disabled={submitting}>
                            {submitting ? "Đang gửi..." : "GỬI"}
                        </Button>
                    </>
                )}
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

const SuccessMessage = styled.div`
  margin-top: 40px;
  padding: 24px 32px;
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 12px;
  color: #166534;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

export default Contact;