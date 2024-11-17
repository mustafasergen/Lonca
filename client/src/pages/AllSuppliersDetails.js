import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AllSuppliersChart from '../components/AllSuppliersChart';
import AllSuppliersSalesTable from '../components/AllSuppliersSalesTable';
import { Select } from 'antd';

const { Option } = Select;

const AllSuppliersDetails = () => {
  const [totalSalesData, setTotalSalesData] = useState([]);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    // Tüm tedarikçilerin satış verilerini çek
    axios
      .get('http://localhost:5000/api/sales/monthly-sales')
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          key: `${item._id.year}-${item._id.month}`,
          monthYear: `${item._id.month}/${item._id.year}`,
          totalSales: item.totalSales,
        }));
        setTotalSalesData(formattedData);
      })
      .catch((error) => console.error('Veri alınırken hata oluştu:', error));

    // Tedarikçileri çek
    axios
      .get('http://localhost:5000/api/vendors')
      .then((response) => {
        setVendors(response.data);
      })
      .catch((error) => console.error('Tedarikçi listesi alınırken hata oluştu:', error));
  }, []);

  const handleVendorChange = (vendorId) => {
    // Seçilen tedarikçi detay sayfasına yönlendirme
    window.location.href = `/vendor/${vendorId}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {/* Dinamik Başlık */}
      <Helmet>
        <title>Tüm Tedarikçi Detayları</title>
        <meta name="description" content="Tüm tedarikçilerin aylık satış detayları ve seçilebilir grafikleri." />
      </Helmet>

      <h1>Bütün Tedarikçiler Aylık Satış Grafiği</h1>

      {/* Grafik */}
      <AllSuppliersChart data={totalSalesData} />

      {/* Tablo */}
      <div style={{ width: '70%', marginTop: '20px' }}>
        <AllSuppliersSalesTable data={totalSalesData} />
      </div>

      {/* Tedarikçi Dropdown */}
      <h2 style={{ marginTop: '40px' }}>Tedarikçi Seç</h2>
      <Select
        style={{ width: 300 }}
        placeholder="Tedarikçi Seçin"
        onChange={handleVendorChange}
      >
        {vendors.map((vendor) => (
          <Option key={vendor._id} value={vendor._id}>
            {vendor.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AllSuppliersDetails;
