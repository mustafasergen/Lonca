const Order = require('../models/Order');
const mongoose = require('mongoose');

// Tüm tedarikçilerin aylık satış toplamını gruplandırarak getirme işlevi
const getAllSuppliersMonthlySales = async (req, res) => {
  try {
    const monthlySales = await Order.aggregate([
      { $unwind: "$cart_item" },
      {
        $group: {
          _id: {
            month: { $month: "$payment_at" },
            year: { $year: "$payment_at" }
          },
          totalSales: { $sum: { $multiply: ["$cart_item.quantity", "$cart_item.item_count"] } }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);
    res.json(monthlySales);
  } catch (error) {
    console.error("Aylık satışları getirirken hata oluştu:", error);
    res.status(500).json({ message: "Aylık satışları getirirken hata oluştu" });
  }
};

// Tedarikçi bazlı aylık satış verisi
const getMonthlySalesByVendor = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const vendorSales = await Order.aggregate([
      { $unwind: "$cart_item" },
      {
        $lookup: {
          from: "products",
          localField: "cart_item.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      { $match: { "productInfo.vendor": new mongoose.Types.ObjectId(vendorId) } },
      {
        $group: {
          _id: {
            month: { $month: "$payment_at" },
            year: { $year: "$payment_at" }
          },
          totalSales: { $sum: { $multiply: ["$cart_item.quantity", "$cart_item.item_count"] } }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    if (!vendorSales || vendorSales.length === 0) {
      return res.status(200).json({ message: "No sales data found for this vendor", data: [] });
    }

    res.status(200).json({ data: vendorSales });
  } catch (error) {
    console.error("Error fetching sales data for vendor:", error);
    res.status(500).json({ message: "An error occurred while fetching vendor sales data." });
  }
};


const getVendorProductSales = async (req, res) => {
  const { vendorId } = req.params;

  try {
    const productSales = await Order.aggregate([
      { $unwind: "$cart_item" },
      {
        $lookup: {
          from: "products",
          localField: "cart_item.product",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      { $unwind: "$productInfo" },
      { $match: { "productInfo.vendor": new mongoose.Types.ObjectId(vendorId) } },
      {
        $project: {
          _id: 0,
          productId: "$cart_item.product",
          productName: "$productInfo.name",
          totalQuantity: "$cart_item.quantity",
          totalItems: { $multiply: ["$cart_item.quantity", "$cart_item.item_count"] },
          paymentDate: "$payment_at" 
        }
      },
      { $sort: { paymentDate: 1 } } // Tarihe göre sırala
    ]);

    if (!productSales || productSales.length === 0) {
      return res.status(200).json({ message: "No product sales found for this vendor", data: [] });
    }

    res.status(200).json({ data: productSales });
  } catch (error) {
    console.error("Error fetching vendor product sales data:", error);
    res.status(500).json({ message: "An error occurred while fetching vendor product sales data." });
  }
};


module.exports = {
  getAllSuppliersMonthlySales,
  getMonthlySalesByVendor,
  getVendorProductSales 
};
