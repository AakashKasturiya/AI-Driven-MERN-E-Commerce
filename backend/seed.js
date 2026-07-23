import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";

import Product from "./src/models/product.model.js";

dotenv.config();

// ==========================================
// Read All JSON Files
// ==========================================

const files = [
  "men-shirts.json",
  "men-watches.json",
  "men-shoes.json",
  "women-dresses.json",
  "women-shoes.json",
  "women-bags.json",
  "women-jewellery.json",
];

let products = [];

for (const file of files) {
  const data = JSON.parse(
    fs.readFileSync(`./seed/${file}`, "utf-8")
  );

  products.push(...data);
}

// ==========================================
// Seed Function
// ==========================================

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    // Remove old slug index (ignore if not exists)
    try {
      await Product.collection.dropIndex("slug_1");
      console.log("✅ Removed slug index");
    } catch {}

    // Delete old data
    await Product.deleteMany();

    // Remove duplicate SKU if any
    const uniqueProducts = Array.from(
      new Map(products.map((item) => [item.sku, item])).values()
    );

    // Insert
    await Product.insertMany(uniqueProducts);

    console.log(
      `🎉 ${uniqueProducts.length} Products Seeded Successfully`
    );

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();