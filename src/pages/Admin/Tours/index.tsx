import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Typography, Modal, Form, Input, InputNumber, Select, message, Popconfirm, Tag, Row, Col, DatePicker, Tabs, Switch } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CalendarOutlined, SearchOutlined, RocketOutlined } from '@ant-design/icons';
import { adminService } from '../../../service/adminService';
import { GET_IMAGE_URL } from '../../../api';
import ImageUpload from '../../../Component/BaseComponent/ImageUpload';
import dayjs from 'dayjs';

const { TabPane } = Tabs;

// Import internal components
const CountriesTab: React.FC<{ countries: any[], loading: boolean, onRefresh: () => void }> = ({ countries, loading, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<any>(null);
  const [form] = Form.useForm();

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
      onRefresh();
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
      onRefresh();
    } catch (error) {
      console.error('Country submit error:', error);
    }
  };

  const columns = [
    { 
      title: 'Hình ảnh', 
      dataIndex: 'image', 
      key: 'image', 
      render: (url: string) => {
        const imageUrl = url ? (url.startsWith('http') ? url : `${GET_IMAGE_URL}/countries/${url}`) : '';
        return <img src={imageUrl} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />;
      }
    },
    { title: 'Tên Quốc gia', dataIndex: 'name', key: 'name', render: (text: string) => <b>{text}</b> },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', ellipsis: true },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Xóa quốc gia này?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Text type="secondary">Quản lý các quốc gia có tour du lịch</Typography.Text>
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
            <Input placeholder="Ví dụ: Việt Nam, Thái Lan..." />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh đại diện">
            <ImageUpload />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const ActivitiesTab: React.FC<{ activities: any[], loading: boolean, onRefresh: () => void }> = ({ activities, loading, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [form] = Form.useForm();

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
      onRefresh();
    } catch (error) {
      message.error('Lỗi khi xóa hoạt động');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingActivity) {
        await adminService.updateActivity(editingActivity.id, values);
        message.success('Đã cập nhật hoạt động');
      } else {
        await adminService.createActivity(values);
        message.success('Đã thêm hoạt động mới');
      }
      setIsModalOpen(false);
      onRefresh();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const columns = [
    {
      title: 'Tên Hoạt động',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => {
        const iconUrl = record.icon ? (record.icon.startsWith('http') ? record.icon : `${GET_IMAGE_URL}/activities/${record.icon}`) : '';
        return (
          <Space>
            {record.icon ? (
              <img src={iconUrl} alt={text} style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '4px' }} />
            ) : (
              '✨'
            )}
            <span style={{ fontWeight: 'bold' }}>{text}</span>
          </Space>
        );
      },
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
          <Popconfirm title="Xóa hoạt động này?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography.Text type="secondary">Quản lý các hoạt động trải nghiệm trong tour (Kayaking, Trekking...)</Typography.Text>
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
    </>
  );
};

