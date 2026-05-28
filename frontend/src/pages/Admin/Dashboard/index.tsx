import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic, Typography, Spin, message, Table, Tag } from 'antd';
import { adminService } from '../../../service/adminService';
import { 
  BarChartOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  DollarOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Fetch stats error:', error);
        message.error('Không thể tải thống kê');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;

  const recentColumns = [
    {
      title: 'Mã Đơn',
      dataIndex: 'booking_code',
      key: 'booking_code',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Tour',
      dataIndex: 'tour_name',
      key: 'tour_name',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price: number) => <b>{new Intl.NumberFormat('vi-VN').format(price)} đ</b>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'confirmed' ? 'green' : (status === 'cancelled' ? 'red' : 'orange')}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
  ];

  return (
    <div>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        Dashboard Thống kê
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic 
              title="Tổng số Tours" 
              value={stats?.toursCount || 0} 
              prefix={<BarChartOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic 
              title="Đơn hàng (Bookings)" 
              value={stats?.bookingsCount || 0} 
              prefix={<ShoppingCartOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic 
              title="Người dùng" 
              value={stats?.usersCount || 0} 
              prefix={<UserOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic 
              title="Doanh thu (Đã xác nhận)" 
              value={stats?.totalRevenue || 0} 
              prefix={<DollarOutlined style={{ color: '#f5222d' }} />}
              suffix="VNĐ"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Các đơn hàng gần đây">
             <Table 
              dataSource={stats?.recentBookings || []} 
              columns={recentColumns} 
              rowKey="id" 
              pagination={false}
             />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
