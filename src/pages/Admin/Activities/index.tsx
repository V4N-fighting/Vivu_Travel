import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import ImageUpload from '../../../Component/BaseComponent/ImageUpload';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [form] = Form.useForm();

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const data = await adminService.getActivities();
      setActivities(data);
    } catch (error) {
      message.error('Không thể tải danh sách hoạt động');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleAdd = () => {
    setEditingActivity(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingActivity(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteActivity(id);
      message.success('Đã xóa hoạt động');
      fetchActivities();
    } catch (error) {
      message.error('Lỗi khi xóa hoạt động');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (editingActivity) {
        await adminService.updateActivity(editingActivity.id, values);
        message.success('Đã cập nhật hoạt động');
      } else {
        await adminService.createActivity(values);
        message.success('Đã thêm hoạt động mới');
      }
      setIsModalOpen(false);
      fetchActivities();
    } catch (error: any) {
      if (error.errorFields) {
        message.error('Vui lòng điền đầy đủ các trường bắt buộc');
        console.error('Validation errors:', error.errorFields);
      } else {
        console.error('Submit error:', error);
        message.error(error.response?.data?.message || 'Lỗi khi lưu hoạt động');
      }
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Tên Hoạt động',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          {record.icon ? (
            <img src={record.icon} alt={text} style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '4px' }} />
          ) : (
            '✨'
          )}
          <span style={{ fontWeight: 'bold' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Ảnh/Icon',
      dataIndex: 'icon',
      key: 'icon',
      ellipsis: true,
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
          <Popconfirm title="Bạn có chắc muốn xóa hoạt động này?" onConfirm={() => handleDelete(record.id)}>
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
          Quản lý Hoạt động (Activities)
        </Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm Hoạt động
        </Button>
      </div>

      <Table columns={columns} dataSource={activities} rowKey="id" loading={loading} />

      <Modal
        title={editingActivity ? 'Chỉnh sửa Hoạt động' : 'Thêm Hoạt động mới'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Tên hoạt động" rules={[{ required: true }]}>
            <Input placeholder="Ví dụ: Kayaking, Trekking..." />
          </Form.Item>
          <Form.Item name="icon" label="Ảnh đại diện">
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

export default Activities;
