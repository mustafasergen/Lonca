import React from 'react';
import { Layout, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const CustomHeader = () => {
  return (
    <Header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        backgroundColor: '#ffffff',
        color: 'black',
        height: '80px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <img
          src="/images/lonca-logo.png"          
          alt="Lonca Logo"
          style={{
            height: '40px', 
            objectFit: 'contain', 
            marginLeft: '75px', 
            marginTop: '25px', 
          }}
        />
      </Link>
      <h1
        style={{
          fontSize: '30px',
          color: '#001529',
          flex: 1,
          marginLeft: '860px',
          marginTop: '20px', 
        }}
      >
        Tedarikçi Paneli
      </h1>
    </Header>
  );
};

export default CustomHeader;
