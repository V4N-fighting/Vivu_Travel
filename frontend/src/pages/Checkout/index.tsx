import styled from "styled-components";
import Banner from "../../Component/Banner";
import ProgressBar from "./ProgressBar";
import { FlexBox, Grid, GridCol, GridRow, Text, Title } from "../../styled";
import TourCard from "./TourCard";
import CouponInput from "./CouponInput";
import Button from "../../Component/BaseComponent/Button/Button";
import { useEffect, useState } from "react";
import Icons from "../../Component/BaseComponent/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { GET_BOOKING, GET_COUPON } from "../../api";
import { message } from "antd";
import dayjs from "dayjs";

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
        if (!myData) {
            navigate("/");
        }
    }, [myData, navigate]);

    const [adultTravelers, setAdultTravelers] = useState<Traveler[]>(
        bookingDraft?.adultTravelers || []
    );

    const [childTravelers, setChildTravelers] = useState<Traveler[]>(
        bookingDraft?.childTravelers || []
    );

    const [curStep] = useState<number>(3);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [couponLoading, setCouponLoading] = useState(false);
    const [appliedCoupon, setAppliedCoupon] = useState<any>(myData?.couponCode ? { code: myData.couponCode } : null);
    const [currentTotal, setCurrentTotal] = useState(myData?.total || 0);
    const [paymentMethod, setPaymentMethod] = useState<string>('cash');

    const currentDiscount = myData ? (myData.originalTotal - currentTotal) : 0;
    const exampleTour = myData ? {
        image: myData.data.image,
        title: myData.data.name,
        code: `TOUR-${myData.data.id}-${dayjs().format('YYYY')}`,
        startDate: myData.data.departureDate,
        counter: myData.adultCounter + myData.childCounter,
        duration: myData.data.duration,
        price: currentTotal,
        originalTotal: myData.originalTotal,
        discount: currentDiscount,
        couponCode: appliedCoupon?.code
    } : { image: "", title: "", code: "", startDate: "", counter: 0, duration: "", price: 0, originalTotal: 0, discount: 0, couponCode: "" };

    const handleApplyCoupon = async (code: string) => {
        setCouponLoading(true);
        try {
            console.log("Đang kiểm tra mã:", code);
            const res = await axios.get(`${GET_COUPON}/${code}`);
            const coupon = res.data;
            console.log("Dữ liệu mã giảm giá nhận được:", coupon);
            
            if (myData.total < coupon.min_order_value) {
                message.error(`Đơn hàng tối thiểu ${new Intl.NumberFormat('vi-VN').format(coupon.min_order_value)}đ để sử dụng mã này`);
                return;
            }

            let discount = 0;
            const discountValue = Number(coupon.discount_value);
            if (coupon.discount_type === 'percentage') {
                discount = (myData.total * discountValue) / 100;
                if (coupon.max_discount_amount && discount > Number(coupon.max_discount_amount)) {
                    discount = Number(coupon.max_discount_amount);
                }
            } else {
                discount = discountValue;
            }

            setAppliedCoupon(coupon);
            const newTotal = myData.total - discount;
            setCurrentTotal(newTotal > 0 ? newTotal : 0);
            message.success(`Đã giảm ${new Intl.NumberFormat('vi-VN').format(discount)}đ`);
        } catch (error: any) {
            console.error("Lỗi áp dụng mã:", error);
            const errorMsg = error.response?.data?.message || 'Mã giảm giá không hợp lệ hoặc đã hết hạn';
            message.error(errorMsg);
        } finally {
            setCouponLoading(false);
        }
    };

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
                totalPrice: myData.originalTotal,
                note: bookingDraft?.specialRequests || '',
                travelers: allTravelers,
                couponCode: appliedCoupon?.code,
                paymentMethod: paymentMethod,
            };

            await axios.post(GET_BOOKING, payload, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            });

            message.success('Đặt tour thành công!');
            navigate('/booking_success');
        } catch (error: any) {
            console.error(error);
            message.error('Đặt tour thất bại: ' + (error.response?.data?.message || error.message));
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
                                
                                {/* === COUPON === */}
                                <CouponSection>
                                    <CouponTitle>🎟️ Mã giảm giá</CouponTitle>
                                    <CouponInput 
                                        onApply={handleApplyCoupon} 
                                        loading={couponLoading} 
                                    />
                                    {appliedCoupon && (
                                        <AppliedCoupon>✅ Đã áp dụng: <strong>{appliedCoupon.code}</strong></AppliedCoupon>
                                    )}
                                </CouponSection>

                                {/* === PHẦN THANH TOÁN === */}
                                <PaymentSection>
                                    <PaymentTitle>
                                        <span style={{ fontSize: 18, marginRight: 8 }}>💳</span>
                                        Chọn phương thức thanh toán
                                    </PaymentTitle>
                                    <PaymentGrid>
                                        {[
                                            { value: 'cash', label: 'Tiền mặt', icon: '💵', desc: 'Thanh toán trực tiếp' },
                                            { value: 'bank_transfer', label: 'Chuyển khoản', icon: '🏦', desc: 'Internet Banking' },
                                            { value: 'momo', label: 'Ví MoMo', icon: '📱', desc: 'Thanh toán qua MoMo' },
                                            { value: 'vnpay', label: 'VNPay', icon: '🆚', desc: 'Cổng thanh toán VNPay' },
                                            { value: 'credit_card', label: 'Thẻ', icon: '💳', desc: 'Visa / Mastercard' },
                                        ].map(pm => (
                                            <PaymentCard
                                                key={pm.value}
                                                selected={paymentMethod === pm.value}
                                                onClick={() => setPaymentMethod(pm.value)}
                                            >
                                                <PaymentIcon>{pm.icon}</PaymentIcon>
                                                <PaymentLabel selected={paymentMethod === pm.value}>{pm.label}</PaymentLabel>
                                                <PaymentDesc>{pm.desc}</PaymentDesc>
                                                {paymentMethod === pm.value && <SelectedMark>✓</SelectedMark>}
                                            </PaymentCard>
                                        ))}
                                    </PaymentGrid>
                                </PaymentSection>

                                <Button orange disabled={isSubmitting} onClick={handleSubmit}>{isSubmitting ? 'Đang xử lý...' : 'Tiếp theo'}</Button>
                            </CheckoutDetailBox>
                        : <ConfirmBox>
                            <FlexBox><Text><Icons.CircleCheckIcon fontSize={40} color="green" />&nbsp;Congratulation</Text></FlexBox>
                            <Title>Chuyến đi của bạn sẽ sớm được duyệt <br/>Theo dõi thường xuyên tại đây nhé!</Title>
                            <Button blue  onClick={()=>navigate("/")}>Trở lại trang chủ</Button>
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

// === COUPON SECTION ===
const CouponSection = styled.div`
    margin: 24px 0 0;
    padding: 20px;
    background: #fffbf5;
    border: 1px dashed #f76b0060;
    border-radius: 10px;
`;

const CouponTitle = styled.h4`
    font-size: 14px;
    font-weight: 600;
    color: #555;
    margin-bottom: 12px;
`;

const AppliedCoupon = styled.div`
    margin-top: 10px;
    font-size: 13px;
    color: #52c41a;
    padding: 6px 10px;
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    border-radius: 4px;
`;

// === PAYMENT STYLED COMPONENTS ===
const PaymentSection = styled.div`
    margin: 30px 0 20px;
    padding: 24px;
    border: 2px solid #f0f0f0;
    border-radius: 12px;
    background: #fafafa;
`;

const PaymentTitle = styled.h3`
    font-size: 16px;
    font-weight: 700;
    color: #222;
    margin-bottom: 18px;
    display: flex;
    align-items: center;
`;

const PaymentGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 14px;
`;

const PaymentCard = styled.div<{ selected?: boolean }>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 10px;
    border: 2px solid ${({ selected }) => selected ? '#f76b00' : '#e8e8e8'};
    border-radius: 10px;
    background: ${({ selected }) => selected ? '#fff5ee' : '#fff'};
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: ${({ selected }) => selected ? '0 0 0 3px rgba(247,107,0,0.15)' : 'none'};

    &:hover {
        border-color: #f76b00;
        background: #fff5ee;
        transform: translateY(-2px);
    }
`;

const PaymentIcon = styled.div`
    font-size: 28px;
    margin-bottom: 8px;
`;

const PaymentLabel = styled.div<{ selected?: boolean }>`
    font-size: 13px;
    font-weight: ${({ selected }) => selected ? '700' : '500'};
    color: ${({ selected }) => selected ? '#f76b00' : '#333'};
    text-align: center;
    margin-bottom: 4px;
`;

const PaymentDesc = styled.div`
    font-size: 11px;
    color: #999;
    text-align: center;
`;

const SelectedMark = styled.div`
    position: absolute;
    top: 6px;
    right: 8px;
    width: 20px;
    height: 20px;
    background: #f76b00;
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: bold;
`;

export default Checkout;