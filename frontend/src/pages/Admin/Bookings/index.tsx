import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Typography, Select, message, Button } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import dayjs from 'dayjs';

// Khai báo kiểu cho jsPDF để tránh lỗi biên dịch
const jsPDF = require('jspdf').jsPDF;
const autoTable = require('jspdf-autotable').default;

const Bookings: React.FC = () => {
  const [bookingGroups, setBookingGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await adminService.getBookings();
      setBookingGroups(data);
    } catch (error) {
      message.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    try {
      await adminService.updateBookingStatus(id, { status });
      message.success('Đã cập nhật trạng thái đơn hàng');
      fetchBookings();
    } catch (error) {
      message.error('Lỗi khi cập nhật trạng thái');
    }
  };

  const handleExpandRow = (key: string) => {
    const isExpanded = expandedRowKeys.includes(key);
    if (isExpanded) {
      setExpandedRowKeys(expandedRowKeys.filter(k => k !== key));
    } else {
      setExpandedRowKeys([...expandedRowKeys, key]);
    }
  };

  const exportInvoicePDF = (record: any) => {
    const removeAccents = (str: string) => {
      return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    };

    const doc = new jsPDF();
    
    // 1. Company Header
    doc.setFontSize(22);
    doc.setTextColor(24, 144, 255); 
    doc.text('VIVU TRAVEL', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Email: contact@vivutravel.com | Hotline: 1900 1234', 105, 28, { align: 'center' });
    doc.text('Address: 123 ABC Street, District 1, Ho Chi Minh City', 105, 33, { align: 'center' });
    
    doc.setLineWidth(0.5);
    doc.line(20, 40, 190, 40);

    // 2. Invoice Title
    doc.setFontSize(18);
    doc.setTextColor(0);
    doc.text('PAYMENT INVOICE', 105, 50, { align: 'center' });

    // Handle Cancelled Status
    if (record.status === 'cancelled') {
      doc.setFontSize(60);
      doc.setTextColor(255, 0, 0); 
      doc.setGState(new (doc as any).GState({ opacity: 0.15 })); 
      doc.text('CANCELLED', 105, 150, { align: 'center', angle: 45 });
      doc.setGState(new (doc as any).GState({ opacity: 1.0 })); 
      
      doc.setFontSize(14);
      doc.setTextColor(255, 0, 0);
      doc.text('VOID - ORDER CANCELLED', 105, 58, { align: 'center' });
    }
    
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Invoice No: ${record.booking_code}`, 20, 65);
    doc.text(`Date: ${new Date().toLocaleDateString('en-US')}`, 20, 72);
    doc.text(`Status: ${record.status.toUpperCase()}`, 20, 79);

    // 3. Customer Information
    doc.setFontSize(12);
    doc.text('CUSTOMER INFORMATION', 20, 95);
    doc.setFontSize(11);
    const cleanCustomerName = removeAccents(record.customer_name || 'N/A');
    doc.text(`Full Name: ${cleanCustomerName}`, 20, 103);
    doc.text(`Email: ${record.customer_email}`, 20, 110);
    
    // 4. Service Details Table
    const tableColumn = ["Service Description", "Quantity", "Unit Price", "Amount"];
    const tableRows = [
      [
        removeAccents(record.tour_name || 'N/A'),
        `${record.adult_count} Adult(s), ${record.child_count} Child(ren)`,
        `${new Intl.NumberFormat('vi-VN').format(record.total_price)} VND`,
        `${new Intl.NumberFormat('vi-VN').format(record.total_price)} VND`
      ]
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 120,
      theme: 'grid',
      headStyles: { fillColor: [24, 144, 255] },
      styles: { fontSize: 10, cellPadding: 5 }
    });

    // 5. Total
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`TOTAL AMOUNT: ${new Intl.NumberFormat('vi-VN').format(record.total_price)} VND`, 190, finalY, { align: 'right' });

    // 6. Footer Signatures
    doc.setFontSize(10);
    doc.text('Prepared By', 40, finalY + 30, { align: 'center' });
    doc.text('(Signature & Name)', 40, finalY + 35, { align: 'center' });
    
    doc.text('Customer', 150, finalY + 30, { align: 'center' });
    doc.text('(Signature & Name)', 150, finalY + 35, { align: 'center' });

    // Export PDF
    doc.save(`Invoice_${record.booking_code}.pdf`);
  };

  const expandedRowRender = (group: any) => {
    // ... (columns definition remains same)
    const columns = [
      {
        title: 'Mã Đơn',
        dataIndex: 'booking_code',
        key: 'booking_code',
        render: (text: string) => <Tag color="blue">{text}</Tag>,
      },
      {
        title: 'Khách hàng',
        key: 'customer',
        render: (_: any, record: any) => (
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.customer_name || 'N/A'}</div>
            <div style={{ fontSize: '12px', color: 'gray' }}>{record.customer_email}</div>
            <div style={{ fontSize: '12px', color: 'gray' }}>{record.customer_phone}</div>
          </div>
        ),
      },
      {
        title: 'Số người',
        key: 'people',
        render: (_: any, record: any) => (
          <span>{record.adult_count} Lớn, {record.child_count} Trẻ em</span>
        ),
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
        render: (status: string, record: any) => (
          <Select
            defaultValue={status}
            style={{ width: 140 }}
            onChange={(value) => handleStatusChange(record.id, value)}
            options={[
              { value: 'pending', label: <Tag color="orange">Đang chờ</Tag> },
              { value: 'confirmed', label: <Tag color="green">Đã xác nhận</Tag> },
              { value: 'cancelled', label: <Tag color="red">Đã hủy</Tag> },
            ]}
          />
        ),
      },
      {
        title: 'Thao tác',
        key: 'action',
        render: (_: any, record: any) => (
          <Space size="middle">
            {record.status !== 'pending' && (
              <Button 
                type="primary"
                ghost
                size="small"
                icon={<FilePdfOutlined />} 
                onClick={() => exportInvoicePDF({ ...record, tour_name: group.tour_name })}
              >
                Hóa đơn
              </Button>
            )}
          </Space>
        ),
      },
    ];

    return <Table columns={columns} dataSource={group.bookings} pagination={false} rowKey="id" />;
  };

  const groupColumns = [
    {
      title: 'Tên Tour',
      dataIndex: 'tour_name',
      key: 'tour_name',
      render: (text: string, record: any) => {
        const key = `${record.tour_id}-${record.departure_date_id}`;
        return (
          <b 
            style={{ color: '#1890ff', cursor: 'pointer' }}
            onClick={() => handleExpandRow(key)}
          >
            {text}
          </b>
        );
      }
    },
    {
      title: 'Ngày khởi hành',
      dataIndex: 'departure_date',
      key: 'departure_date',
      render: (date: string) => <b>{dayjs(date).format('DD/MM/YYYY')}</b>
    },
    {
      title: 'Tổng đơn hàng',
      dataIndex: 'total_bookings',
      key: 'total_bookings',
      render: (count: number) => <Tag color="blue">{count} đơn</Tag>
    },
    {
      title: 'Tổng khách',
      dataIndex: 'total_people',
      key: 'total_people',
      render: (count: number) => <Tag color="cyan">{count || 0} người</Tag>
    }
  ];

  return (
    <div>
      <Typography.Title level={3} style={{ marginTop: 0 }}>
        Quản lý Tour theo ngày (Bookings Grouped)
      </Typography.Title>
      <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 20 }}>
        Danh sách các Tour có khách đặt, nhấn vào tên tour hoặc dấu (+) để xem chi tiết danh sách khách hàng.
      </Typography.Text>
      <Table 
        columns={groupColumns} 
        dataSource={bookingGroups} 
        rowKey={(record) => `${record.tour_id}-${record.departure_date_id}`}
        loading={loading} 
        expandable={{ 
          expandedRowRender,
          expandedRowKeys: expandedRowKeys,
          onExpand: (expanded, record) => {
            const key = `${record.tour_id}-${record.departure_date_id}`;
            if (expanded) {
              setExpandedRowKeys([...expandedRowKeys, key]);
            } else {
              setExpandedRowKeys(expandedRowKeys.filter(k => k !== key));
            }
          }
        }}
      />
    </div>
  );
};

export default Bookings;
