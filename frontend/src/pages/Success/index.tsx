
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../../Component/BaseComponent/Button/Button';
import Icons from '../../Component/BaseComponent/Icons';
import { Title, Text, FlexBox } from '../../styled';

const SuccessPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Container>
                <IconWrapper>
                    <Icons.CheckIcon style={{ fontSize: '80px', color: '#4caf50' }} />
                </IconWrapper>
                <Title style={{ color: '#2d3436', marginBottom: '10px' }}>Thanh Toán Thành Công!</Title>
                <Text style={{ color: '#636e72', marginBottom: '30px' }}>
                    Cảm ơn bạn đã tin tưởng Vivu Travel. Thông tin đơn hàng của bạn đã được ghi nhận và đang được xử lý.
                </Text>
                
                <ButtonGroup>
                    <Button orange onClick={() => navigate('/')} style={{ padding: '12px 30px' }}>
                        Về trang chủ
                    </Button>
                    <Button blue onClick={() => navigate('/profile?action=0')} style={{ padding: '12px 30px' }}>
                        Xem lịch sử giao dịch
                    </Button>
                </ButtonGroup>
            </Container>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: #f9f9f9;
`;

const Container = styled.div`
    background: white;
    padding: 60px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    text-align: center;
    max-width: 600px;
    width: 90%;
`;

const IconWrapper = styled.div`
    width: 120px;
    height: 120px;
    background-color: #e8f5e9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 30px;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
`;

export default SuccessPage;
