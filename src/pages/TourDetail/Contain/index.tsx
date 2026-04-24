import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { GET_IMAGE_URL } from "../../../api";
import { Title } from "../../../styled";
import Button from "../../../Component/BaseComponent/Button/Button";
import { Overview } from "./Overview";
import { Expense } from "./Expense";
import { Itinerary } from "./Itinerary";
import { FAQs } from "./FAQs";
import { Map } from "./Map";
import { Reviews } from "./Reviews";

interface ContainProps {
    formRef: React.RefObject<HTMLFormElement>;
    data: any;
}

interface ArrayNavContent {
    id: number,
    tab: string,
    value: JSX.Element
}

const Contain: React.FC<ContainProps> = ({formRef, data}) => {
    
    const navContent: ArrayNavContent[] = [
    {
        id: 1, value: <Overview content={data && data.description}/>,
        tab: "Tổng quan"
    },
    {
        id: 2, value: <Expense  data={data}/>,
        tab: "Chi phí"
    },
    {
        id: 3, value: <Itinerary  content={data && data.itinerary}/>,
        tab: "Hành trình"
    },
    {
        id: 4, value: <FAQs  />,
        tab: "FAQs"
    },
    {
        id: 5, value: <Map  content={data && data.price}/>, // thêm html của map
        tab: "Map"
    },
    {
        id: 6, value: <Reviews tourId={data?.id?.toString()} />,
        tab: "Đánh giá"
    },
]

    const [curTab, setCurTab] = useState<number>(1);

    const navRef = useRef<HTMLDivElement>(null);
    const LineRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]); 

    

    // Set line for first button
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

    
    
    
    const handleTabClick = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: number
    ) => {
        console.log('hàm handleTabClick hoạt động');
        
        setCurTab(id);
        changeLineStyle(e);
    };

    // handle underline
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
    
    const activeContent = navContent.find((item) => item.id === curTab);

    return (
        <Wrapper>
            <Header>
                <Title medium>{data && data.name}</Title>
                <Time>
                    <span>{data && data.duration}</span>
                    Ngày
                </Time>
            </Header>
            <Image src={data?.image ? (data.image.startsWith('http') ? data.image : `${GET_IMAGE_URL}/tours/${data.image}`) : ''} />
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
    background-position: center;
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
`

export default Contain;
