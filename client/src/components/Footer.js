import React from 'react';
import { Layout, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: '#f9f7f7',
        color: '#333',
        padding: '40px 20px',
        fontSize: '14px',
        borderTop: '1px solid #ddd',
      }}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={12} lg={8} style={{ textAlign: 'left' }}>
        <Link to="/" style={{ textDecoration: 'none',   color: 'inherit',}}>
          <h3 style={{ fontSize: '25px', fontWeight: 'bold', marginBottom: '10px' }}>LONCA</h3>
          <p> Butikleri Türkiye'deki toptan giyim markalarıyla buluşturan online toptan giyim sitesi</p>
        </Link>
        </Col>

        <Col xs={24} sm={12} lg={8} style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>KURUMSAL</h3>
          <p style={{ marginBottom: '5px', cursor: 'pointer' }}>Hakkımızda</p>
          <p style={{ marginBottom: '5px', cursor: 'pointer' }}>Blog</p>
          <p style={{ cursor: 'pointer' }}>Lonca'da satış yap</p>
        </Col>
        
        <Col xs={24} sm={12} lg={8} style={{ textAlign: 'right' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>MEDYA</h3>
          <p style={{ marginBottom: '5px', cursor: 'pointer' }}>Instagram</p>
          <p style={{ marginBottom: '5px', cursor: 'pointer' }}>Telegram</p>
          <p style={{ cursor: 'pointer' }}>Whatsapp Destek</p>
        </Col>
      </Row>

      <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        © 2024 Lonca Corp. Gizlilik Politikası | Şartlar ve Koşullar
      </div>
    </Footer>
  );
};

export default CustomFooter;
