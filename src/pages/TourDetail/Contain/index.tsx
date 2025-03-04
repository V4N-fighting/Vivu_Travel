import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { Text, Title } from "../../../styled";
import Button from "../../../Component/BaseComponent/Button/Button";
import { Overview } from "./Overview";
import { Expense } from "./Expense";
import { Itinerary } from "./Itinerary";
import { FAQs } from "./FAQs";
import { Map } from "./Map";

interface ContainProps {
    formRef: React.RefObject<HTMLFormElement>;
}

interface ArrayNavContent {
    id: number,
    tab: string,
    value: JSX.Element
}



const navContent: ArrayNavContent[] = [
    {
        id: 1, value: <Overview />,
        tab: "Tổng quan"
    },
    {
        id: 2, value: <Expense  />,
        tab: "Chi phí"
    },
    {
        id: 3, value: <Itinerary  />,
        tab: "Hành trình"
    },
    {
        id: 4, value: <FAQs  />,
        tab: "FAQs"
    },
    {
        id: 5, value: <Map  />,
        tab: "Map"
    },
]


const Contain: React.FC<ContainProps> = ({formRef}) => {
    const [curTab, setCurTab] = useState<number>(1);

    const navRef = useRef<HTMLDivElement>(null);
    const LineRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]); 

    

    // Set line cho Button đầu
    useEffect(() => {
        const setInitialLinePosition = () => {
            if (buttonRefs.current[0] && LineRef.current) {
                const firstButton = buttonRefs.current[0]; 
                const offsetLeft = firstButton.offsetLeft; 
                const offsetWidth = firstButton.offsetWidth; 
    
                LineRef.current.style.left = `${offsetLeft}px`;
                LineRef.current.style.width = `${offsetWidth}px`;
            }
        };
    
        setInitialLinePosition();
    }, []);

    
    
    // hàm click vào tab
    const handleTabClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) => {
        console.log('hàm handleTabClick hoạt động');
        
        setCurTab(id);
        changeLineStyle(e);
    };

    // hàm dịch chuyển dòng underline
    const changeLineStyle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
        console.log('hàm changeLineStyle hoạt động');

        
        const buttonElement = e.currentTarget;
        const offsetLeft = buttonElement.offsetLeft;
        const offsetWidth = buttonElement.offsetWidth;
        
        if (LineRef.current) {
            LineRef.current.style.left = `${offsetLeft}px`;
            LineRef.current.style.width = `${offsetWidth}px`;
        }
    };
    

    // Chọn value cho mỗi
    const activeContent = navContent.find((item) => item.id === curTab);

    return (
        <Wrapper>
            <Header>
                <Title medium>Romantic Sri Lanka Honeymoon Package</Title>
                <Time>
                    <span>7</span>
                    Ngày
                </Time>
            </Header>
            <Image src="https://icdn.24h.com.vn/upload/2-2023/images/2023-06-06/kim5_1-1686027959-673-width740height480.jpg" />
            <Information>
                <Nav ref={navRef} >
                    {navContent.map((item, index) => (
                        <Button
                            white
                            key={item.id}
                            ref={(el: HTMLButtonElement | null) => (buttonRefs.current[index] = el)} 
                            onClick={(e) => handleTabClick(e, item.id)}
                            style={curTab === item.id ? { color: 'orange' } : undefined} 
                        >
                            {item.tab}
                        </Button>
                    
                    
                    ))}
                    <Line ref={LineRef} />
                </Nav>
                <NavContent>
                    {activeContent && <NavItem>{activeContent.value}</NavItem>}
                </NavContent>
            </Information>
            <Form ref={formRef}>
                <Text style={{ gridColumn: 'span 2'}} >Bạn có thể gửi yêu cầu qua mẫu này</Text>
                <Text style={{ gridColumn: 'span 2'}}  small>Tên chuyến đi: *
                    <span style={{fontWeight: 'bold'}}> Romantic Sri Lanka Honeymoon Package</span>
                </Text>
                <Input type="text" placeholder="Nhập tên*" required style={{ gridColumn: 'span 2'}}/>
                <Input type="email" placeholder="Nhập email *" required style={{ gridColumn: 'span 2'}}/>
                <Input type="tel" placeholder="Chọn quốc gia *" required />
                <Input type="tel" placeholder="Nhập số liên lạc *" required />
                <Input type="tel" placeholder="Nhập số người *" required />
                <Input type="tel" placeholder="Nhập số trẻ em *" required />
                <Input type="email" placeholder="Nhập chủ đề yêu cầu *" required style={{ gridColumn: 'span 2'}}/>
                <TextArea placeholder="Nhập nội dung..." required />
                <Button orange style={{ gridColumn: 'span 2'}}>Gửi Email</Button>
            </Form>
        </Wrapper>
    );
};



const Wrapper = styled.div`
    width: 100%;
    position: relative;
    padding: 0 20px;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 10px;
`;

const Time = styled.div`
    padding: 10px;
    font-size: 16px;
    color: black;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    span {
        width: 100%;
        padding: 5px;
        font-size: 24px;
        text-align: center;
        background-color: #d37100;
        color: white;
        position: absolute;
        bottom: 100%;
        left: 0;
    }
`;

const Image = styled.div<{ src: string }>`
    width: 100%;
    padding-bottom: 54%;
    background-image: url(${(props) => props.src});
    background-size: cover;
    background-repeat: no-repeat;
`;

const Information = styled.div`
    padding: 40px 0;
    /* background-color: pink; */
`;

const Nav = styled.div`
    /* height: 50px; */
    width: "100%";
    background-color: #fff;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    transition: height 0.3s ease, background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    z-index: 99;
`

const Line = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 3px;
    border-radius: 15px;
    background-color: #FF681A;
    transition: all 0.2s ease;
`

const NavContent = styled.div`
    padding: 10px 0;
    margin: 10px 0 0;
`

const NavItem = styled.div`
    padding: 10px 0;
    color: red;
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

export default Contain;
