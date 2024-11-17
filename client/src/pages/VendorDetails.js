import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AllSuppliersChart from '../components/AllSuppliersChart';
import AllSuppliersSalesTable from '../components/AllSuppliersSalesTable';
import VendorProductSalesTable from '../components/VendorProductSalesTable';
import { Spin, Empty, Button } from 'antd';

const VendorDetails = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState([]);
  const [vendorName, setVendorName] = useState('');
  const [loading, setLoading] = useState(true);
  const [productSalesData, setProductSalesData] = useState([]);

  useEffect(() => {
    // Vendor bilgilerini çek
    axios
      .get('http://localhost:5000/api/vendors')
      .then((response) => {
        const vendor = response.data.find((v) => v._id === vendorId);
        if (vendor) {
          setVendorName(vendor.name);
        }
      })
      .catch((error) => console.error('Vendor bilgisi alınırken hata oluştu:', error));

    // Vendor'ın aylık satış verilerini çek
    axios
      .get(`http://localhost:5000/api/sales/monthly-sales/${vendorId}`)
      .then((response) => {
        const data = response.data.data || [];
        const formattedData = data.map((item) => ({
          key: `${item._id.year}-${item._id.month}`,
          monthYear: `${item._id.month}/${item._id.year}`,
          totalSales: item.totalSales,
        }));
        setVendorData(formattedData);
      })
      .catch((error) => console.error('Aylık satış verisi alınırken hata oluştu:', error));

    // Vendor'ın ürün satış verilerini çek
    axios
      .get(`http://localhost:5000/api/sales/vendor-product-sales/${vendorId}`)
      .then((response) => {
        const data = response.data.data || [];
        setProductSalesData(data);
      })
      .catch((error) => console.error('Ürün satış verisi alınırken hata oluştu:', error))
      .finally(() => setLoading(false));
  }, [vendorId]);

  return (
    <div style={{ padding: '20px', textAlign: 'center', position: 'relative' }}>
      {/* Dinamik Başlık */}
      <Helmet>
        <title>{vendorName ? `${vendorName} Satış Detayları` : 'Satış Detayları'}</title>
      </Helmet>
      {/* Geri Dön Butonu */}
      {!loading && ( // Butonu sadece yükleme tamamlandığında göster
        <Button
          type="primary"
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
          }}
          onClick={() => navigate('/all-suppliers-details')}
        >
          Geri Dön
        </Button>
      )}

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{vendorName ? `${vendorName} Satış Detayları` : 'Satış Detayları'}</h1>

          {/* Aylık satış grafiği */}
          {vendorData.length > 0 ? (
            <AllSuppliersChart data={vendorData} />
          ) : (
            <Empty description="Aylık satış verisi bulunamadı" />
          )}

          {/* Aylık satış tablosu */}
          <div style={{ width: '70%', margin: '20px auto' }}>
            {vendorData.length > 0 ? (
              <AllSuppliersSalesTable data={vendorData} />
            ) : (
              <Empty description="Aylık satış verisi bulunamadı" />
            )}
          </div>

          {/* Ürün satış tablosu */}
          <h2>Ürün Satış Verileri</h2>
          <div style={{ width: '70%', margin: '20px auto' }}>
            {productSalesData.length > 0 ? (
              <VendorProductSalesTable data={productSalesData} />
            ) : (
              <Empty description="Ürün satış verisi bulunamadı" />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default VendorDetails;
