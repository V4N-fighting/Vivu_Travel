import React, { useEffect, useState } from 'react';
import { Table, Button, Typography, Modal, Form, Input, InputNumber, DatePicker, message, Tag, Space, Select, Switch, Row, Col } from 'antd';
import { PlusOutlined, GiftOutlined, EditOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import dayjs from 'dayjs';

const Coupons: React.FC = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [form] = Form.useForm();
  const discountType = Form.useWatch('discount_type', form);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await adminService.getCoupons();
      setCoupons(data);
    } catch (error) {
      message.error('Không thể tải danh sách mã giảm giá');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAdd = () => {
    setEditingCoupon(null);
    form.resetFields();
    form.setFieldsValue({ is_active: true, discount_type: 'fixed', usage_limit: 100 });
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingCoupon(record);
    form.setFieldsValue({
      ...record,
      validFrom: record.valid_from ? dayjs(record.valid_from) : null,
      validTo: record.valid_to ? dayjs(record.valid_to) : null,
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        validFrom: values.validFrom ? values.validFrom.format('YYYY-MM-DD') : null,
        validTo: values.validTo ? values.validTo.format('YYYY-MM-DD') : null,
      };
      
      setLoading(true);
      if (editingCoupon) {
        await adminService.updateCoupon(editingCoupon.id, payload);
        message.success('Đã cập nhật mã giảm giá');
      } else {
        await adminService.createCoupon(payload);
        message.success('Đã thêm mã giảm giá mới');
      }
      
      setIsModalOpen(false);
      fetchCoupons();
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Mã giảm giá',
      dataIndex: 'code',
      key: 'code',
      render: (code: string) => <Tag color="magenta" style={{ fontWeight: 'bold' }}>{code}</Tag>,
    },
    {
      title: 'Loại',
      dataIndex: 'discount_type',
      key: 'discount_type',
      render: (type: string) => (
        <Tag color={type === 'percentage' ? 'cyan' : 'gold'}>
          {type === 'percentage' ? 'Phần trăm (%)' : 'Cố định (đ)'}
        </Tag>
      ),
    },
    {
      title: 'Giá trị',
      dataIndex: 'discount_value',
      key: 'discount_value',
      render: (val: number, record: any) => (
        <span>
          {record.discount_type === 'percentage' 
            ? `${Math.floor(val)}%` 
            : `${new Intl.NumberFormat('vi-VN').format(Math.floor(val))} đ`}
        </span>
      ),
    },
    {
      title: 'Thời hạn',
      key: 'validity',
      render: (_: any, record: any) => (
        <span style={{ fontSize: '12px' }}>
          {record.valid_from ? dayjs(record.valid_from).format('DD/MM/YYYY') : 'N/A'} - {record.valid_to ? dayjs(record.valid_to).format('DD/MM/YYYY') : 'N/A'}
        </span>
      ),
    },
    {
      title: 'Sử dụng',
      key: 'usage',
      render: (_: any, record: any) => (
        <span>{record.used_count || 0} / {record.usage_limit || '∞'}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Quản lý Mã giảm giá
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Tạo mã mới
        </Button>
      </div>

      <Table columns={columns} dataSource={coupons} rowKey="id" loading={loading} />

      <Modal
        title={editingCoupon ? 'Chỉnh sửa mã giảm giá' : 'Tạo mã giảm giá mới'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical" initialValues={{ discount_type: 'fixed', usage_limit: 100, is_active: true }}>
          <Form.Item name="code" label="Mã giảm giá (Code)" rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}>
            <Input prefix={<GiftOutlined />} placeholder="Ví dụ: HELLO2024" />
          </Form.Item>
          
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="discount_type" label="Loại giảm giá" rules={[{ required: true }]}>
                <Select options={[
                  { value: 'fixed', label: 'Cố định (VNĐ)' },
                  { value: 'percentage', label: 'Phần trăm (%)' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item 
                name="discount_value" 
                label="Giá trị giảm" 
                rules={[
                  { required: true, message: 'Nhập giá trị!' },
                  { 
                    type: 'number', 
                    min: 0, 
                    max: discountType === 'percentage' ? 100 : undefined,
                    message: discountType === 'percentage' ? 'Từ 0-100%' : 'Giá trị không hợp lệ'
                  }
                ]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  precision={discountType === 'percentage' ? 0 : undefined}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="validFrom" label="Ngày bắt đầu">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="validTo" label="Ngày kết thúc">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="usage_limit" label="Giới hạn sử dụng">
                <InputNumber style={{ width: '100%' }} min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="min_order_value" label="Đơn hàng tối thiểu (đ)">
                <InputNumber style={{ width: '100%' }} min={0} step={10000} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="max_discount_amount" label="Giảm tối đa (đ)" hidden={discountType !== 'percentage'}>
                <InputNumber style={{ width: '100%' }} min={0} step={10000} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="is_active" label="Trạng thái" valuePropName="checked">
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Coupons;
