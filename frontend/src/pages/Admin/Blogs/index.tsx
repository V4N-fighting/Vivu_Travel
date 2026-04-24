import React, { useEffect, useState } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Typography, 
  Modal, 
  Form, 
  Input, 
  message, 
  Popconfirm, 
  Tag, 
  Select, 
  Tabs, 
  Row, 
  Col, 
  Switch 
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined 
} from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { adminService } from '../../../service/adminService';
import { GET_IMAGE_URL } from '../../../api';
import ImageUpload from '../../../Component/BaseComponent/ImageUpload';
import dayjs from 'dayjs';

const { TabPane } = Tabs;

// Quill modules configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

const BannersTab: React.FC<{ banners: any[], loading: boolean, onRefresh: () => void }> = ({ banners, loading, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const handleAdd = () => {
    setEditingBanner(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: any) => {
    setEditingBanner(record);
    
    // Xử lý URL ảnh để hiển thị trong ImageUpload
    const imageUrl = record.firstImage 
      ? (record.firstImage.startsWith('http') ? record.firstImage : `${GET_IMAGE_URL}/banners/${record.firstImage}`)
      : '';

    form.setFieldsValue({
      title: record.textContent,
      subtitle: record.subtitle,
      image_url: imageUrl, // Truyền URL đầy đủ để ImageUpload hiển thị preview
      page_location: record.page_location,
      is_active: record.isActive
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await adminService.deleteBanner(id);
      message.success('Đã xóa banner');
      onRefresh();
    } catch (error) {
      message.error('Lỗi khi xóa banner');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("=== DEBUG BANNER FORM ===");
      console.log("Raw values from form:", values);
      
      const formData = new FormData();
      formData.append('textContent', values.title || '');
      formData.append('subtitle', values.subtitle || '');
      formData.append('page_location', values.page_location || 'home');
      formData.append('is_active', values.is_active ? 'true' : 'false');
      formData.append('sortOrder', '0');

      // TRÍCH XUẤT FILE ẢNH
      let imageFile = null;
      
      // 1. Kiểm tra nếu image_url là File object (đang chọn file mới)
      if (values.image_url instanceof File) {
        imageFile = values.image_url;
      } 
      // 2. Kiểm tra các trường hợp lồng nhau khác của Ant Design / Custom Component
      else if (values.image_url && typeof values.image_url === 'object') {
        if (values.image_url.originFileObj) {
          imageFile = values.image_url.originFileObj;
        } else if (values.image_url.file) {
          imageFile = values.image_url.file instanceof File ? values.image_url.file : values.image_url.file.originFileObj;
        }
      }

      if (imageFile) {
        console.log("Đã tìm thấy file ảnh thực tế để gửi:", imageFile.name);
        formData.append('firstImage', imageFile);
      } else {
        // Nếu không có file mới, nhưng có link ảnh cũ (đang ở chế độ chỉnh sửa)
        // Lấy lại tên file từ URL (phần sau cùng của path)
        if (editingBanner && typeof values.image_url === 'string' && values.image_url.includes('/banners/')) {
          const fileName = values.image_url.split('/banners/').pop();
          formData.append('firstImage', fileName || '');
        } else if (editingBanner && editingBanner.firstImage) {
           formData.append('firstImage', editingBanner.firstImage);
        }
      }

      if (editingBanner) {
        await adminService.updateBanner(editingBanner.id, formData);
        message.success('Đã cập nhật banner');
      } else {
        if (!imageFile && typeof values.image_url !== 'string') {
          message.error('Vui lòng chọn ảnh cho banner!');
          return;
        }
        await adminService.createBanner(formData);
        message.success('Đã thêm banner mới');
      }
      setIsModalOpen(false);
      onRefresh();
    } catch (error: any) {
      console.error('Banner submit error detail:', error);
      const errorMsg = error.response?.data?.message || 'Lỗi khi lưu banner. Vui lòng kiểm tra lại tệp ảnh.';
      message.error(errorMsg);
    }
  };

  const filteredBanners = banners.filter(b => {
    const searchMatch = (b.title?.toLowerCase().includes(searchText.toLowerCase()) ||
                        b.subtitle?.toLowerCase().includes(searchText.toLowerCase()) ||
                        b.textContent?.toLowerCase().includes(searchText.toLowerCase()));
    
    // Nếu tab này là Banners, chúng ta có thể muốn lọc theo page_location hoặc không
    return searchMatch;
  });

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'firstImage', // Đổi từ image_url sang firstImage để khớp với Backend
      key: 'firstImage',
      render: (url: string, record: any) => {
        const finalUrl = url || record.image_url;
        const imageUrl = finalUrl ? (finalUrl.startsWith('http') ? finalUrl : `${GET_IMAGE_URL}/banners/${finalUrl}`) : '';
        return <img src={imageUrl} alt="" style={{ width: 100, height: 50, objectFit: 'cover', borderRadius: 4 }} />;
      },
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'textContent', // Đổi từ title sang textContent để khớp với Backend
      key: 'textContent',
      render: (text: string, record: any) => <b>{text || record.title}</b>,
    },
    {
      title: 'Vị trí',
      dataIndex: 'page_location',
      key: 'page_location',
      render: (loc: string) => <Tag color="blue">{loc || 'Trang chủ'}</Tag>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm title="Xóa banner này?" onConfirm={() => handleDelete(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input 
          placeholder="Tìm theo tiêu đề banner..." 
          prefix={<SearchOutlined />} 
          style={{ width: 300 }}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          allowClear
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Thêm Banner
        </Button>
      </div>
      <Table columns={columns} dataSource={filteredBanners} rowKey="id" loading={loading} />
      <Modal
        title={editingBanner ? 'Chỉnh sửa Banner' : 'Thêm Banner mới'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        width={700}
      >
        <Form form={form} layout="vertical" initialValues={{ page_location: 'home', is_active: true }}>
          <Form.Item name="title" label="Tiêu đề chính" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subtitle" label="Tiêu đề phụ">
            <Input />
          </Form.Item>
          <Form.Item name="image_url" label="Link hình ảnh" rules={[{ required: true }]}>
            <ImageUpload />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="page_location" label="Vị trí hiển thị">
                <Select options={[
                  { value: 'home', label: 'Trang chủ' },
                  { value: 'tours', label: 'Trang Tours' },
                  { value: 'about', label: 'Về chúng tôi' },
                ]} />
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
    </>
  );
};

const ContentManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [blogsData, bannersData] = await Promise.all([
        adminService.getBlogs(),
        adminService.getBanners()
      ]);
      setBlogs(blogsData);
      setBanners(bannersData);
    } catch (error) {
      message.error('Không thể tải dữ liệu nội dung');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddBlog = () => {
    setEditingBlog(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditBlog = (record: any) => {
    setEditingBlog(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDeleteBlog = async (id: number) => {
    try {
      await adminService.deleteBlog(id);
      message.success('Đã xóa bài viết');
      fetchData();
    } catch (error) {
      message.error('Lỗi khi xóa bài viết');
    }
  };

  const handleBlogOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Tự động tạo slug nếu chưa có
      if (!values.slug && values.title) {
        values.slug = values.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[đĐ]/g, 'd')
          .replace(/([^0-9a-z-\s])/g, '')
          .replace(/(\s+)/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
      }

      if (editingBlog) {
        await adminService.updateBlog(editingBlog.id, values);
        message.success('Đã cập nhật bài viết');
      } else {
        await adminService.createBlog(values);
        message.success('Đã thêm bài viết mới');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Blog submit error:', error);
      message.error('Lỗi khi lưu bài viết');
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title?.toLowerCase().includes(searchText.toLowerCase()) ||
    blog.author_name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const blogColumns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (url: string) => {
        const imageUrl = url ? (url.startsWith('http') ? url : `${GET_IMAGE_URL}/blogs/${url}`) : '';
        return <img src={imageUrl} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }} />;
      },
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'author_name',
      key: 'author_name',
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'published_at',
      key: 'published_at',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEditBlog(record)} />
          <Popconfirm title="Xóa bài viết này?" onConfirm={() => handleDeleteBlog(record.id)}>
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Tabs defaultActiveKey="1" style={{ background: '#fff', padding: '16px', borderRadius: '8px' }}>
        <TabPane tab={<Typography.Title level={4} style={{ margin: 0 }}>Tin tức/Blog</Typography.Title>} key="1">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <Input 
              placeholder="Tìm theo tiêu đề bài viết..." 
              prefix={<SearchOutlined />} 
              style={{ width: 300 }}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              allowClear
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddBlog}>
              Viết bài mới
            </Button>
          </div>
          <Table columns={blogColumns} dataSource={filteredBlogs} rowKey="id" loading={loading} />
        </TabPane>

        <TabPane tab={<Typography.Title level={4} style={{ margin: 0 }}>Banners</Typography.Title>} key="2">
          <BannersTab 
            banners={banners} 
            loading={loading} 
            onRefresh={fetchData} 
          />
        </TabPane>
      </Tabs>

      <Modal
        title={editingBlog ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
        open={isModalOpen}
        onOk={handleBlogOk}
        onCancel={() => setIsModalOpen(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Tiêu đề bài viết" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="thumbnail" label="Ảnh thu nhỏ (Thumbnail)">
            <ImageUpload />
          </Form.Item>
          <Form.Item 
            name="content" 
            label="Nội dung" 
            rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }]}
          >
            <ReactQuill 
              theme="snow"
              modules={quillModules}
              placeholder="Nhập nội dung bài viết chuyên nghiệp tại đây..."
              style={{ height: '300px', marginBottom: '50px' }}
            />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="author_name" label="Tên tác giả">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="category" label="Chuyên mục">
                <Select options={[
                  { value: 'travel', label: 'Cẩm nang du lịch' },
                  { value: 'news', label: 'Tin tức sự kiện' },
                  { value: 'review', label: 'Review trải nghiệm' },
                ]} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentManagement;
