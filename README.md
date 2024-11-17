# Lonca Tedarikçi Yönetim Paneli

Bu proje, tedarikçilerin satış verilerini görselleştirmek ve yönetmek için geliştirilmiş bir yönetim panelidir. React, Node.js ve MongoDB teknolojileri kullanılarak tasarlanmıştır.

---

## 📦 Proje Özellikleri

- **Dashboard**: Toplam satışlar, en çok satan ürün ve aktif tedarikçi sayısı gibi önemli bilgiler.
- **Grafikler ve Tablolar**: Tedarikçilerin aylık satış verilerini grafiklerle görselleştirir ve detaylı tablolar sunar.
- **API Entegrasyonu**: RESTful API üzerinden dinamik veri sağlar.

---

## 🛠️ Kullanılan Teknolojiler

### **Frontend**
- React.js
- Ant Design
- Recharts

### **Backend**
- Node.js
- Express.js

### **Veritabanı**
- MongoDB (Mongoose ile)

---

## 🚀 Kurulum Adımları

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/mustafasergen/Lonca.git
cd Lonca
// Backend Kurulumu
// Ana dizinde aşağıdaki komutları çalıştırın:
npm install
npm start
// Frontend Kurulumu
// client dizinine gidin ve aşağıdaki komutları çalıştırın:
cd client
npm install
npm start
```
## 📂 Proje Yapısı
Lonca/
├── client/               # Frontend dosyaları
│   ├── src/              # React bileşenleri ve sayfalar
│   ├── public/           # Statik dosyalar
│   └── package.json      # Frontend bağımlılıkları
├── routes/               # API rotaları
├── models/               # MongoDB modelleri
├── controllers/          # API kontrolcüleri
├── .env                  # Ortam değişkenleri
├── package.json          # Backend bağımlılıkları
└── server.js             # Ana sunucu dosyası

##  🌐 API Dokümantasyonu
# Dashboard
GET /dashboard
Dashboard verilerini döner.

GET /top-vendor
En çok satış yapan tedarikçiyi döner.

# Tedarikçi Yönetimi
GET /vendors
Tüm tedarikçileri döner.

# Satış Verileri
GET /sales/monthly-sales
Tüm tedarikçilerin aylık satış verilerini döner:

GET /sales/monthly-sales/:vendorId
Belirli bir tedarikçinin aylık satış verilerini döner.

GET /sales/vendor-product-sales/:vendorId
Belirli bir tedarikçinin ürün satış verilerini döner.

## 📊 Ekran Görüntüleri





