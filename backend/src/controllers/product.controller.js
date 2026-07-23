// ==========================================
// Import Packages - START
// ==========================================

import Product from "../models/product.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { generateAndSaveProductEmbedding } from "../services/embeddingService.js";


// ==========================================
// Import Packages - END
// ==========================================

// ==========================================
// Add Product Controller - START
// ==========================================


export const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      category,
      subCategory,
      brand,
      sku,
      price,
      discountPrice,
      discountPercentage,
      stock,
    } = req.body;

    // Check Existing Product
    const existingProduct = await Product.findOne({
      $or: [
        ...(sku ? [{ sku }] : []),
        ...(title && category ? [{ title, category }] : []),
      ],
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product already exists.",
      });
    }

    // Upload Images

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required.",
      });
    }

    let imageUrls = [];


    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedImage = await uploadToCloudinary(
          file.buffer,
          "products"
        );

        imageUrls.push(uploadedImage.secure_url);
      }
    }

    // Create Product
    const product = await Product.create({
      title,
      description,
      shortDescription,
      category,
      subCategory,
      brand,
      sku,
      price,
      discountPrice,
      discountPercentage,
      stock,
      thumbnail: imageUrls[0] || "",
      images: imageUrls,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Add Products From JSON - START
// ==========================================

export const addProductsFromJson = async (req, res) => {
  try {
    const payload = req.body;
    const list = Array.isArray(payload) ? payload : [payload];

    if (!list || list.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a product object or a non-empty array of products.",
      });
    }

    const created = [];
    const skipped = [];

    for (const item of list) {
      const title = item?.title;
      const description = item?.description;
      const shortDescription = item?.shortDescription || "";
      const category = item?.category;
      const subCategory = item?.subCategory || "";
      const brand = item?.brand;
      const sku = item?.sku;
      const price = Number(item?.price);
      const discountPrice = item?.discountPrice != null ? Number(item.discountPrice) : 0;
      const discountPercentage = item?.discountPercentage != null ? Number(item.discountPercentage) : 0;
      const stock = item?.stock != null ? Number(item.stock) : 0;
      const images = Array.isArray(item?.images) ? item.images : [];
      const thumbnail = item?.thumbnail || images?.[0] || "";

      if (!title || !description || !category || !brand || !sku || Number.isNaN(price) || !thumbnail) {
        skipped.push({ sku: sku || null, reason: "Missing required fields" });
        continue;
      }

      const existing = await Product.findOne({ sku });
      if (existing) {
        skipped.push({ sku, reason: "SKU already exists" });
        continue;
      }

      const product = await Product.create({
        title,
        description,
        shortDescription,
        category,
        subCategory,
        brand,
        sku,
        price,
        discountPrice,
        discountPercentage,
        stock,
        thumbnail,
        images,
      });

      created.push(product);
    }

    return res.status(201).json({
      success: true,
      message: `Created ${created.length} product(s). Skipped ${skipped.length}.`,
      created,
      skipped,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Add Products From JSON - END
// ==========================================

// ==========================================
// Add Product Controller - END
// ==========================================



// ==========================================
// Get All Products - START
// ==========================================


export const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 70;
    const search = req.query.search || "";
    const category = req.query.category || "";
    const brand = req.query.brand || "";

    const skip = (page - 1) * limit;

    const filter = {
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// Get All Products - END
// ==========================================

// ==========================================
// Get Product By ID - START
// ==========================================

export const getProductById = async (req, res) => {
  try {
    console.log("Product ID:", req.params.id);

    const product = await Product.findById(req.params.id);

    console.log(product);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log("GET PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ==========================================
// Get Product By ID - END
// ==========================================

// ==========================================
// Update Product - START
// ==========================================

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    generateAndSaveProductEmbedding(product._id).catch((err) =>
  console.error("[ai] failed to generate embedding for product", product._id, err.message)
);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Product - END
// ==========================================

// ==========================================
// Delete Product - START
// ==========================================

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Delete Product - END
// ==========================================