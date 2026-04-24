import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Modal, Input, message, Rate, Tag, Avatar, Row, Col, Select } from 'antd';
import { CommentOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import dayjs from 'dayjs';

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  // Filters State
  const [searchText, setSearchText] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await adminService.getReviews();
      setReviews(data);
    } catch (error) {
      message.error('Không thể tải danh sách đánh giá');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleReply = (record: any) => {
    setSelectedReview(record);
    setReplyText(record.admin_reply || '');
    setReplyModalOpen(true);
  };

  const submitReply = async () => {
    try {
      await adminService.replyReview(selectedReview.id, { reply: replyText });
      message.success('Đã gửi phản hồi');
      setReplyModalOpen(false);
      fetchReviews();
    } catch (error) {
      message.error('Lỗi khi gửi phản hồi');
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.tour_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      review.first_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      review.last_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesRating = ratingFilter === null || review.rating === ratingFilter;
    
    return matchesSearch && matchesRating;
  });

  const columns = [
    {
      title: 'Khách hàng',
      key: 'user',
      render: (_: any, record: any) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.first_name} {record.last_name}</div>
            <div style={{ fontSize: '12px', color: 'gray' }}>{record.user_email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Tour',
      key: 'tour',
      render: (_: any, record: any) => (
        <Space>
          {record.tour_image && <img src={record.tour_image} alt="" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} />}
          <b>{record.tour_name}</b>
        </Space>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => <Rate disabled defaultValue={rating} style={{ fontSize: '14px' }} />,
      sorter: (a: any, b: any) => a.rating - b.rating,
    },
    {
      title: 'Nhận xét',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => (
        <Tag color={record.admin_reply ? 'green' : 'orange'}>
          {record.admin_reply ? 'Đã phản hồi' : 'Chưa phản hồi'}
        </Tag>
      ),
    },
    {
      title: 'Ngày',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
      sorter: (a: any, b: any) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Button icon={<CommentOutlined />} onClick={() => handleReply(record)}>
          Phản hồi
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Typography.Title level={3} style={{ margin: '0 0 16px 0' }}>
          Quản lý Đánh giá
        </Typography.Title>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="Tìm theo tour, khách hàng, nội dung..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Lọc số sao"
              style={{ width: '100%' }}
              allowClear
              onChange={value => setRatingFilter(value)}
              options={[
                { value: 5, label: '5 sao' },
                { value: 4, label: '4 sao' },
                { value: 3, label: '3 sao' },
                { value: 2, label: '2 sao' },
                { value: 1, label: '1 sao' },
              ]}
            />
          </Col>
        </Row>
      </div>

      <Table columns={columns} dataSource={filteredReviews} rowKey="id" loading={loading} />

      <Modal
        title="Phản hồi đánh giá"
        open={replyModalOpen}
        onOk={submitReply}
        onCancel={() => setReplyModalOpen(false)}
      >
        {selectedReview && (
          <div style={{ marginBottom: 16 }}>
            <p><strong>Khách hàng:</strong> {selectedReview.first_name} {selectedReview.last_name}</p>
            <p><strong>Nội dung:</strong> {selectedReview.comment}</p>
            <Rate disabled defaultValue={selectedReview.rating} />
          </div>
        )}
        <Input.TextArea
          rows={4}
          placeholder="Nhập nội dung phản hồi của bạn..."
          value={replyText}
          onChange={e => setReplyText(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Reviews;