const Tours: React.FC = () => {
  const [tours, setTours] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [tourTypes, setTourTypes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [form] = Form.useForm();

  // Filters State
  const [searchText, setSearchText] = useState('');
  const [filterCountry, setFilterCountry] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [durationSearch, setDurationSearch] = useState('');

  // Tour Types State
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<any>(null);
  const [typeForm] = Form.useForm();

  // Departure Modal State
  const [isDepartureModalOpen, setIsDepartureModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [departures, setDepartures] = useState<any[]>([]);
  const [depForm] = Form.useForm();

  // Itinerary Modal State
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [itineraryForm] = Form.useForm();

  const handleItineraryOpen = async (tour: any) => {
    setSelectedTour(tour);
    setIsItineraryModalOpen(true);
    fetchItineraries(tour.id);
  };

  const fetchItineraries = async (tourId: number) => {
    try {
      const data = await adminService.getTourItineraries(tourId);
      setItineraries(data);
    } catch (error) {
      message.error('Không thể tải hành trình');
    }
  };

  const handleAddItinerary = async () => {
    try {
      const values = await itineraryForm.validateFields();
      await adminService.addTourItinerary(selectedTour.id, values);
      message.success('Đã thêm hành trình ngày mới');
      itineraryForm.resetFields();
      fetchItineraries(selectedTour.id);
    } catch (error) {
      message.error('Lỗi khi thêm hành trình');
    }
  };

  const handleDeleteItinerary = async (id: number) => {
    try {
      await adminService.deleteTourItinerary(id);
      message.success('Đã xóa hành trình');
      fetchItineraries(selectedTour.id);
    } catch (error) {
      message.error('Lỗi khi xóa');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [toursData, countriesData, typesData, activitiesData] = await Promise.all([
        adminService.getTours(),
        adminService.getCountries(),
        adminService.getTourTypes(),
        adminService.getActivities()
      ]);
      setTours(toursData);
      setCountries(countriesData);
      setTourTypes(typesData);
      setActivities(activitiesData);
    } catch (error) {
      message.error('Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingTour(null);
    form.resetFields();
    form.setFieldsValue({ 
      gallery: [''],
      booking_deadline_days: 0,
      is_active: true,
      activity_ids: []
    });
    setIsModalOpen(true);
  };

  const handleEdit = async (record: any) => {
    setEditingTour(record);
    try {
      // Lấy danh sách activity IDs của tour này
      const tourActivities = await adminService.getTourActivities(record.id);
      const activityIds = tourActivities.map((a: any) => a.id);
      
      form.setFieldsValue({
        ...record,
        gallery: record.gallery || [''],
        booking_deadline_days: record.booking_deadline_days || 0,
        is_active: record.is_active ?? true,
        activity_ids: activityIds
      });
      setIsModalOpen(true);
    } catch (error) {
      message.error('Lỗi khi tải thông tin hoạt động của tour');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteTour(id);
      message.success('Đã xóa tour');
      fetchData();
    } catch (error) {
      message.error('Lỗi khi xóa tour');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      if (editingTour) {
        await adminService.updateTour(editingTour.id, values);
        message.success('Đã cập nhật tour');
      } else {
        await adminService.createTour(values);
        message.success('Đã thêm tour mới');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error: any) {
      setLoading(false);
      if (error.errorFields) {
        message.error('Vui lòng điền đầy đủ các trường bắt buộc');
        form.scrollToField(error.errorFields[0].name);
      } else {
        message.error(error.response?.data?.message || 'Lỗi khi lưu thông tin');
      }
    } finally {
      setLoading(false);
    }
  };

  // Tour Type Handlers
  const handleAddType = () => {
    setEditingType(null);
    typeForm.resetFields();
    setIsTypeModalOpen(true);
  };

  const handleEditType = (record: any) => {
    setEditingType(record);
    typeForm.setFieldsValue(record);
    setIsTypeModalOpen(true);
  };

  const handleTypeOk = async () => {
    try {
      const values = await typeForm.validateFields();
      if (editingType) {
        await adminService.updateTourType(editingType.id, values);
        message.success('Đã cập nhật loại tour');
      } else {
        await adminService.createTourType(values);
        message.success('Đã thêm loại tour mới');
      }
      setIsTypeModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Type submit error:', error);
    }
  };

  const handleDeleteType = async (id: number) => {
    try {
      await adminService.deleteTourType(id);
      message.success('Đã xóa loại tour');
      fetchData();
    } catch (error) {
      message.error('Lỗi khi xóa loại tour');
    }
  };

  const filteredTours = tours.filter(tour => {
    const matchesSearch = !searchText || tour.name?.toLowerCase().includes(searchText.toLowerCase());
    const matchesCountry = !filterCountry || tour.country_id === filterCountry;
    const matchesType = !filterType || tour.tour_type_id === filterType;
    const matchesMinPrice = minPrice === null || tour.price_adult >= minPrice;
    const matchesMaxPrice = maxPrice === null || tour.price_adult <= maxPrice;
    const matchesDuration = !durationSearch || tour.duration?.toLowerCase().includes(durationSearch.toLowerCase());
    
    return matchesSearch && matchesCountry && matchesType && matchesMinPrice && matchesMaxPrice && matchesDuration;
  });

  const columns = [
    {
      title: 'Tên Tour',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          {record.image ? (
            <img 
              src={record.image.startsWith('http') ? record.image : `${GET_IMAGE_URL}/tours/${record.image}`} 
              alt="" 
              style={{ width: 40, height: 30, objectFit: 'cover', borderRadius: 2 }} 
            />
          ) : null}
          <span 
            style={{ color: '#1890ff', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => handleEdit(record)}
          >
            {text}
          </span>
        </Space>
      ),
    },
    {
      title: 'Quốc gia',
      dataIndex: 'country_name',
      key: 'country_name',
      render: (text: string, record: any) => {
        const country = countries.find(c => c.id === record.country_id);
        return <span>{country?.name || 'N/A'}</span>;
      }
    },
    {
      title: 'Giá (Người lớn)',
      dataIndex: 'price_adult',
      key: 'price_adult',
      render: (price: number) => <span>{new Intl.NumberFormat('vi-VN').format(price)} đ</span>,
    },
    {
      title: 'Thời gian',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'is_active',
        key: 'is_active',
        render: (active: boolean) => (
          <Tag color={active ? 'green' : 'red'}>
            {active ? 'Đang hoạt động' : 'Ngừng hoạt động'}
          </Tag>
        ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Bạn có chắc muốn xóa tour này?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
          <Button 
            icon={<CalendarOutlined />} 
            title="Ngày khởi hành" 
            onClick={() => handleDepartureOpen(record)}
          />
          <Button 
            icon={<RocketOutlined />} 
            title="Quản lý hành trình" 
            onClick={() => handleItineraryOpen(record)}
          />
        </Space>
      ),
    },
  ];

  // Departure Handlers
  const handleDepartureOpen = async (tour: any) => {
    setSelectedTour(tour);
    setIsDepartureModalOpen(true);
    fetchDepartures(tour.id);
  };

  const fetchDepartures = async (tourId: number) => {
    try {
      const data = await adminService.getTourDepartures(tourId);
      setDepartures(data);
    } catch (error) {
      message.error('Không thể tải lịch khởi hành');
    }
  };

  const handleAddDeparture = async () => {
    try {
      const values = await depForm.validateFields();
      await adminService.addTourDeparture(selectedTour.id, {
        departureDate: values.departure_date.format('YYYY-MM-DD'),
        availableSlots: values.available_slots
      });
      message.success('Đã thêm ngày khởi hành');
      depForm.resetFields();
      fetchDepartures(selectedTour.id);
    } catch (error) {
      message.error('Lỗi khi thêm ngày khởi hành');
    }
  };

  const handleDeleteDeparture = async (id: number) => {
    try {
      await adminService.deleteTourDeparture(id);
      message.success('Đã xóa ngày khởi hành');
      fetchDepartures(selectedTour.id);
    } catch (error) {
      message.error('Lỗi khi xóa');
    }
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" style={{ background: '#fff', padding: '16px', borderRadius: '8px' }}>
        {/* Tab 1: Quản lý Tours */}
        <TabPane tab={<Typography.Title level={4} style={{ margin: 0 }}>Quản lý Tours</Typography.Title>} key="1">
          <div style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Input 
                  placeholder="Tìm kiếm tên tour..." 
                  prefix={<SearchOutlined />} 
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col span={5}>
                <Select 
                  placeholder="Quốc gia" 
                  style={{ width: '100%' }} 
                  allowClear
                  onChange={value => setFilterCountry(value)}
                >
                  {countries.map(c => <Select.Option key={c.id} value={c.id}>{c.name}</Select.Option>)}
                </Select>
              </Col>
              <Col span={5}>
                <Select 
                  placeholder="Loại tour" 
                  style={{ width: '100%' }} 
                  allowClear
                  onChange={value => setFilterType(value)}
                >
                  {tourTypes.map(t => <Select.Option key={t.id} value={t.id}>{t.name}</Select.Option>)}
                </Select>
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                  Thêm Tour mới
                </Button>
              </Col>

              <Col span={6}>
                <Space.Compact style={{ width: '100%' }}>
                  <InputNumber 
                    placeholder="Giá từ" 
                    style={{ width: '50%' }} 
                    min={0}
                    formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
                    onChange={val => setMinPrice(val !== null ? Number(val) : null)}
                  />
                  <InputNumber 
                    placeholder="đến" 
                    style={{ width: '50%' }} 
                    min={0}
                    formatter={(value) => value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
                    parser={(value) => value!.replace(/\$\s?|(,*)/g, '') as any}
                    onChange={val => setMaxPrice(val !== null ? Number(val) : null)}
                  />
                </Space.Compact>
              </Col>
              <Col span={5}>
                <Input 
                  placeholder="Thời gian (VD: 4 days)" 
                  value={durationSearch}
                  onChange={e => setDurationSearch(e.target.value)}
                  allowClear
                />
              </Col>
            </Row>
          </div>
          <Table columns={columns} dataSource={filteredTours} rowKey="id" loading={loading} />
        </TabPane>

        {/* Tab 2: Loại Tour */}
        <TabPane tab={<Typography.Title level={4} style={{ margin: 0 }}>Loại Tour</Typography.Title>} key="2">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Typography.Text type="secondary">Phân loại các tour du lịch (VD: Tour biển, Tour leo núi...)</Typography.Text>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddType}>
              Thêm Loại Tour
            </Button>
          </div>
          <Table 
            dataSource={tourTypes} 
            rowKey="id" 
            loading={loading}
            columns={[
              { 
                title: 'Hình ảnh', 
                dataIndex: 'image', 
                key: 'image', 
                render: (url: string) => {
                  const imageUrl = url ? (url.startsWith('http') ? url : `${GET_IMAGE_URL}/tour-types/${url}`) : '';
                  return <img src={imageUrl} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />;
                }
              },
              { title: 'Tên Loại Tour', dataIndex: 'name', key: 'name', render: (text) => <b>{text}</b> },
              { title: 'Mô tả', dataIndex: 'description', key: 'description' },
              {
                title: 'Thao tác',
                key: 'action',
                render: (_, record) => (
                  <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEditType(record)} />
                    <Popconfirm title="Xóa loại tour này?" onConfirm={() => handleDeleteType(record.id)}>
                      <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        </TabPane>

        {/* Tab 3: Hoạt động */}
        <TabPane tab={<Typography.Title level={4} style={{ margin: 0 }}>Hoạt động</Typography.Title>} key="3">
          <ActivitiesTab 
            activities={activities} 
            loading={loading} 
            onRefresh={fetchData} 
          />
        </TabPane>
        {/* Tab 4: Quốc gia */}
        <TabPane tab={<Typography.Title level={4} style={{ margin: 0 }}>Quốc gia</Typography.Title>} key="4">
          <CountriesTab 
            countries={countries} 
            loading={loading} 
            onRefresh={fetchData} 
          />
        </TabPane>
      </Tabs>

      {/* Tour Modal */}
      <Modal
        title={editingTour ? 'Chỉnh sửa Tour' : 'Thêm Tour mới'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={800}
      >
        <Form form={form} layout="vertical" initialValues={{ is_active: true }}>
          <Form.Item name="name" label="Tên Tour" rules={[{ required: true, message: 'Vui lòng nhập tên tour!' }]}>
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="country_id" label="Quốc gia" rules={[{ required: true }]}>
                <Select>
                  {countries.map((c) => (
                    <Select.Option key={c.id} value={c.id}>
                      {c.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="tour_type_id" label="Loại Tour" rules={[{ required: true }]}>
                <Select>
                  {tourTypes.map((t) => (
                    <Select.Option key={t.id} value={t.id}>
                      {t.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="activity_ids" label="Các hoạt động trong Tour">
            <Select mode="multiple" placeholder="Chọn các hoạt động">
              {activities.map((act) => (
                <Select.Option key={act.id} value={act.id}>
                  {act.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="image" label="Ảnh đại diện chính">
            <ImageUpload />
          </Form.Item>

          <Typography.Text strong style={{ display: 'block', marginBottom: 8 }}>
            Bộ sưu tập ảnh (Gallery)
          </Typography.Text>
          <Form.List name="gallery">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    key={field.key}
                    required={false}
                    style={{ marginBottom: 8 }}
                  >
                    <Form.Item
                      {...field}
                      noStyle
                    >
                      <ImageUpload 
                        showAdd={index === fields.length - 1} 
                        showRemove={fields.length > 1}
                        onAddMore={() => add()}
                        onRemove={() => remove(field.name)}
                      />
                    </Form.Item>
                  </Form.Item>
                ))}
                {fields.length === 0 && (
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Thêm ảnh vào bộ sưu tập
                  </Button>
                )}
              </>
            )}
          </Form.List>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="price_adult" label="Giá Người lớn" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="price_child" label="Giá Trẻ em" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="duration" label="Thời gian (vd: 3 ngày 2 đêm)" rules={[{ required: true, message: 'Vui lòng nhập thời gian!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="max_people" label="Số người tối đa" rules={[{ required: true, message: 'Vui lòng nhập số người!' }]}>
                <InputNumber style={{ width: '100%' }} min={1} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="hotel_star" label="Số sao khách sạn">
                <InputNumber min={1} max={5} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="is_active" label="Trạng thái" valuePropName="checked">
                <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Ngừng hoạt động" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="booking_deadline_days" label="Hạn chót đăng ký (Số ngày trước khởi hành)" rules={[{ required: true, message: 'Vui lòng nhập số ngày!' }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="meeting_point" label="Điểm hẹn xuất phát" rules={[{ required: true, message: 'Vui lòng chọn điểm hẹn!' }]}>
                <Select placeholder="Chọn điểm hẹn">
                  <Select.Option value="Văn phòng TP.HCM">Văn phòng TP.HCM</Select.Option>
                  <Select.Option value="Văn phòng Đà Nẵng">Văn phòng Đà Nẵng</Select.Option>
                  <Select.Option value="Văn phòng Hà Nội">Văn phòng Hà Nội</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Itinerary Modal */}
      <Modal
        title={`Quản lý Hành trình: ${selectedTour?.name}`}
        open={isItineraryModalOpen}
        onCancel={() => setIsItineraryModalOpen(false)}
        footer={null}
        width={900}
      >
        <div style={{ marginBottom: 24, padding: 20, background: '#f9f9f9', border: '1px solid #eee', borderRadius: 8 }}>
          <Typography.Title level={5}>Thêm Ngày Hành Trình</Typography.Title>
          <Form form={itineraryForm} layout="vertical" onFinish={handleAddItinerary}>
            <Row gutter={16}>
              <Col span={4}>
                <Form.Item name="day_number" label="Ngày" rules={[{ required: true, message: 'Nhập số ngày' }]}>
                  <InputNumber min={1} placeholder="VD: 1" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={20}>
                <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: 'Nhập tiêu đề ngày' }]}>
                  <Input placeholder="VD: Khởi hành từ TP.HCM - Đến Nha Trang" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="description" label="Mô tả chi tiết">
              <Input.TextArea rows={3} placeholder="Mô tả những điểm đến và hoạt động trong ngày này..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                Lưu ngày hành trình
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Table 
          dataSource={itineraries} 
          rowKey="id"
          pagination={false}
          columns={[
            {
              title: 'Ngày',
              dataIndex: 'day_number',
              key: 'day_number',
              width: 80,
              render: (day: number) => <Tag color="orange">Ngày {day}</Tag>
            },
            {
              title: 'Chi tiết hành trình',
              key: 'content',
              render: (_, record) => (
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{record.title}</div>
                  <div style={{ color: '#666', whiteSpace: 'pre-wrap' }}>{record.description}</div>
                </div>
              )
            },
            {
              title: 'Thao tác',
              key: 'action',
              width: 100,
              render: (_, record) => (
                <Popconfirm title="Xóa ngày hành trình này?" onConfirm={() => handleDeleteItinerary(record.id)}>
                  <Button danger icon={<DeleteOutlined />} type="text" />
                </Popconfirm>
              )
            }
          ]}
        />
      </Modal>

      {/* Tour Type Modal */}
      <Modal
        title={editingType ? 'Chỉnh sửa Loại Tour' : 'Thêm Loại Tour mới'}
        open={isTypeModalOpen}
        onOk={handleTypeOk}
        onCancel={() => setIsTypeModalOpen(false)}
      >
        <Form form={typeForm} layout="vertical">
          <Form.Item name="name" label="Tên loại tour" rules={[{ required: true }]}>
            <Input placeholder="VD: Tour biển, Tour thám hiểm..." />
          </Form.Item>
          <Form.Item name="image" label="Hình ảnh đại diện">
            <ImageUpload />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Departure Modal */}
      <Modal
        title={`Quản lý Lịch khởi hành: ${selectedTour?.name}`}
        open={isDepartureModalOpen}
        onCancel={() => setIsDepartureModalOpen(false)}
        footer={null}
        width={700}
      >
        <div style={{ marginBottom: 24, padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
          <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 12 }}>
            Lưu ý: Tour này có quy định đăng ký trước <b>{selectedTour?.booking_deadline_days || 0} ngày</b>. 
            Hệ thống sẽ tự động tính toán khung thời gian nhận khách.
          </Typography.Text>
          
          <Form form={depForm} layout="inline" onFinish={handleAddDeparture}>
            <Form.Item name="departure_date" rules={[{ required: true, message: 'Chọn ngày' }]}>
              <DatePicker 
                placeholder="Ngày khởi hành" 
                disabledDate={(current) => current && current < dayjs().startOf('day')}
              />
            </Form.Item>
            <Form.Item name="available_slots" rules={[{ required: true, message: 'Nhập số chỗ' }]}>
              <InputNumber min={1} placeholder="Số chỗ" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Thêm lịch
              </Button>
            </Form.Item>
          </Form>
        </div>

        <Table 
          dataSource={departures} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
          columns={[
            {
              title: 'Ngày khởi hành',
              dataIndex: 'departure_date',
              key: 'departure_date',
              render: (date: string) => {
                const isPast = dayjs(date).isBefore(dayjs().startOf('day'));
                return (
                  <span style={{ color: isPast ? '#bfbfbf' : 'inherit' }}>
                    {dayjs(date).format('DD/MM/YYYY')} {isPast && '(Đã qua)'}
                  </span>
                );
              },
            },
            {
              title: 'Hạn chót đăng ký',
              key: 'deadline',
              render: (_, record) => {
                const deadline = dayjs(record.departure_date).subtract(selectedTour?.booking_deadline_days || 0, 'day');
                const isOver = dayjs().isAfter(deadline, 'day');
                const isPastDeparture = dayjs(record.departure_date).isBefore(dayjs().startOf('day'));
                
                return (
                  <Tag color={isPastDeparture || isOver ? 'red' : 'blue'}>
                    {deadline.format('DD/MM/YYYY')} {(isPastDeparture || isOver) && '(Hết hạn)'}
                  </Tag>
                );
              },
            },
            {
              title: 'Số chỗ',
              dataIndex: 'available_slots',
              key: 'available_slots',
            },
            {
              title: 'Thao tác',
              key: 'action',
              render: (_, record) => (
                <Popconfirm title="Xóa ngày này?" onConfirm={() => handleDeleteDeparture(record.id)}>
                  <Button danger icon={<DeleteOutlined />} type="text" />
                </Popconfirm>
              ),
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Tours;
