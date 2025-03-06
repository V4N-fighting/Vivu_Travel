import styled from "styled-components";
import Banner from "../../Component/Banner";
import ProgressBar from "./ProgressBar";
import { FlexBox, Grid, GridCol, GridRow, Icon, Text, Title } from "../../styled";
import TourCard from "./TourCard";
import Button from "../../Component/BaseComponent/Button/Button";
import { useState } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { CircleCheckIcon } from './../../Component/BaseComponent/Icons/CircleCheckIcon';
import Icons from "../../Component/BaseComponent/Icons";

const exampleTour = {
    image: "https://icdn.24h.com.vn/upload/2-2023/images/2023-06-06/kim5_1-1686027959-673-width740height480.jpg",
    title: "Du Lịch Tết Nguyên Đán 2025 Phú Quốc - Thiên Đường Giải Trí [Mùng 3 Tết]",
    code: "STN084-2025-00276",
    startDate: "31-01-2025",
    endDate: "02-02-2025",
    duration: "3 ngày 2 đêm",
    price: 8979000,
  };

  const steps_3 = [
    { label: 'Chọn ngày', isActive: false, isCompleted: true },
    { label: 'Du khách', isActive: false, isCompleted: true },
    { label: 'Chi tiết thanh toán', isActive: true, isCompleted: false },
    { label: 'Xác nhận', isActive: false, isCompleted: false },
];

const steps_4 = [
    { label: 'Chọn ngày', isActive: false, isCompleted: true },
    { label: 'Du khách', isActive: false, isCompleted: true },
    { label: 'Chi tiết thanh toán', isActive: false, isCompleted: true },
    { label: 'Xác nhận', isActive: true, isCompleted: false },
];

function Checkout() {
    
    const [curStep, setCurStep] = useState<number>(3);

    return ( 
        <CheckoutPage>
            <Banner 
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"} 
                pageName={"Checkout"} 
                thisPage={"/Checkout"}
            />
            <Container>
                <Process>
                    {curStep == 3 ? <ProgressBar steps={steps_3} /> : <ProgressBar steps={steps_4} />}
                </Process>
                <Grid>
                    <GridRow margin="20px">
                        <GridCol col={7}>
                        {curStep == 3 
                        ? <CheckoutDetailBox>
                                <Title small>Chi tiết khách hàng</Title>
                                <Form >
                                    <Text style={{ gridColumn: 'span 2'}}>Thông tin liên hệ</Text>
                                    <Input type="text" placeholder="Nhập tên*" required />
                                    <Input type="email" placeholder="Nhập email *" required />
                                    <Input type="" placeholder="Chọn quốc gia *" required />
                                    <Input type="tel" placeholder="Nhập số liên lạc *" required />
                                    <Input type="" placeholder="nhập địa chỉ*" required style={{ gridColumn: 'span 2'}}/>
                                </Form>
                                <Form >
                                    <Text style={{ gridColumn: 'span 2'}}>Thông tin khách hàng #1</Text>
                                    <Input type="text" placeholder="Nhập tên*" required />
                                    <Input type="email" placeholder="Nhập email *" required />
                                    <Input type="" placeholder="Chọn quốc gia *" required />
                                    <Input type="tel" placeholder="Nhập số liên lạc *" required />
                                    <Input type="" placeholder="nhập địa chỉ*" required style={{ gridColumn: 'span 2'}}/>
                                </Form>
                                <Form >
                                    <Text style={{ gridColumn: 'span 2'}}>Thông tin khách hàng #2</Text>
                                    <Input type="text" placeholder="Nhập tên*" required />
                                    <Input type="email" placeholder="Nhập email *" required />
                                    <Input type="" placeholder="Chọn quốc gia *" required />
                                    <Input type="tel" placeholder="Nhập số liên lạc *" required />
                                    <Input type="" placeholder="nhập địa chỉ*" required style={{ gridColumn: 'span 2'}}/>
                                </Form>
                                <Button orange onClick={() => setCurStep(4)}>Tiếp theo</Button>
                            </CheckoutDetailBox>
                        : <ConfirmBox>
                            <FlexBox><Text><Icons.CircleCheckIcon fontSize={40} color="green" />&nbsp;Congratulation</Text></FlexBox>
                            <Title>Chuyến đi của bạn sẽ sớm được duyệt <br/>Theo dõi thường xuyên tại đây nhé!</Title>
                            <Button blue  onClick={()=>setCurStep(3)}>Trở lại</Button>
                        </ConfirmBox>
                        }
                        </GridCol>
                        <GridCol col={5}>
                            <TourCard tour={exampleTour} />
                        </GridCol>
                    </GridRow>
                </Grid>
            </Container>
        </CheckoutPage>
    );
}

const CheckoutPage = styled.div`
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

const Process = styled.div`
    width: 100%;
    padding: 20px ;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 40px;
`

const CheckoutDetailBox = styled.div`
    padding: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

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
  font-size: 14px;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #ff8c42;
  }
`;

//comfirm

const ConfirmBox = styled.div`
    padding: 20px;
`


export default Checkout;