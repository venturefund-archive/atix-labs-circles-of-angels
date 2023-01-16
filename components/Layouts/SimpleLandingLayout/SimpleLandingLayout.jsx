import React from 'react';
import { Layout } from 'antd';
import Navbar from 'components/atoms/Navbar/Navbar';
import Footer from 'components/molecules/Footer/Footer';
import './simple-landing-layout.scss';

export const SimpleLandingLayout = ({ children }) => {
  return (
    <Layout className="simpleLandingLayout">
      <Navbar isProtectedRoute />
      <div className="simpleLandingLayout__content">{children}</div>
      <Footer />
    </Layout>
  );
};
