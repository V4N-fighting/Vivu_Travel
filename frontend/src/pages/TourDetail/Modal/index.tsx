import styled from "styled-components";
import Button from "../../../Component/BaseComponent/Button/Button";
import { RowBetween, Grid, GridCol, GridRow, Icon, Text } from "../../../styled";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faTeletype } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import Counter from "./Counter";
import TourInfo from "./TourInfo";
import { useNavigate } from "react-router-dom";
import { message, DatePicker, Input as AntInput } from "antd";
import { GET_BOOKING, GET_CONTACT, GET_COUPON, GET_TOUR } from "../../../api";
import axios from "axios";

interface ModalProps {
    hideModal: () => void;
    data: any;
}

const Modal: React.FC<ModalProps> = ({ hideModal, data }) => {
    const navigate = useNavigate();

    const [adultCounter, setAdultCounter] = useState<number>(0);
    const [childCounter, setChildCounter] = useState<number>(0);

   
    const [isShowTimeBox, setIsShowTimeBox] = useState<boolean>(true);

 
    const [adultCost, setAdultCost] = useState<number>(0)
    const [childCost, setChildCost] = useState<number>(0)
    const [total, setTotal] = useState<number>(0);
    const [originalTotal, setOriginalTotal] = useState<number>(0);
    const [selectedDateId, setSelectedDateId] = useState<number | null>(null);
    const [couponCode, setCouponCode] = useState<string>('');
    const [discount, setDiscount] = useState<number>(0);
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    // Dữ liệu hành trình
    const [itineraries, setItineraries] = useState<any[]>([]);
    const [transportations, setTransportations] = useState<any[]>([]);

    useEffect(() => {
        if (data?.id) {
            // Lấy thông tin chi tiết tour bao gồm hành trình và phương tiện
            const fetchTourDetails = async () => {
                try {
                    const response = await axios.get(`${GET_TOUR}/${data.id}`);
                    const tourData = response.data;
                    setItineraries(tourData.itineraries || []);
                    setTransportations(tourData.transportations || []);
                } catch (error) {
                    console.error("Lỗi khi tải chi tiết tour:", error);
                }
            };
            fetchTourDetails();
        }
    }, [data?.id]);

    // State cho tính năng yêu cầu ngày mới
    const [requestDate, setRequestDate] = useState<Dayjs | null>(null);
    const [requestNote, setRequestNote] = useState<string>('');
    const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

    // Lấy tất cả các ngày khởi hành từ backend
    const rawDepartureDates = data && Array.isArray(data.departure_dates)
        ? data.departure_dates
        : (data && Array.isArray(data.departureDate) ? data.departureDate : []);

    const validDepartureDates = [...rawDepartureDates]
        .map(d => typeof d === 'string' ? { departure_date: d, available_slots: '?', id: Math.random() } : d)
        .sort((a: any, b: any) => 
            dayjs(a.departure_date).unix() - dayjs(b.departure_date).unix()
        );

    const firstDate = validDepartureDates.length > 0 
        ? validDepartureDates[0].departure_date.toString() 
        : '';
    const firstDateId = validDepartureDates.length > 0 
        ? validDepartureDates[0].id 
        : null;

    // Khởi tạo displayDate dựa trên ngày khởi hành đầu tiên nếu có
    const [displayDate, setDisplayDate] = useState(() => {
        if (validDepartureDates.length > 0) {
            const date = dayjs(validDepartureDates[0].departure_date);
            return {
                y: date.format('YYYY'),
                m: date.format('MM'),
                d: date.format('DD')
            };
        }
        return { y: dayjs().format('YYYY'), m: dayjs().format('MM'), d: dayjs().format('DD') };
    });

    useEffect(() => {
        if (firstDateId && !selectedDateId) {
            setSelectedDateId(firstDateId);
            if (firstDate) {
                const date = dayjs(firstDate);
                setDisplayDate({
                    y: date.format('YYYY'),
                    m: date.format('MM'),
                    d: date.format('DD')
                });
            }
        }
    }, [firstDateId, selectedDateId, firstDate]);

    // Lấy giá từ object price đã được mapping ở tourService
    const adultCostInit: number = data && data.price ? Number(data.price.adult) : 0;
    const childCostInit: number = data && data.price ? Number(data.price.child) : 0;

    

    useEffect(() => {
        const newTotal = adultCost + childCost;
        setOriginalTotal(newTotal);
        setTotal(newTotal - discount);
    }, [adultCost, childCost, discount]);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            message.warning('Vui lòng nhập mã giảm giá');
            return;
        }

        setIsApplyingCoupon(true);
        try {
            console.log("Đang kiểm tra mã tại Modal:", couponCode);
            const res = await axios.get(`${GET_COUPON}/${couponCode.trim()}`);
            const coupon = res.data;
            console.log("Dữ liệu Coupon nhận được tại Modal:", coupon);

            const currentOriginalTotal = adultCost + childCost;

            if (currentOriginalTotal < Number(coupon.min_order_value)) {
                message.error(`Đơn hàng tối thiểu ${new Intl.NumberFormat('vi-VN').format(coupon.min_order_value)}đ để sử dụng mã này`);
                setDiscount(0);
                return;
            }

            let discountAmount = 0;
            const discountValue = Number(coupon.discount_value);
            
            if (coupon.discount_type === 'percentage') {
                discountAmount = (currentOriginalTotal * discountValue) / 100;
                if (coupon.max_discount_amount && discountAmount > Number(coupon.max_discount_amount)) {
                    discountAmount = Number(coupon.max_discount_amount);
                }
            } else {
                discountAmount = discountValue;
            }

            setDiscount(discountAmount);
            message.success(`Áp dụng mã thành công! Đã giảm ${new Intl.NumberFormat('vi-VN').format(discountAmount)}đ`);
        } catch (error: any) {
            console.error("Lỗi áp dụng mã tại Modal:", error);
            const errorMsg = error.response?.data?.message || 'Mã giảm giá không hợp lệ hoặc đã hết hạn';
            message.error(errorMsg);
            setDiscount(0);
        } finally {
            setIsApplyingCoupon(false);
        }
    };


    const handleSubmit = () => {
        if (adultCounter > 0 || childCounter > 0) {
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                message.warning('Vui lòng đăng nhập để đặt tour!');
                navigate('/login');
                return;
            }

            navigate(`/check_out`,  {
                state: {
                    myData: {
                        total, 
                        originalTotal,
                        discount,
                        couponCode,
                        adultCounter, 
                        childCounter, 
                        data: {
                            ...data,
                            departureDateId: selectedDateId
                        },
                    }
                }
            });
        } else {
            message.error("Vui lòng chọn số lượng du khách");
        }
    }

    const handleRequestNewDate = async () => {
        if (!requestDate) {
            message.warning('Vui lòng chọn ngày bạn muốn khởi hành');
            return;
        }

        const userStr = localStorage.getItem('user');
        if (!userStr) {
            message.warning('Vui lòng đăng nhập để gửi yêu cầu');
            navigate('/login');
            return;
        }

        const user = JSON.parse(userStr);
        setIsSubmittingRequest(true);

        try {
            // Sử dụng API Contact để gửi yêu cầu ngày mới
            const payload = {
                name: `${user.lastName} ${user.firstName}`.trim(),
                email: user.email,
                phone: user.phone || '',
                subject: `Yêu cầu ngày khởi hành mới cho tour: ${data.name}`,
                message: `Khách hàng yêu cầu ngày khởi hành mới: ${requestDate.format('DD/MM/YYYY')}. 
                Ghi chú: ${requestNote || 'Không có ghi chú'}. 
                Tour ID: ${data.id}`
            };

            await axios.post(GET_CONTACT, payload);
            message.success('Yêu cầu của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi sớm nhất.');
            setRequestDate(null);
            setRequestNote('');
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu:', error);
            message.error('Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau.');
        } finally {
            setIsSubmittingRequest(false);
        }
    };

    const getAdultValue = (value:number) => {
        setAdultCost(value*adultCostInit);
    }

    const getChildValue = (value:number) => {
        setChildCost(value*childCostInit);
    }


    return (
        <Screen>
            <Wrapper>
                <Grid>
                    <GridRow margin="20px">
                        <GridCol col={8}>
                            <Header>
                                <Step
                                    isActive={isShowTimeBox}
                                    onClick={() => setIsShowTimeBox(true)}
                                >
                                    <Icon icon={faCalendar} style={{ margin: '0 10px 0 0' }} />
                                    Ngày & Giờ
                                    {isShowTimeBox && <span style={{ marginLeft: '20px' }}>&gt;</span>}
                                </Step>
                                <Step
                                    isActive={!isShowTimeBox}
                                    onClick={() => setIsShowTimeBox(false)}
                                >
                                    <Icon icon={faTeletype} style={{ margin: '0 10px 0 0' }} />
                                    Loại gói
                                    {!isShowTimeBox && <span style={{ marginLeft: '20px' }}>&gt;</span>}
                                </Step>
                            </Header>
                            {isShowTimeBox ? (
                                <Setup>
                                    <Topic>Chọn ngày khởi hành khả dụng:</Topic>
                                    <DateList>
                                        {validDepartureDates.length > 0 ? (
                                            validDepartureDates.map((dateObj: any) => (
                                                <DateItem 
                                                    key={dateObj.id} 
                                                    isActive={selectedDateId === dateObj.id}
                                                    onClick={() => {
                                                        setSelectedDateId(dateObj.id);
                                                        const date = dayjs(dateObj.departure_date);
                                                        setDisplayDate({
                                                            y: date.format('YYYY'),
                                                            m: date.format('MM'),
                                                            d: date.format('DD')
                                                        });
                                                    }}
                                                >
                                                    {dayjs(dateObj.departure_date).format('DD/MM/YYYY')} 
                                                    <span style={{fontSize: '12px', marginLeft: '10px'}}>
                                                        ({dateObj.available_slots} chỗ trống)
                                                    </span>
                                                </DateItem>
                                            ))
                                        ) : (
                                            <RequestSection>
                                                <Text style={{color: '#666', marginBottom: '15px', display: 'block'}}>
                                                    Hiện tour này chưa có lịch khởi hành phù hợp? Hãy cho chúng tôi biết ngày bạn mong muốn:
                                                </Text>
                                                <DatePicker 
                                                    style={{ width: '100%', marginBottom: '15px' }} 
                                                    placeholder="Chọn ngày bạn muốn đi"
                                                    format="DD/MM/YYYY"
                                                    disabledDate={(current) => current && current < dayjs().startOf('day')}
                                                    onChange={(date) => setRequestDate(date)}
                                                    value={requestDate}
                                                />
                                                <AntInput.TextArea 
                                                    placeholder="Lời nhắn hoặc số lượng người dự kiến (không bắt buộc)"
                                                    rows={3}
                                                    value={requestNote}
                                                    onChange={(e) => setRequestNote(e.target.value)}
                                                    style={{ marginBottom: '15px' }}
                                                />
                                                <Button 
                                                    orange 
                                                    style={{ width: '100%', borderRadius: 0 }}
                                                    onClick={handleRequestNewDate}
                                                    disabled={isSubmittingRequest}
                                                >
                                                    {isSubmittingRequest ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu ngày mới'}
                                                </Button>
                                            </RequestSection>
                                        )}
                                    </DateList>
                                </Setup>
                            ) : (
                                <Setup>
                                    <RowBetween>
                                        <Topic>Du khách</Topic>
                                        <Topic>Số lượng (người)</Topic>
                                    </RowBetween>
                                    <RowBetween>
                                        <Value style={{ flex: 1 }}>Người lớn</Value>
                                        <DefaultCost>
                                            <span style={{ fontWeight: 'bold' }}>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(adultCostInit)}
                                            </span>
                                            <span> / người</span>
                                        </DefaultCost>
                                        <Counter value={adultCounter} setValue={setAdultCounter} onChangeValue={(newValue) => getAdultValue(newValue)}/>
                                    </RowBetween>
                                    <RowBetween>
                                        <Value style={{ flex: 1 }}>Trẻ em (từ dưới 15 tuổi)</Value>
                                        <DefaultCost>
                                            <span style={{ fontWeight: 'bold' }}>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(childCostInit)}
                                            </span>
                                            <span> / người</span>
                                        </DefaultCost>
                                        <Counter value={childCounter} setValue={setChildCounter} onChangeValue={(newValue) => getChildValue(newValue)} />
                                    </RowBetween>
                                    
                                    <CouponSection>
                                        <Topic>Mã giảm giá</Topic>
                                        <CouponInputWrapper>
                                            <CouponInput 
                                                type="text" 
                                                placeholder="Nhập mã giảm giá..." 
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                            />
                                            <CouponButton onClick={handleApplyCoupon} disabled={isApplyingCoupon}>
                                                {isApplyingCoupon ? 'Đang áp dụng...' : 'Áp dụng'}
                                            </CouponButton>
                                        </CouponInputWrapper>
                                        {discount > 0 && (
                                            <DiscountInfo>
                                                Đã giảm: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount)}
                                            </DiscountInfo>
                                        )}
                                    </CouponSection>
                                </Setup>
                            )}
                            <Bottom>
                                {isShowTimeBox 
                                    ? <Button orange onClick={() => setIsShowTimeBox(false)} style={{ margin: '60px 10px 0', borderRadius: 0, padding: '20px 50px' }}>Tiếp tục</Button>
                                    :   <>
                                            <Button orange onClick={()=> setIsShowTimeBox(true)} style={{ margin: '60px 10px 0', borderRadius: 0, padding: '20px 50px' }}>Trở lại</Button>
                                            {/* <Link to={"/check_out"}> */}
                                                <Button 
                                                    orange  
                                                    style={{ margin: '60px 10px 0', borderRadius: 0, padding: '20px 50px' }}
                                                    onClick={handleSubmit}
                                                >
                                                Thanh toán
                                                </Button>
                                            {/* </Link> */}
                                        </>
                                }
                            </Bottom>
                        </GridCol>
                        <GridCol col={4}>
                            <TourInfo 
                                title={data && data.name} 
                                total={total} 
                                hideModal={hideModal} 
                                day={Number(displayDate.d)} 
                                month={Number(displayDate.m)} 
                                year={Number(displayDate.y)}
                                itineraries={itineraries}
                                meetingPoint={data?.meeting_point_name}
                                transportations={transportations}
                            />
                        </GridCol>
                    </GridRow>
                </Grid>
            </Wrapper>
        </Screen>
    );
};

