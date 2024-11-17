import React from 'react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const AllSuppliersChartDisplay = ({ data, chartType }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      {chartType === 'bar' ? (
        <BarChart data={data}>
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalSales" fill="#82ca9d" />
        </BarChart>
      ) : chartType === 'line' ? (
        <LineChart data={data}>
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
        </LineChart>
      ) : (
        <AreaChart data={data}>
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="totalSales" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      )}
    </ResponsiveContainer>
  );
};

export default AllSuppliersChartDisplay;