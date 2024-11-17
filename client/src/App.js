import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd'; 
import CustomHeader from './components/Header';  
import CustomFooter from './components/Footer'; 
import HomePage from './pages/HomePage';  
import AllSuppliersDetails from './pages/AllSuppliersDetails';  
import VendorDetails from './pages/VendorDetails'; 
const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <CustomHeader />
        <Content style={{ marginTop: '90px', padding: '20px', minHeight: '67vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/all-suppliers-details" element={<AllSuppliersDetails />} />
            <Route path="/vendor/:vendorId" element={<VendorDetails />} />
          </Routes>
        </Content>
        <CustomFooter />
      </Layout>
    </Router>
  );
}

export default App;