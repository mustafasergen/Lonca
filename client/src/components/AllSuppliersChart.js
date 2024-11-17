import React, { useState } from 'react';
import { Button } from 'antd';
import AllSuppliersChartDisplay from './AllSuppliersChartDisplay';

const AllSuppliersChart = ({ data }) => {
  const [chartType, setChartType] = useState('bar');

  return (
    <div style={{ width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button type={chartType === 'bar' ? 'primary' : 'default'} onClick={() => setChartType('bar')} style={{ marginRight: '10px' }}>
          Bar Chart
        </Button>
        <Button type={chartType === 'line' ? 'primary' : 'default'} onClick={() => setChartType('line')} style={{ marginRight: '10px' }}>
          Line Chart
        </Button>
        <Button type={chartType === 'area' ? 'primary' : 'default'} onClick={() => setChartType('area')}>
          Area Chart
        </Button>
      </div>
      <AllSuppliersChartDisplay data={data} chartType={chartType} />
    </div>
  );
};

export default AllSuppliersChart;