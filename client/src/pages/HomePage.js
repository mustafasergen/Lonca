import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, notification } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HomePage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    bestSellingProduct: '',
    activeVendors: 0,
  });
  const [topVendor, setTopVendor] = useState(null);

  useEffect(() => {
    // Dashboard verilerini çek
    axios
      .get('http://localhost:5000/api/dashboard')
      .then((response) => {
        setDashboardData(response.data);
      })
      .catch((error) => console.error('Dashboard verileri alınırken hata oluştu:', error));

    // En çok satış yapan tedarikçiyi çek
    axios
      .get('http://localhost:5000/api/top-vendor')
      .then((response) => {
        setTopVendor(response.data);
      })
      .catch((error) => {
        console.error('En çok satış yapan tedarikçi alınırken hata oluştu:', error);
        notification.error({
          message: 'Hata',
          description: 'En çok satış yapan tedarikçi bulunamadı.',
        });
      });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      {/* Dinamik Başlık */}
      <Helmet>
        <title>Lonca Genel Bilgi - Ana Sayfa</title>
        <meta name="description" content="Lonca platformunun genel satış ve tedarikçi bilgileri." />
      </Helmet>

      <h1 style={{ marginBottom: '40px' }}>Genel Bilgiler</h1>

      {/* Kartlar */}
      <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'center' }}>
        <Col>
          <Card title="Toplam Satış" bordered={false} style={{ width: 300, textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {dashboardData.totalSales.toLocaleString()} TL
            </p>
          </Card>
        </Col>
        <Col>
          <Card
            title="En Çok Satan Ürün"
            bordered={false}
            style={{ width: 300, textAlign: 'center' }}
          >
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
              {dashboardData.bestSellingProduct}
            </p>
          </Card>
        </Col>
        <Col>
          <Card
            title="Aktif Tedarikçi Sayısı"
            bordered={false}
            style={{ width: 300, textAlign: 'center' }}
          >
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{dashboardData.activeVendors}</p>
          </Card>
        </Col>
      </Row>

      {/* CTA Butonları */}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate('/all-suppliers-details')}
          style={{ marginRight: '20px' }}
        >
          Tüm Tedarikçi Detayları
        </Button>
        <Button
          type="default"
          size="large"
          onClick={() =>
            topVendor
              ? navigate(`/vendor/${topVendor.vendorId}`)
              : notification.warning({
                  message: 'Bilgi',
                  description: 'En çok satış yapan tedarikçi bulunamadı.',
                })
          }
        >
          En Çok Satış Yapan Tedarikçi
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
