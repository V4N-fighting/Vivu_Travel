import React, { useEffect, useState } from 'react';
import {
  Table, Tag, Space, Typography, Select, message, Button, Card, Row, Col, Statistic, Modal, Input, Badge, Tooltip
} from 'antd';
import {
  DollarOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined,
  CreditCardOutlined, BankOutlined, WalletOutlined, EditOutlined, EyeOutlined
} from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Tiền mặt', icon: <DollarOutlined />, color: '#52c41a' },
  { value: 'bank_transfer', label: 'Chuyển khoản ngân hàng', icon: <BankOutlined />, color: '#1890ff' },
  { value: 'momo', label: 'Ví MoMo', icon: <WalletOutlined />, color: '#ae2d68' },
  { value: 'vnpay', label: 'VNPay', icon: <CreditCardOutlined />, color: '#005baa' },
  { value: 'credit_card', label: 'Thẻ tín dụng/ghi nợ', icon: <CreditCardOutlined />, color: '#fa8c16' },
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Chờ thanh toán', color: 'orange' },
  { value: 'paid', label: 'Đã thanh toán', color: 'green' },
  { value: 'failed', label: 'Thất bại', color: 'red' },
  { value: 'refunded', label: 'Hoàn tiền', color: 'purple' },
];

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState<{ visible: boolean; record: any | null }>({ visible: false, record: null });
  const [editStatus, setEditStatus] = useState('');
  const [editMethod, setEditMethod] = useState('');
  const [editTransactionId, setEditTransactionId] = useState('');
  const [detailModal, setDetailModal] = useState<{ visible: boolean; record: any | null }>({ visible: false, record: null });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [paymentsData, statsData] = await Promise.all([
        adminService.getPayments(),
        adminService.getPaymentStats(),
      ]);
      setPayments(paymentsData);
      setStats(statsData);
    } catch (error) {
      message.error('Không thể tải dữ liệu thanh toán');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenEdit = (record: any) => {
    setEditModal({ visible: true, record });
    setEditStatus(record.status);
    setEditMethod(record.method || 'cash');
    setEditTransactionId(record.transaction_id || '');
  };

  const handleSaveEdit = async () => {
    if (!editModal.record) return;
    try {
      await adminService.updatePaymentStatus(editModal.record.id, editStatus, editTransactionId || undefined);
      if (editMethod !== editModal.record.method) {
        await adminService.updatePaymentMethod(editModal.record.id, editMethod);
      }
      message.success('Cập nhật thanh toán thành công');
      setEditModal({ visible: false, record: null });
      fetchData();
    } catch {
      message.error('Lỗi khi cập nhật thanh toán');
    }
  };

  const getMethodLabel = (method: string) => {
    const m = PAYMENT_METHODS.find(x => x.value === method);
    return m ? m.label : method || 'N/A';
  };

  const getMethodColor = (method: string) => {
    const m = PAYMENT_METHODS.find(x => x.value === method);
    return m ? m.color : '#999';
  };

  const getStatusColor = (status: string) => {
    const s = PAYMENT_STATUSES.find(x => x.value === status);
    return s ? s.color : 'default';
  };

  const getStatusLabel = (status: string) => {
    const s = PAYMENT_STATUSES.find(x => x.value === status);
    return s ? s.label : status;
  };

  const columns = [
    {
      title: 'Mã thanh toán',
      dataIndex: 'id',
      key: 'id',
      render: (id: number) => <Tag color="blue">#{id}</Tag>,
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'booking_code',
      key: 'booking_code',
      render: (code: string) => <Tag color="geekblue">{code}</Tag>,
    },
    {
      title: 'Tour',
      dataIndex: 'tour_name',
      key: 'tour_name',
      render: (name: string) => <Text strong>{name}</Text>,
      ellipsis: true,
    },
    {
      title: 'Khách hàng',
      key: 'customer',
      render: (_: any, record: any) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.customer_name || 'N/A'}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>{record.customer_email}</div>
        </div>
      ),
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <Text strong style={{ color: '#f5222d', fontSize: 15 }}>
          {new Intl.NumberFormat('vi-VN').format(amount)} đ
        </Text>
      ),
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: 'Phương thức',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => (
        <Tag style={{ color: getMethodColor(method), borderColor: getMethodColor(method), background: `${getMethodColor(method)}18` }}>
          {getMethodLabel(method)}
        </Tag>
      ),
      filters: PAYMENT_METHODS.map(m => ({ text: m.label, value: m.value })),
      onFilter: (value: any, record: any) => record.method === value,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusLabel(status)}</Tag>
      ),
      filters: PAYMENT_STATUSES.map(s => ({ text: s.label, value: s.value })),
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Mã GD',
      dataIndex: 'transaction_id',
      key: 'transaction_id',
      render: (tid: string) => tid ? <Text code style={{ fontSize: 11 }}>{tid}</Text> : <Text type="secondary">—</Text>,
    },
    {
      title: 'Ngày thanh toán',
      dataIndex: 'paid_at',
      key: 'paid_at',
      render: (date: string) => date ? dayjs(date).format('DD/MM/YYYY HH:mm') : <Text type="secondary">Chưa thanh toán</Text>,
      sorter: (a: any, b: any) => new Date(a.paid_at || 0).getTime() - new Date(b.paid_at || 0).getTime(),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => setDetailModal({ visible: true, record })}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              size="small"
              type="primary"
              ghost
              onClick={() => handleOpenEdit(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginTop: 0 }}>Quản lý Thanh toán</Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        Theo dõi và quản lý các giao dịch thanh toán từ khách hàng
      </Text>

      {/* Stats Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ background: 'linear-gradient(135deg, #52c41a22, #52c41a11)', border: '1px solid #52c41a44' }}>
            <Statistic
              title="Đã thanh toán"
              value={stats.total_paid || 0}
              formatter={(v) => `${new Intl.NumberFormat('vi-VN').format(Number(v))} đ`}
              valueStyle={{ color: '#52c41a', fontSize: 18 }}
              prefix={<CheckCircleOutlined />}
              suffix={<Badge count={stats.paid_count || 0} showZero style={{ backgroundColor: '#52c41a', marginLeft: 8 }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ background: 'linear-gradient(135deg, #faad1422, #faad1411)', border: '1px solid #faad1444' }}>
            <Statistic
              title="Chờ thanh toán"
              value={stats.total_pending || 0}
              formatter={(v) => `${new Intl.NumberFormat('vi-VN').format(Number(v))} đ`}
              valueStyle={{ color: '#faad14', fontSize: 18 }}
              prefix={<ClockCircleOutlined />}
              suffix={<Badge count={stats.pending_count || 0} showZero style={{ backgroundColor: '#faad14', marginLeft: 8 }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ background: 'linear-gradient(135deg, #f5222d22, #f5222d11)', border: '1px solid #f5222d44' }}>
            <Statistic
              title="Thất bại"
              value={stats.failed_count || 0}
              valueStyle={{ color: '#f5222d', fontSize: 18 }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} style={{ background: 'linear-gradient(135deg, #1890ff22, #1890ff11)', border: '1px solid #1890ff44' }}>
            <Statistic
              title="Tổng giao dịch"
              value={stats.total_payments || 0}
              valueStyle={{ color: '#1890ff', fontSize: 18 }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Breakdown by method */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {PAYMENT_METHODS.map(m => (
          <Col key={m.value} xs={12} sm={8} md={6} lg={4}>
            <Card size="small" bordered={false} style={{ borderLeft: `4px solid ${m.color}`, textAlign: 'center' }}>
              <div style={{ color: m.color, fontSize: 20 }}>{m.icon}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{m.label}</div>
              <div style={{ fontWeight: 'bold', color: m.color }}>
                {stats[`${m.value}_count`] || 0} đơn
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Table
        columns={columns}
        dataSource={payments}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 15, showSizeChanger: true, showTotal: (total) => `Tổng ${total} giao dịch` }}
        scroll={{ x: 1400 }}
        rowClassName={(record) => record.status === 'failed' ? 'row-failed' : ''}
      />

      {/* Edit Modal */}
      <Modal
        title="Cập nhật thông tin thanh toán"
        open={editModal.visible}
        onOk={handleSaveEdit}
        onCancel={() => setEditModal({ visible: false, record: null })}
        okText="Lưu thay đổi"
        cancelText="Hủy"
        width={520}
      >
        {editModal.record && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <Text strong>Mã đơn hàng: </Text>
              <Tag color="blue">{editModal.record.booking_code}</Tag>
            </div>
            <div>
              <Text strong>Tour: </Text>
              <Text>{editModal.record.tour_name}</Text>
            </div>
            <div>
              <Text strong>Số tiền: </Text>
              <Text style={{ color: '#f5222d' }}>
                {new Intl.NumberFormat('vi-VN').format(editModal.record.amount)} đ
              </Text>
            </div>
            <div>
              <div style={{ marginBottom: 6 }}><Text strong>Phương thức thanh toán:</Text></div>
              <Select
                value={editMethod}
                onChange={setEditMethod}
                style={{ width: '100%' }}
                options={PAYMENT_METHODS.map(m => ({ value: m.value, label: m.label }))}
              />
            </div>
            <div>
              <div style={{ marginBottom: 6 }}><Text strong>Trạng thái:</Text></div>
              <Select
                value={editStatus}
                onChange={setEditStatus}
                style={{ width: '100%' }}
                options={PAYMENT_STATUSES.map(s => ({
                  value: s.value,
                  label: <Tag color={s.color}>{s.label}</Tag>
                }))}
              />
            </div>
            <div>
              <div style={{ marginBottom: 6 }}><Text strong>Mã giao dịch (tùy chọn):</Text></div>
              <Input
                value={editTransactionId}
                onChange={e => setEditTransactionId(e.target.value)}
                placeholder="Nhập mã giao dịch..."
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Detail Modal */}
      <Modal
        title="Chi tiết thanh toán"
        open={detailModal.visible}
        onCancel={() => setDetailModal({ visible: false, record: null })}
        footer={<Button onClick={() => setDetailModal({ visible: false, record: null })}>Đóng</Button>}
        width={560}
      >
        {detailModal.record && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Row gutter={16}>
              <Col span={12}><Text type="secondary">Mã thanh toán:</Text><br /><Text strong>#{detailModal.record.id}</Text></Col>
              <Col span={12}><Text type="secondary">Mã đơn:</Text><br /><Tag color="blue">{detailModal.record.booking_code}</Tag></Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}><Text type="secondary">Tour:</Text><br /><Text strong>{detailModal.record.tour_name}</Text></Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}><Text type="secondary">Khách hàng:</Text><br /><Text>{detailModal.record.customer_name}</Text></Col>
              <Col span={12}><Text type="secondary">Email:</Text><br /><Text>{detailModal.record.customer_email}</Text></Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Số tiền:</Text><br />
                <Text strong style={{ color: '#f5222d', fontSize: 18 }}>
                  {new Intl.NumberFormat('vi-VN').format(detailModal.record.amount)} đ
                </Text>
              </Col>
              <Col span={12}>
                <Text type="secondary">Phương thức:</Text><br />
                <Tag style={{ color: getMethodColor(detailModal.record.method), borderColor: getMethodColor(detailModal.record.method) }}>
                  {getMethodLabel(detailModal.record.method)}
                </Tag>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Trạng thái:</Text><br />
                <Tag color={getStatusColor(detailModal.record.status)}>{getStatusLabel(detailModal.record.status)}</Tag>
              </Col>
              <Col span={12}>
                <Text type="secondary">Ngày tạo:</Text><br />
                <Text>{dayjs(detailModal.record.created_at).format('DD/MM/YYYY HH:mm')}</Text>
              </Col>
            </Row>
            {detailModal.record.paid_at && (
              <Row gutter={16}>
                <Col span={12}>
                  <Text type="secondary">Ngày thanh toán:</Text><br />
                  <Text>{dayjs(detailModal.record.paid_at).format('DD/MM/YYYY HH:mm')}</Text>
                </Col>
              </Row>
            )}
            {detailModal.record.transaction_id && (
              <Row gutter={16}>
                <Col span={24}>
                  <Text type="secondary">Mã giao dịch:</Text><br />
                  <Text code>{detailModal.record.transaction_id}</Text>
                </Col>
              </Row>
            )}
            <Row gutter={16}>
              <Col span={12}>
                <Text type="secondary">Người lớn:</Text><br />
                <Text>{detailModal.record.adult_count}</Text>
              </Col>
              <Col span={12}>
                <Text type="secondary">Trẻ em:</Text><br />
                <Text>{detailModal.record.child_count}</Text>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Payments;
