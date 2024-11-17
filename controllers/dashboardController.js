const Order = require('../models/Order');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');
const mongoose = require('mongoose');

// Dashboard verilerini getiren fonksiyon
const getDashboardData = async (req, res) => {
  try {
    // Toplam satış miktarını hesapla
    const totalSales = await Order.aggregate([
      { $unwind: "$cart_item" },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: { $multiply: ["$cart_item.quantity", "$cart_item.item_count", "$cart_item.price"] },
          },
        },
      },
    ]);

    // En çok satan ürünü bul
    const bestSellingProduct = await Order.aggregate([
      { $unwind: "$cart_item" },
      {
        $group: {
          _id: "$cart_item.product",
          totalQuantity: { $sum: { $multiply: ["$cart_item.quantity", "$cart_item.item_count"] } },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 1 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $project: {
          productName: "$productInfo.name",
          totalQuantity: 1,
        },
      },
    ]);

    // Aktif tedarikçi sayısını hesapla
    const activeVendorsCount = await Vendor.countDocuments();

    // Sonuçları döndür
    res.status(200).json({
      totalSales: totalSales[0]?.totalSales || 0,
      bestSellingProduct: bestSellingProduct[0]?.productName || "No product data",
      activeVendors: activeVendorsCount,
    });
  } catch (error) {
    console.error("Dashboard verileri alınırken hata oluştu:", error);
    res.status(500).json({ message: "Veri alınırken hata oluştu." });
  }
};

// En çok satış yapan tedarikçiyi bulma fonksiyonu
const getTopSellingVendor = async (req, res) => {
    try {
      // Tedarikçiye göre toplam satış miktarını hesapla
      const topVendor = await Order.aggregate([
        { $unwind: "$cart_item" },
        {
          $lookup: {
            from: "products",
            localField: "cart_item.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        { $unwind: "$productInfo" },
        {
          $group: {
            _id: "$productInfo.vendor",
            totalSales: { $sum: { $multiply: ["$cart_item.quantity", "$cart_item.item_count"] } },
          },
        },
        { $sort: { totalSales: -1 } },
        { $limit: 1 },
        {
          $lookup: {
            from: "vendors",
            localField: "_id",
            foreignField: "_id",
            as: "vendorInfo",
          },
        },
        { $unwind: "$vendorInfo" },
        {
          $project: {
            vendorId: "$_id",
            vendorName: "$vendorInfo.name",
            totalSales: 1,
          },
        },
      ]);
  
      if (!topVendor || topVendor.length === 0) {
        return res.status(404).json({ message: "No vendors found" });
      }
  
      res.status(200).json(topVendor[0]);
    } catch (error) {
      console.error("Error fetching top-selling vendor:", error);
      res.status(500).json({ message: "Error fetching top-selling vendor" });
    }
  };

module.exports = { getDashboardData, getTopSellingVendor };
