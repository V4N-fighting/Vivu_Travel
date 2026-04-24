import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, InputNumber, Switch, message, Popconfirm, Image } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import ImageUpload from '../../../Component/BaseComponent/ImageUpload';

const Banners: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const data = await adminService.getBanners();
      setBanners(data);
    } catch (error) {
      message.error('Không thể tải danh sách banner');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleAdd = () => {
    setEditingBanner(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingBanner(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteBanner(id);
      message.success('Đã xóa banner');
      fetchBanners();
    } catch (error) {
      message.error('Lỗi khi xóa banner');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingBanner) {
        await adminService.updateBanner(editingBanner.id, values);
        message.success('Đã cập nhật banner');
      } else {
        await adminService.createBanner(values);
        message.success('Đã thêm banner mới');
      }
      setIsModalOpen(false);
      fetchBanners();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const columns = [
    {
      title: 'Ảnh Banner',
      dataIndex: 'first_image',
      key: 'first_image',
      render: (url: string) => (
        <Image 
          src={url} 
          alt="Banner" 
          width={150} 
          height={60} 
          style={{ objectFit: 'cover', borderRadius: '4px' }} 
          fallback="https://placehold.co/600x240?text=No+Image"
        />
      ),
    },
    {
      title: 'Nội dung chữ',
      dataIndex: 'text_content',
      key: 'text_content',
      ellipsis: true,
    },
    {
      title: 'Thứ tự',
      dataIndex: 'sort_order',
      key: 'sort_order',
      sorter: (a: any, b: any) => a.sort_order - b.sort_order,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean) => (
        <Switch checked={isActive} disabled />
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Bạn có chắc muốn xóa banner này?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Quản lý Banners
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm Banner
        </Button>
      </div>

      <Table columns={columns} dataSource={banners} rowKey="id" loading={loading} />

      <Modal
        title={editingBanner ? 'Chỉnh sửa Banner' : 'Thêm Banner mới'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical" initialValues={{ is_active: true, sort_order: 0 }}>
          <Form.Item name="first_image" label="Ảnh chính" rules={[{ required: true }]}>
            <ImageUpload />
          </Form.Item>
          <Form.Item name="second_image" label="Ảnh phụ (Tùy chọn)">
            <ImageUpload />
          </Form.Item>
          <Form.Item name="text_content" label="Nội dung hiển thị">
            <Input.TextArea rows={2} placeholder="Nhập chữ hiển thị trên banner..." />
          </Form.Item>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Form.Item name="sort_order" label="Thứ tự hiển thị">
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item name="is_active" label="Kích hoạt" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Banners;
