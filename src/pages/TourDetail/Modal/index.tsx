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


    const [year, month, day] = data[0] && data[0].departureDate.toString().split("-");

    
    const adultCostInit:number = data && Number(data[0].price.adult.replace(/[^\d]/g, ''))
    const childCostInit:number = data && Number(data[0].price.child.replace(/[^\d]/g, ''))

    

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
                        data: data[0],
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
                                <CalendarComponent 
                                    value={dayjs(`${year}-${month}-${day}`)}  
                                    onSelectDate={handleDateChange} 
                                />
                            ) : (
                                <Setup>
                                    <RowBetween>
                                        <Topic>Du khách</Topic>
                                        <Topic>Số lượng (người)</Topic>
                                    </RowBetween>
                                    <RowBetween>
                                        <Value>Người lớn</Value>
                                        <DefaultCost>{adultCostInit} VND / người</DefaultCost>
                                        <Counter  value={adultCounter} setValue={setAdultCounter} onChangeValue={(newValue) => getAdultValue(newValue)}/>
                                    </RowBetween>
                                    <RowBetween>
                                        <Value>Trẻ em (từ dưới 15 tuổi)</Value>
                                        <DefaultCost>{childCostInit} VND / người</DefaultCost>
                                        <Counter value={childCounter}  setValue={setChildCounter} onChangeValue={(newValue) => getChildValue(newValue)} />
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
                            <TourInfo title={data && data[0].name} total={total} hideModal={hideModal} day={day} month={month} year={year} />
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
`

export default Modal;
