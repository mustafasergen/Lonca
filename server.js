const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const vendorsRoutes = require('./routes/vendorsRoutes');
const allSuppliersSalesRoutes = require('./routes/allSuppliersSalesRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');


const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/supplier_dashboard')
  .then(() => console.log("MongoDB'ye başarıyla bağlandı"))
  .catch((error) => console.error("MongoDB bağlantı hatası:", error));

// API 
app.use('/api', vendorsRoutes); // Vendor rotası
app.use('/api', allSuppliersSalesRoutes); // Sales rotası
app.use('/api', dashboardRoutes); // default rotası

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});