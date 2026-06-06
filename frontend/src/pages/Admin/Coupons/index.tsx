import React, { useEffect, useState } from 'react';
import { Table, Button, Typography, Modal, Form, Input, InputNumber, DatePicker, message, Tag, Space, Select, Switch, Row, Col, Tooltip } from 'antd';
import { PlusOutlined, GiftOutlined, EditOutlined, ClockCircleOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

// Tính trạng thái thực tế của coupon dựa trên ngày và giới hạn
const getEffectiveStatus = (record: any): { active: boolean; reason: string } => {
  if (!record.is_active) return { active: false, reason: 'Đã tắt thủ công' };
  if (record.usage_limit !== null && (record.used_count || 0) >= record.usage_limit)
    return { active: false, reason: 'Hết lượt sử dụng' };
  if (record.valid_to && dayjs().isAfter(dayjs(record.valid_to), 'day'))
    return { active: false, reason: `Hết hạn ${dayjs(record.valid_to).format('DD/MM/YYYY')}` };
  if (record.valid_from && dayjs().isBefore(dayjs(record.valid_from), 'day'))
    return { active: false, reason: `Chưa đến ngày bắt đầu` };
  return { active: true, reason: 'Đang hoạt động' };
};

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
    form.setFieldsValue({ is_active: true, discount_type: 'percentage', usage_limit: 100, min_order_value: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingCoupon(record);
    form.setFieldsValue({
      code: record.code,
      discount_type: record.discount_type,
      discount_value: record.discount_value,
      validFrom: record.valid_from ? dayjs(record.valid_from) : null,
      validTo: record.valid_to ? dayjs(record.valid_to) : null,
      usage_limit: record.usage_limit,
      min_order_value: record.min_order_value || 0,
      max_discount_amount: record.max_discount_amount || null,
      is_active: record.is_active,
    });
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        code: values.code,
        discount_type: values.discount_type,
        discount_value: values.discount_value,
        validFrom: values.validFrom ? values.validFrom.format('YYYY-MM-DD') : null,
        validTo: values.validTo ? values.validTo.format('YYYY-MM-DD') : null,
        usage_limit: values.usage_limit || 100,
        is_active: values.is_active ?? true,
        min_order_value: values.min_order_value || 0,
        max_discount_amount: values.max_discount_amount || null,
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
    } catch (error: any) {
      if (error?.errorFields) return; // validation error, không cần thông báo
      message.error('Lỗi khi lưu mã giảm giá');
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
      render: (code: string) => <Tag color="magenta" style={{ fontWeight: 'bold', fontSize: 13 }}>{code}</Tag>,
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
      render: (_: any, record: any) => {
        const now = dayjs();
        const from = record.valid_from ? dayjs(record.valid_from) : null;
        const to = record.valid_to ? dayjs(record.valid_to) : null;
        const isExpired = to && now.isAfter(to, 'day');
        const notStarted = from && now.isBefore(from, 'day');
        return (
          <span style={{ fontSize: '12px', color: isExpired ? '#ff4d4f' : notStarted ? '#faad14' : undefined }}>
            {from ? from.format('DD/MM/YYYY') : 'N/A'} – {to ? to.format('DD/MM/YYYY') : 'N/A'}
            {isExpired && <span style={{ marginLeft: 4 }}>⚠️</span>}
          </span>
        );
      },
    },
    {
      title: 'Sử dụng',
      key: 'usage',
      render: (_: any, record: any) => {
        const used = record.used_count || 0;
        const limit = record.usage_limit;
        const isFull = limit !== null && used >= limit;
        return (
          <span style={{ color: isFull ? '#ff4d4f' : undefined }}>
            {used} / {limit ?? '∞'}
          </span>
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_: any, record: any) => {
        const { active, reason } = getEffectiveStatus(record);
        return (
          <Tooltip title={reason}>
            <Tag
              icon={active ? <CheckCircleOutlined /> : <StopOutlined />}
              color={active ? 'green' : 'red'}
            >
              {active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
            </Tag>
          </Tooltip>
        );
      },
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
        onCancel={() => { setIsModalOpen(false); form.resetFields(); }}
        okText={editingCoupon ? 'Lưu thay đổi' : 'Tạo mã'}
        cancelText="Hủy"
        confirmLoading={loading}
        width={560}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="code" label="Mã giảm giá (Code)" rules={[{ required: true, message: 'Vui lòng nhập mã!' }, { pattern: /^[A-Z0-9_]+$/, message: 'Chỉ dùng chữ HOA, số, dấu _' }]}>
            <Input prefix={<GiftOutlined />} placeholder="Ví dụ: HELLO2024" style={{ textTransform: 'uppercase' }} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="discount_type" label="Loại giảm giá" rules={[{ required: true }]}>
                <Select
                  options={[
                    { value: 'percentage', label: 'Phần trăm (%)' },
                    { value: 'fixed', label: 'Cố định (VNĐ)' },
                  ]}
                  onChange={() => form.setFieldValue('discount_value', undefined)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="discount_value"
                label="Giá trị giảm"
                rules={[
                  { required: true, message: 'Vui lòng nhập giá trị!' },
                  {
                    validator: (_: any, value: any) => {
                      if (value === undefined || value === null || value === '') {
                        return Promise.reject('Vui lòng nhập giá trị!');
                      }
                      const num = Number(value);
                      if (isNaN(num) || num < 0) {
                        return Promise.reject('Giá trị phải lớn hơn hoặc bằng 0');
                      }
                      if (discountType === 'percentage' && num > 100) {
                        return Promise.reject('Phần trăm phải từ 0 đến 100');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                extra={discountType === 'percentage' ? 'Nhập từ 1 đến 100' : 'Nhập số tiền cố định (VNĐ)'}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={discountType === 'percentage' ? 100 : undefined}
                  precision={0}
                  step={discountType === 'percentage' ? 1 : 10000}
                  addonAfter={discountType === 'percentage' ? '%' : 'đ'}
                />
              </Form.Item>

            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="validFrom" label="Ngày bắt đầu">
                <DatePicker
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                  disabledDate={(d) => {
                    const to = form.getFieldValue('validTo');
                    return to ? d.isAfter(to, 'day') : false;
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="validTo" label="Ngày kết thúc">
                <DatePicker
                  style={{ width: '100%' }}
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày"
                  disabledDate={(d) => {
                    const from = form.getFieldValue('validFrom');
                    return from ? d.isBefore(from, 'day') : false;
                  }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="usage_limit" label="Giới hạn sử dụng" extra="Để trống = không giới hạn">
                <InputNumber style={{ width: '100%' }} min={1} placeholder="100" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="min_order_value" label="Đơn hàng tối thiểu (đ)">
                <InputNumber style={{ width: '100%' }} min={0} step={10000} addonAfter="đ" placeholder="0" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12} style={{ display: discountType === 'percentage' ? 'block' : 'none' }}>
              <Form.Item name="max_discount_amount" label="Giảm tối đa (đ)" extra="Giới hạn số tiền giảm tối đa">
                <InputNumber style={{ width: '100%' }} min={0} step={10000} addonAfter="đ" placeholder="Không giới hạn" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="is_active" label="Trạng thái kích hoạt" valuePropName="checked">
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
