import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Title, Text } from '../../../../styled';
import ReviewCard from '../../../../Component/ReviewCard';
import Button from '../../../../Component/BaseComponent/Button/Button';
import axios from 'axios';
import { GET_REVIEW } from '../../../../api';
import { message, Rate, Input, Form } from 'antd';

interface Review {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    rating: number;
    comment: string;
    created_at: string;
}

interface ReviewsProps {
    tourId: string;
}

export const Reviews: React.FC<ReviewsProps> = ({ tourId }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    const fetchReviews = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${GET_REVIEW}/tour/${tourId}`);
            // Đảm bảo map đúng dữ liệu từ Backend
            const data = res.data.map((item: any) => {
                let avatarUrl = item.user_avatar || item.avatar || "";
                
                // Nếu avatar không phải là link (http) mà là tên file, trỏ vào thư mục uploads/profile
                if (avatarUrl && !avatarUrl.startsWith('http') && !avatarUrl.startsWith('data:')) {
                    avatarUrl = `http://localhost:5000/uploads/profile/${avatarUrl}`;
                }
                
                return {
                    ...item,
                    firstName: item.first_name || item.firstName || "",
                    lastName: item.last_name || item.lastName || item.user_name || "Khách hàng",
                    avatar: avatarUrl
                };
            });
            setReviews(data);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        } finally {
            setLoading(false);
        }
    }, [tourId]);

    useEffect(() => {
        if (tourId) {
            fetchReviews();
        }
    }, [tourId, fetchReviews]);

    const onFinish = async (values: any) => {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            message.warning('Vui lòng đăng nhập để để lại đánh giá!');
            return;
        }

        const user = JSON.parse(userStr);
        setSubmitting(true);
        try {
            await axios.post(GET_REVIEW, {
                tourId: parseInt(tourId),
                rating: values.rating,
                comment: values.comment
            }, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            });
            message.success('Cảm ơn bạn đã đánh giá!');
            form.resetFields();
            fetchReviews();
        } catch (error: any) {
            message.error(error.response?.data?.message || 'Không thể gửi đánh giá');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Wrap>
            <Title small>Đánh giá từ khách hàng</Title>
            
            <ReviewList>
                {loading ? (
                    <Text>Đang tải đánh giá...</Text>
                ) : reviews.length > 0 ? (
                    reviews.map((rev) => (
                        <ReviewCard 
                            key={rev.id}
                            src={rev.avatar || "/images/avatar-1-1.jpg"}
                            name={rev.lastName && rev.firstName ? `${rev.lastName} ${rev.firstName}` : rev.lastName}
                            star={rev.rating}
                            auth={new Date(rev.created_at).toLocaleDateString('vi-VN')}
                            descr={rev.comment}
                        />
                    ))
                ) : (
                    <Text>Chưa có đánh giá nào cho tour này.</Text>
                )}
            </ReviewList>

            <AddReview>
                <Title small style={{marginBottom: '20px'}}>Viết đánh giá của bạn</Title>
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item 
                        name="rating" 
                        label="Xếp hạng của bạn" 
                        rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}
                    >
                        <Rate />
                    </Form.Item>
                    <Form.Item 
                        name="comment" 
                        label="Nhận xét của bạn" 
                        rules={[{ required: true, message: 'Vui lòng nhập nhận xét!' }]}
                    >
                        <Input.TextArea rows={4} placeholder="Chia sẻ trải nghiệm của bạn về tour này..." />
                    </Form.Item>
                    <Form.Item>
                        <Button orange disabled={submitting}>
                            {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                        </Button>
                    </Form.Item>
                </Form>
            </AddReview>
        </Wrap>
    );
};

const Wrap = styled.div`
    width: 100%;
    padding: 20px 0;
    margin: 20px 0;
    border-top: 1px solid #eee;
`;

const ReviewList = styled.div`
    margin: 20px 0;
`;

const AddReview = styled.div`
    margin-top: 40px;
    padding: 30px;
    background: #f9f9f9;
    border-radius: 8px;
`;
