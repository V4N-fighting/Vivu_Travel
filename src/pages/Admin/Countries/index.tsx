import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, message, Popconfirm, Avatar } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, GlobalOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import ImageUpload from '../../../Component/BaseComponent/ImageUpload';

const Countries: React.FC = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const data = await adminService.getCountries();
      setCountries(data);
    } catch (error) {
      message.error('Không thể tải danh sách quốc gia');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleAdd = () => {
    setEditingCountry(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingCountry(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteCountry(id);
      message.success('Đã xóa quốc gia');
      fetchCountries();
    } catch (error) {
      message.error('Lỗi khi xóa quốc gia');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCountry) {
        await adminService.updateCountry(editingCountry.id, values);
        message.success('Đã cập nhật quốc gia');
      } else {
        await adminService.createCountry(values);
        message.success('Đã thêm quốc gia mới');
      }
      setIsModalOpen(false);
      fetchCountries();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const columns = [
    {
      title: 'Quốc gia',
      key: 'country',
      render: (_: any, record: any) => (
        <Space>
          <Avatar 
            src={record.image} 
            icon={<GlobalOutlined />} 
            shape="square" 
            size="large"
          />
          <span style={{ fontWeight: 'bold' }}>{record.name}</span>
        </Space>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Xóa quốc gia này sẽ ảnh hưởng đến các tour liên quan. Bạn chắc chứ?" onConfirm={() => handleDelete(record.id)}>
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
          Quản lý Quốc gia
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm Quốc gia
        </Button>
      </div>

      <Table columns={columns} dataSource={countries} rowKey="id" loading={loading} />

      <Modal
        title={editingCountry ? 'Chỉnh sửa Quốc gia' : 'Thêm Quốc gia mới'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên quốc gia" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh">
            <ImageUpload />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Countries;
