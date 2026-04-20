import styled from "styled-components";
import Banner from "../../Component/Banner";
import ProgressBar from "./ProgressBar";
import { FlexBox, Grid, GridCol, GridRow, Icon, Text, Title } from "../../styled";
import TourCard from "./TourCard";
import Button from "../../Component/BaseComponent/Button/Button";
import { useEffect, useState } from "react";
import Icons from "../../Component/BaseComponent/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GET_BOOKING } from "../../api";

type Traveler = {
  name: string;
  email: string;
  country: string;
  phone: string;
  address: string;
  type?: string;
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
    const location = useLocation();
    const navigate = useNavigate();
    const myData = location.state?.myData;
    const bookingDraft = location.state?.bookingDraft;

    useEffect(() => {
        // Chỉ cần myData (chứa thông tin tour và giá) là đủ để vào trang Checkout
        if (!myData) {
            navigate("/home");
        }
    }, [myData, navigate]);

    const exampleTour = myData ? {
        image: myData.data.image,
        title: myData.data.name,
        code: "STN084-2025-00276",
        startDate: myData.data.departureDate,
        counter: myData.adultCounter + myData.childCounter,
        duration: myData.data.duration,
        price: myData.total,
    } : { image: "", title: "", code: "", startDate: "", counter: 0, duration: "", price: 0 };

    const [adultTravelers, setAdultTravelers] = useState<Traveler[]>(
        bookingDraft?.adultTravelers || []
    );

    const [childTravelers, setChildTravelers] = useState<Traveler[]>(
        bookingDraft?.childTravelers || []
    );

    const [curStep, setCurStep] = useState<number>(3);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAdultInputChange = <K extends keyof Traveler>(
        index: number,
        field: K,
        value: Traveler[K]
    ) => {
        setAdultTravelers(prev => {
            const updated = [...prev];
            if (!updated[index]) updated[index] = { name: '', email: '', country: '', phone: '', address: '' };
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleChildInputChange = <K extends keyof Traveler>(
        index: number,
        field: K,
        value: Traveler[K]
    ) => {
        setChildTravelers(prev => {
            const updated = [...prev];
            if (!updated[index]) updated[index] = { name: '', email: '', country: '', phone: '', address: '' };
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                alert('Vui lòng đăng nhập để đặt tour!');
                navigate('/login');
                return;
            }
            const user = JSON.parse(userStr);

            const allTravelers = [
                ...adultTravelers.map(t => ({ fullName: t.name, email: t.email, phone: t.phone, country: t.country, address: t.address, type: 'adult' })),
                ...childTravelers.map(t => ({ fullName: t.name, email: t.email, phone: t.phone, country: t.country, address: t.address, type: 'child' }))
            ];

            // Here we assume departureDate from bookingDraft can be matched with a departureDateId, 
            // but for simplicity in this frontend we might need to rely on the backend. 
            // In a real scenario, the bookingForm should pass the departureDateId.
            // Let's pass tourId from myData.data.id and let backend handle date logic if needed,
            // or pass 1 as fallback.
            const payload = {
                tourId: myData.data.id || 1,
                departureDateId: myData.data.departureDateId || 1,
                adultCount: myData.adultCounter,
                childCount: myData.childCounter,
                totalPrice: myData.total,
                note: bookingDraft?.specialRequests || '',
                travelers: allTravelers
            };

            await axios.post(GET_BOOKING, payload, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            });

            // Chuyển hướng thẳng sang trang thành công
            navigate('/booking_success');
        } catch (error: any) {
            console.error(error);
            alert('Đặt tour thất bại: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!myData) return null;

    return ( 
        <CheckoutPage>
            <Banner 
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"} 
                pageName={"Checkout"} 
                thisPage={"/Checkout"}
            />
            <Container>
                <Process>
                    {curStep === 3 ? <ProgressBar steps={steps_3} /> : <ProgressBar steps={steps_4} />}
                </Process>
                <Grid>
                    <GridRow margin="20px">
                        <GridCol col={7}>
                        {curStep === 3 
                        ? <CheckoutDetailBox>
                                <Title small>Chi tiết khách hàng</Title>

                                {Array.from({ length: myData.adultCounter }, (_, index) => (
                                    <Form key={index}>
                                        <Text style={{ gridColumn: 'span 2' }}>Du khách #{index + 1} <strong>(Người lớn)</strong></Text>
                                        <Input 
                                            type="text" 
                                            placeholder="Nhập tên*"
                                            value={adultTravelers[index]?.name || ''}
                                            onChange={(e) => handleAdultInputChange(index, 'name', e.target.value)} 
                                            required />
                                        <Input 
                                            type="email" 
                                            placeholder="Nhập email *" 
                                            value={adultTravelers[index]?.email || ''}
                                            onChange={(e) => handleAdultInputChange(index, 'email', e.target.value)} 
                                            required />
                                        <Input 
                                            type="text" 
                                            placeholder="Chọn quốc gia *" 
                                            value={adultTravelers[index]?.country || ''}
                                            onChange={(e) => handleAdultInputChange(index, 'country', e.target.value)}
                                            required />
                                        <Input 
                                            type="tel" 
                                            placeholder="Nhập số liên lạc *" 
                                             value={adultTravelers[index]?.phone || ''}
                                            onChange={(e) => handleAdultInputChange(index, 'phone', e.target.value)}
                                            required />
                                        <Input 
                                            type="text" 
                                            placeholder="Nhập địa chỉ*"
                                            value={adultTravelers[index]?.address || ''}
                                            onChange={(e) => handleAdultInputChange(index, 'address', e.target.value)} 
                                            required 
                                            style={{ gridColumn: 'span 2' }} />
                                    </Form>
                                ))}

                                {Array.from({ length: myData.childCounter }, (_, index) => (
                                    <Form key={index}>
                                        <Text style={{ gridColumn: 'span 2' }}>Du khách #{index + 1} <strong>(Trẻ em)</strong></Text>
                                        <Input 
                                            type="text" 
                                            placeholder="Nhập tên*" 
                                            value={childTravelers[index]?.name || ''}
                                            onChange={(e) => handleChildInputChange(index, 'name', e.target.value)} 
                                            required />
                                        <Input 
                                            type="text" 
                                            placeholder="Chọn quốc gia *" 
                                            value={childTravelers[index]?.country || ''}
                                            onChange={(e) => handleChildInputChange(index, 'country', e.target.value)}
                                            required />
                                        <Input 
                                            type="text" 
                                            placeholder="Nhập địa chỉ*" 
                                            value={childTravelers[index]?.address || ''}
                                            onChange={(e) => handleChildInputChange(index, 'address', e.target.value)} 
                                            required 
                                            style={{ gridColumn: 'span 2' }} />
                                    </Form>
                                ))}
                                
                                <Button orange disabled={isSubmitting} onClick={handleSubmit}>{isSubmitting ? 'Đang xử lý...' : 'Tiếp theo'}</Button>
                            </CheckoutDetailBox>
                        : <ConfirmBox>
                            <FlexBox><Text><Icons.CircleCheckIcon fontSize={40} color="green" />&nbsp;Congratulation</Text></FlexBox>
                            <Title>Chuyến đi của bạn sẽ sớm được duyệt <br/>Theo dõi thường xuyên tại đây nhé!</Title>
                            <Button blue  onClick={()=>navigate("/home")}>Trở lại trang chủ</Button>
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