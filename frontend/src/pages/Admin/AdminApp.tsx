import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import config from '../../config';
import Dashboard from './Dashboard/index';
import Tours from './Tours/index';
import Bookings from './Bookings/index';
import Users from './Users/index';
import Blogs from './Blogs/index';
import Banners from './Banners/index';
import Coupons from './Coupons/index';
import Countries from './Countries/index';
import Reviews from './Reviews/index';
import Contacts from './Contacts/index';
import Activities from './Activities/index';

const AdminApp: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={config.routes.admin_dashboard} replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="tours" element={<Tours />} />
      <Route path="bookings" element={<Bookings />} />
      <Route path="users" element={<Users />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="banners" element={<Banners />} />
      <Route path="coupons" element={<Coupons />} />
      <Route path="countries" element={<Countries />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="activities" element={<Activities />} />
    </Routes>
  );
};

export default AdminApp;
