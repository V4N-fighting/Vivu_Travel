import styled from "styled-components";
import Banner from "../../Component/Banner";
import ProgressBar from "./ProgressBar";
import { FlexBox, Grid, GridCol, GridRow, Icon, Text, Title } from "../../styled";
import TourCard from "./TourCard";
import Button from "../../Component/BaseComponent/Button/Button";
import { useMemo, useState } from "react";
import Icons from "../../Component/BaseComponent/Icons";
import { useLocation } from "react-router-dom";

type Traveler = {
  name: string;
  email: string;
  country: string;
  phone: string;
  address: string;
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
    const myData: {
        total: number, 
        adultCounter: number, 
        childCounter: number, 
        data: any
    } = location.state?.myData;


    const exampleTour = useMemo(() => {
        return {
            image: myData.data.image,
            title: myData.data.name,
            code: "STN084-2025-00276",
            startDate: myData.data.departureDate,
            counter: myData.adultCounter + myData.childCounter,
            duration: myData.data.duration,
            price: myData.total,
        }
    }, [myData]);

    const [travelers, setTravelers] = useState<Traveler[]>(
    Array.from({ length: myData.childCounter }, () => ({
        name: '',
        email: '',
        country: '',
        phone: '',
        address: '',
    }))
    );

    const [curStep, setCurStep] = useState<number>(3);


    
    const handleInputChange = <K extends keyof Traveler>(
        index: number,
        field: K,
        value: Traveler[K]
    ) => {
        setTravelers(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };


    const handleSubmit = () => {
        console.log('data: ', travelers)
    }

    

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

                                {Array.from({ length: myData.adultCounter }, (_, index) => (
                                    <Form key={index}>
                                        <Text style={{ gridColumn: 'span 2' }}>Du khách #{index + 1} <strong>(Người lớn)</strong></Text>
                                        <Input 
                                            type="text" 
                                            placeholder="Nhập tên*"
                                            value={travelers[0].name}
                                            onChange={(e) => handleInputChange(index, 'name', e.target.value)} 
                                            required />
                                        <Input 
                                            type="email" 
                                            placeholder="Nhập email *" 
                                            value={travelers[0].email}
                                            onChange={(e) => handleInputChange(index, 'email', e.target.value)} 
                                            required />
                                        <Input 
                                            type="text" 
                                            placeholder="Chọn quốc gia *" 
                                            value={travelers[0].country}
                                            onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                                            required />
                                        <Input 
                                            type="tel" 
                                            placeholder="Nhập số liên lạc *" 
                                             value={travelers[0].country}
                                            onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                                            required />
                                        <Input 
                                            type="text" 
                                            placeholder="Nhập địa chỉ*"
                                            value={travelers[0].address}
                                            onChange={(e) => handleInputChange(index, 'address', e.target.value)} 
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
                                            value={travelers[0].name}
                                            onChange={(e) => handleInputChange(index, 'name', e.target.value)} 
                                            required />
                                        <Input 
                                            type="text" 
                                            placeholder="Chọn quốc gia *" 
                                            value={travelers[0].country}
                                            onChange={(e) => handleInputChange(index, 'country', e.target.value)}
                                            required />
                                        <Input 
                                            type="text" 
                                            placeholder="Nhập địa chỉ*" 
                                            value={travelers[0].address}
                                            onChange={(e) => handleInputChange(index, 'address', e.target.value)} 
                                            required 
                                            style={{ gridColumn: 'span 2' }} />
                                    </Form>
                                ))}

                                
                                
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