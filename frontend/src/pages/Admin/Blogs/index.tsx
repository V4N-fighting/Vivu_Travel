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
  Select, 
  Row, 
  Col
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

const ContentManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const blogsData = await adminService.getBlogs();
      setBlogs(blogsData);
    } catch (error) {
      message.error('Không thể tải dữ liệu blog');
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
      <div style={{ background: '#fff', padding: '16px', borderRadius: '8px' }}>
        <Typography.Title level={4} style={{ margin: '0 0 16px 0' }}>Tin tức / Blog</Typography.Title>
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
      </div>

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
