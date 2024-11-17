import React from 'react';
import { Table } from 'antd';

const AllSuppliersSalesTable = ({ data }) => {
  const columns = [
    {
      title: 'Yıl/Ay',
      dataIndex: 'monthYear',
      key: 'monthYear',
    },
    {
      title: 'Toplam Satış',
      dataIndex: 'totalSales',
      key: 'totalSales',
    },
  ];

  // Veriyi tabloya uygun hale getirme
  const formattedData = data.map((item) => ({
    key: `${item.key}`, // Veriye göre key ekliyoruz
    monthYear: item.monthYear,
    totalSales: item.totalSales,
  }));

  return (
    <Table
      columns={columns}
      dataSource={formattedData}
      pagination={false}
      locale={{ emptyText: 'Herhangi bir satış yapılmadı.' }}
      summary={(currentData) => {
        const totalSales = currentData.reduce((sum, item) => sum + item.totalSales, 0);

        return (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={1} style={{ fontWeight: 'bold' }}>
              Toplam Satış:
            </Table.Summary.Cell>
            <Table.Summary.Cell style={{ fontWeight: 'bold' }}>
              {totalSales.toLocaleString()} Adet
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    />
  );
};

export default AllSuppliersSalesTable;