const Screen = styled.div`
    position: fixed;
    inset: 0;
    background-color: #0000006e;
    filter: drop-shadow(2px 4px 6px black);
    z-index: 1000;
`;

const DateList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-height: 300px;
    overflow-y: auto;
    padding: 10px 0;
`;

const DateItem = styled.div<{ isActive: boolean }>`
    padding: 15px;
    border: 1px solid ${({ isActive }) => (isActive ? '#ff5722' : '#ddd')};
    background-color: ${({ isActive }) => (isActive ? '#fff5f2' : 'white')};
    color: ${({ isActive }) => (isActive ? '#ff5722' : 'black')};
    cursor: pointer;
    border-radius: 5px;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
    transition: all 0.2s;

    &:hover {
        border-color: #ff5722;
        background-color: #fff5f2;
    }
`;

const Wrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    width: 1000px;
    height: 600px;
    padding: 0 20px;
    background-color: white;
    z-index: 1001;
`;

const Header = styled.div`
    width: 100%;
    margin: 10px 0 30px;
    display: flex;
    align-items: center;
    border-bottom: 0.5px solid #888888;
`;

const Bottom = styled.div`
    width: 66.66%;
    text-align: center;
    position: absolute;
    bottom: 40px;
    left: 0;
`;

const Step = styled.div<{ isActive: boolean }>`
    padding: 10px 30px;
    font-size: 14px;
    color: black;
    text-transform: capitalize;
    border-left: 1px solid #777777;
    cursor: pointer;
    font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};

    &:hover {
        font-weight: bold;
    }
`;



const Setup = styled.div`
    margin-top: 20px;
    padding: 20px;
    width: 100%;
    border-top: 0.5px solid #888888;
`;

const Topic = styled.div`
    font-size: 14px;
    color: #777777;
    margin: 15px 0;
`;

const Value = styled.div`
    font-size: 16px;
    color: black;
    margin: 10px 0;
`;

const DefaultCost = styled.div`
    font-size: 16px;
    color: red;
    width: 220px; /* Tăng độ rộng để chứa đủ con số lớn */
    text-align: right; /* Căn phải để đơn vị / người luôn thẳng hàng */
    padding-right: 20px;
    white-space: nowrap;
`

const RequestSection = styled.div`
    padding: 20px;
    background: #fdfdfd;
    border: 1px dashed #ff681a;
    border-radius: 8px;
    margin-top: 10px;
`;

const DiscountInfo = styled.div`
    color: #4caf50;
    font-size: 13px;
    margin-top: 5px;
    font-weight: 500;
`;

const CouponSection = styled.div`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px dashed #ddd;
`;

const CouponInputWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const CouponInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
        outline: none;
        border-color: #ff5722;
    }
`;

const CouponButton = styled.button`
    padding: 10px 20px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #555;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export default Modal;
