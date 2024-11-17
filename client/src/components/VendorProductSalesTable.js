import React, { useState } from 'react';
import { Table } from 'antd';

const VendorProductSalesTable = ({ data }) => {
  // Ay ve yıl bazlı filtreler
  const generateFilters = () => {
    const uniqueMonthsYears = Array.from(
      new Set(
        data.map((item) => {
          const date = new Date(item.paymentDate);
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay (01-12)
          const year = date.getFullYear(); // Yıl
          return `${month}/${year}`;
        })
      )
    );
    return uniqueMonthsYears.map((monthYear) => ({
      text: monthYear,
      value: monthYear,
    }));
  };

  const columns = [
    {
      title: 'Ürün Adı',
      dataIndex: 'productName',
      key: 'productName',
      filters: data.map((item) => ({
        text: item.productName,
        value: item.productName,
      })),
      onFilter: (value, record) => record.productName.includes(value),
    },
    {
      title: 'Toplam Satılan Miktar (Adet)',
      dataIndex: 'totalItems',
      key: 'totalItems',
    },
    {
      title: 'Toplam Satılan Paket',
      dataIndex: 'totalQuantity',
      key: 'totalQuantity',
    },
    {
      title: 'Satış Tarihi',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) => new Date(date).toLocaleDateString(), // Tarihi okunabilir format
      filters: generateFilters(), // Dinamik olarak ay/yıl filtreleri
      onFilter: (value, record) => {
        const date = new Date(record.paymentDate);
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ay (01-12)
        const year = date.getFullYear(); // Yıl
        return `${month}/${year}` === value;
      },
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = (paginationInfo) => {
    setPagination(paginationInfo);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="productId"
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: (page, pageSize) => setPagination({ current: page, pageSize }),
      }}
      onChange={handleTableChange}
      locale={{ emptyText: 'Bu tedarikçi için ürün satış verisi yok.' }}
      summary={(currentData) => {
        const totalItems = currentData.reduce((sum, item) => sum + item.totalItems, 0);
        const totalQuantity = currentData.reduce((sum, item) => sum + item.totalQuantity, 0);

        return (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={1} style={{ fontWeight: 'bold' }}>
              Toplam:
            </Table.Summary.Cell>
            <Table.Summary.Cell>{totalItems} Adet</Table.Summary.Cell>
            <Table.Summary.Cell>{totalQuantity} Paket</Table.Summary.Cell>
            <Table.Summary.Cell />
          </Table.Summary.Row>
        );
      }}
    />
  );
};

export default VendorProductSalesTable;
