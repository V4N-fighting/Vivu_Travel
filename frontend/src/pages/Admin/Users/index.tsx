import React, { useEffect, useState } from 'react';
import { Table, Tag, Switch, Typography, message, Avatar, Input, Space, Row, Col, Select } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import dayjs from 'dayjs';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<boolean | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (error) {
      message.error('Không thể tải danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (id: number, checked: boolean) => {
    try {
      await adminService.toggleUserStatus(id, checked);
      message.success(`Đã ${checked ? 'kích hoạt' : 'vô hiệu hóa'} người dùng`);
      fetchUsers();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái người dùng');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchText.toLowerCase()) ||
      user.phone?.includes(searchText);
    
    const matchesStatus = statusFilter === null || user.is_active === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_: any, record: any) => (
        <Space>
          <Avatar 
            src={record.avatar} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: record.is_active ? '#1890ff' : '#d9d9d9' }}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.first_name} {record.last_name}</div>
            <div style={{ fontSize: '12px', color: 'gray' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      render: (text: string) => text || 'N/A'
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'volcano' : 'blue'}>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: boolean, record: any) => (
        <Switch 
          checked={isActive} 
          onChange={(checked) => handleToggleStatus(record.id, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
    },
    {
      title: 'Ngày tham gia',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Typography.Title level={3} style={{ margin: '0 0 16px 0' }}>
          Quản lý Người dùng
        </Typography.Title>
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="Tìm theo tên, email, số điện thoại..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Trạng thái"
              style={{ width: '100%' }}
              allowClear
              onChange={value => setStatusFilter(value)}
              options={[
                { value: true, label: 'Đang hoạt động' },
                { value: false, label: 'Bị khóa' },
              ]}
            />
          </Col>
        </Row>
      </div>
      <Table 
        columns={columns} 
        dataSource={filteredUsers} 
        rowKey="id" 
        loading={loading} 
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Users;
