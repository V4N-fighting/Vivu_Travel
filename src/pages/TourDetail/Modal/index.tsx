import styled from "styled-components";
import Button from "../../../Component/BaseComponent/Button/Button";
import { RowBetween, Grid, GridCol, GridRow, Icon, Text } from "../../../styled";
import CalendarComponent from "./Calendar";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faTeletype } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import Counter from "./Counter";
import TourInfo from "./TourInfo";
import { Link, useNavigate } from "react-router-dom";

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
    const [selectedDateId, setSelectedDateId] = useState<number | null>(null);

    // Cố định ngày hiện tại là 18/04/2026 theo yêu cầu
    const today = dayjs('2026-04-18').startOf('day');

    // Chỉ lấy các ngày từ 18/04/2026 trở về sau
    const validDepartureDates = data && Array.isArray(data.departure_dates)
        ? data.departure_dates.filter((d: any) => {
            const departureDate = dayjs(d.departure_date).startOf('day');
            return departureDate.isAfter(today) || departureDate.isSame(today);
        })
        : [];

    const firstDate = validDepartureDates.length > 0 
        ? validDepartureDates[0].departure_date.toString() 
        : '';
    const firstDateId = validDepartureDates.length > 0 
        ? validDepartureDates[0].id 
        : null;

    const [displayDate, setDisplayDate] = useState({y: '2026', m: '01', d: '01'});

    useEffect(() => {
        if (firstDateId && !selectedDateId) {
            setSelectedDateId(firstDateId);
            if (firstDate) {
                const [y, m, d] = firstDate.split("-");
                setDisplayDate({y, m, d});
            }
        }
    }, [firstDateId, selectedDateId, firstDate]);

    // Lấy giá từ object price đã được mapping ở tourService
    const adultCostInit: number = data && data.price ? Number(data.price.adult) : 0;
    const childCostInit: number = data && data.price ? Number(data.price.child) : 0;

    

    useEffect(() => {
        setTotal(adultCost + childCost)
    }, [adultCost, childCost]);


    const handleDateChange = (date: Dayjs) => {
        alert('Chỉ có 1 chuyến đi')
    };

    const handleSubmit = () => {
        if (adultCounter > 0 || childCounter > 0) {
            navigate(`/check_out`,  {
                state: {
                    myData: {
                        total, 
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
            alert("Vui lòng điền số lượng du khách")
        }
    }

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
                                                        const [y, m, d] = dateObj.departure_date.split("-");
                                                        setDisplayDate({y, m, d});
                                                    }}
                                                >
                                                    {dayjs(dateObj.departure_date).format('DD/MM/YYYY')} 
                                                    <span style={{fontSize: '12px', marginLeft: '10px'}}>
                                                        ({dateObj.available_slots} chỗ trống)
                                                    </span>
                                                </DateItem>
                                            ))
                                        ) : (
                                            <Text style={{color: 'red'}}>Hiện không có chuyến đi nào khả dụng trong tương lai.</Text>
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
                            <TourInfo title={data && data.name} total={total} hideModal={hideModal} day={Number(displayDate.d)} month={Number(displayDate.m)} year={Number(displayDate.y)} />
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

export default Modal;
