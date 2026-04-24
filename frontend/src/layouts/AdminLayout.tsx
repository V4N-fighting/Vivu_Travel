import React, { useMemo, useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  BarChartOutlined,
  CompassOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  EditOutlined,
  GiftOutlined,
  StarOutlined,
  MailOutlined
} from '@ant-design/icons';
import config from '../config';

const { Header, Sider, Content } = Layout;

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const selectedKeys = useMemo(() => {
    const path = location.pathname;
    const adminRoutes = [
      config.routes.admin_dashboard,
      config.routes.admin_tours,
      config.routes.admin_bookings,
      config.routes.admin_users,
      config.routes.admin_blogs,
      config.routes.admin_coupons,
      config.routes.admin_reviews,
      config.routes.admin_contacts,
    ];

    const match = adminRoutes.find((r) => path.startsWith(r));
    return match ? [match] : [config.routes.admin_dashboard];
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    window.location.href = config.routes.login;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100
        }}
      >
        <div
          style={{
            height: 48,
            margin: 16,
            borderRadius: 8,
            background: 'rgba(255, 255, 255, 0.12)',
          }}
        />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          <Menu.Item key={config.routes.admin_dashboard} icon={<BarChartOutlined />}>
            <NavLink to={config.routes.admin_dashboard}>Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key={config.routes.admin_tours} icon={<CompassOutlined />}>
            <NavLink to={config.routes.admin_tours}>Quản lý Tours</NavLink>
          </Menu.Item>
          <Menu.Item key={config.routes.admin_bookings} icon={<ShoppingCartOutlined />}>
            <NavLink to={config.routes.admin_bookings}>Quản lý Đơn hàng</NavLink>
          </Menu.Item>
          <Menu.Item key={config.routes.admin_users} icon={<UserOutlined />}>
            <NavLink to={config.routes.admin_users}>Người dùng</NavLink>
          </Menu.Item>
          <Menu.Item key={config.routes.admin_blogs} icon={<EditOutlined />}>
            <NavLink to={config.routes.admin_blogs}>Quản lý Nội dung</NavLink>
          </Menu.Item>
          <Menu.Item key={config.routes.admin_coupons} icon={<GiftOutlined />}>
            <NavLink to={config.routes.admin_coupons}>Mã giảm giá</NavLink>
          </Menu.Item>
          <Menu.Item key={config.routes.admin_reviews} icon={<StarOutlined />}>
            <NavLink to={config.routes.admin_reviews}>Đánh giá</NavLink>
          </Menu.Item>
          <Menu.Item key={config.routes.admin_contacts} icon={<MailOutlined />}>
            <NavLink to={config.routes.admin_contacts}>Liên hệ</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
        <Header
          style={{
            padding: '0 16px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            position: 'fixed',
            width: `calc(100% - ${collapsed ? 80 : 200}px)`,
            zIndex: 99,
            transition: 'all 0.2s'
          }}
        >
          <div style={{ fontWeight: 700 }}>Vivu Travel Admin</div>
          <Button danger onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Header>
        <Content style={{ margin: '80px 16px 16px' }}>
          <div style={{ padding: 16, background: '#fff', borderRadius: 12, minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
