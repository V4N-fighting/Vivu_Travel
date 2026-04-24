import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography, message, Modal, Button, Space, Input, Popconfirm, Badge } from 'antd';
import { EyeOutlined, DeleteOutlined, MailOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import dayjs from 'dayjs';

const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [searchText, setSearchText] = useState('');
  const [filterNewOnly, setFilterNewOnly] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const data = await adminService.getContacts();
      setContacts(data);
    } catch (error) {
      message.error('Không thể tải danh sách liên hệ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const showDetail = async (contact: any) => {
    setSelectedContact(contact);
    if (!contact.is_read) {
      try {
        await adminService.markContactAsRead(contact.id, true);
        // Update local state to show as read immediately
        setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, is_read: true } : c));
      } catch (error) {
        console.error('Lỗi khi đánh dấu đã đọc');
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteContact(id);
      message.success('Đã xóa tin nhắn liên hệ');
      fetchContacts();
    } catch (error) {
      message.error('Lỗi khi xóa tin nhắn');
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) {
      message.warning('Vui lòng nhập nội dung phản hồi');
      return;
    }

    setIsSubmittingReply(true);
    try {
      await adminService.replyContact(selectedContact.id, replyMessage);
      message.success('Đã gửi email phản hồi thành công');
      setIsReplyModalOpen(false);
      setReplyMessage('');
      fetchContacts();
    } catch (error) {
      console.error('Lỗi khi gửi email:', error);
      message.error('Không thể gửi email phản hồi');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      contact.subject?.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFilter = filterNewOnly ? !contact.is_read : true;
    
    return matchesSearch && matchesFilter;
  });

  const columns = [
    {
      title: 'Khách hàng',
      key: 'sender',
      render: (_: any, record: any) => (
        <Space>
          {!record.is_read && <Badge status="processing" color="blue" />}
          <div>
            <div style={{ fontWeight: record.is_read ? 'normal' : 'bold' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: 'gray' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Chủ đề',
      dataIndex: 'subject',
      key: 'subject',
      render: (text: string, record: any) => (
        <span style={{ fontWeight: record.is_read ? 400 : 600 }}>{text || 'N/A'}</span>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_read',
      key: 'is_read',
      render: (isRead: boolean) => (
        <Tag color={isRead ? 'default' : 'blue'}>{isRead ? 'Đã xem' : 'Mới'}</Tag>
      ),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" ghost size="small" icon={<EyeOutlined />} onClick={() => showDetail(record)}>Xem</Button>
          <Popconfirm title="Xóa tin nhắn này?" onConfirm={() => handleDelete(record.id)}>
            <Button danger size="small" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
        <Typography.Title level={3} style={{ margin: 0 }}>
          Quản lý Liên hệ
        </Typography.Title>
        <Space>
          <Input 
            placeholder="Tìm theo tên, email, chủ đề..." 
            prefix={<SearchOutlined />} 
            style={{ width: 300 }}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Button 
            type={filterNewOnly ? 'primary' : 'default'} 
            icon={<FilterOutlined />} 
            onClick={() => setFilterNewOnly(!filterNewOnly)}
          >
            {filterNewOnly ? 'Tất cả tin nhắn' : 'Tin nhắn mới'}
          </Button>
        </Space>
      </div>
      
      <Table 
        columns={columns} 
        dataSource={filteredContacts} 
        rowKey="id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Chi tiết tin nhắn liên hệ"
        open={!!selectedContact}
        onCancel={() => setSelectedContact(null)}
        footer={[
          <Button key="close" onClick={() => setSelectedContact(null)}>Đóng</Button>,
          <Button 
            key="reply" 
            type="primary" 
            icon={<MailOutlined />}
            onClick={() => setIsReplyModalOpen(true)}
          >
            Gửi email phản hồi
          </Button>
        ]}
        width={600}
      >
        {selectedContact && (
          <div style={{ padding: '10px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p><strong>Từ:</strong> {selectedContact.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${selectedContact.email}`}>{selectedContact.email}</a></p>
                <p><strong>SĐT:</strong> {selectedContact.phone || 'N/A'}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'gray' }}>{dayjs(selectedContact.created_at).format('DD/MM/YYYY HH:mm')}</p>
                <Tag color={selectedContact.is_read ? 'default' : 'blue'}>
                  {selectedContact.is_read ? 'Đã xem' : 'Mới'}
                </Tag>
              </div>
            </div>
            <hr style={{ opacity: 0.1, margin: '15px 0' }} />
            <p><strong>Chủ đề:</strong> {selectedContact.subject || 'N/A'}</p>
            <div style={{ background: '#f9f9f5', padding: '20px', borderRadius: '8px', marginTop: '10px', border: '1px solid #f0f0f0' }}>
              <strong>Nội dung:</strong><br />
              <div style={{ whiteSpace: 'pre-wrap', marginTop: '15px', lineHeight: '1.6' }}>
                {selectedContact.message}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title={`Phản hồi email cho: ${selectedContact?.email}`}
        open={isReplyModalOpen}
        onCancel={() => setIsReplyModalOpen(false)}
        onOk={handleReply}
        confirmLoading={isSubmittingReply}
        okText="Gửi phản hồi"
        cancelText="Hủy"
        width={700}
      >
        <div style={{ marginBottom: '20px' }}>
          <Typography.Text type="secondary">Chủ đề: Re: [Vivu Travel] {selectedContact?.subject}</Typography.Text>
        </div>
        <Input.TextArea
          rows={10}
          placeholder="Nhập nội dung email phản hồi của bạn tại đây..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          disabled={isSubmittingReply}
        />
        <div style={{ marginTop: '10px' }}>
          <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
            * Nội dung này sẽ được gửi trực tiếp đến địa chỉ email của khách hàng kèm theo bản sao tin nhắn gốc.
          </Typography.Text>
        </div>
      </Modal>
    </div>
  );
};

export default Contacts;
