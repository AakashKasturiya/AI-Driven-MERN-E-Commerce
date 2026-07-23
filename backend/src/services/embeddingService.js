import openai from "../config/openai.js";
import Product from "../models/product.model.js";

const EMBEDDING_MODEL = "text-embedding-3-small"; // cheap, 1536 dims, good enough for product search

export function buildEmbeddingText(product) {
  // Concatenate the fields that actually carry semantic meaning
  return [product.title, product.brand, product.category, product.shortDescription, product.description]
    .filter(Boolean)
    .join(" — ");
}

export async function generateEmbedding(text) {
  if (!openai) {
    const err = new Error("AI provider not configured");
    err.status = 501;
    throw err;
  }

  const res = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });

  return res.data[0].embedding;
}

// Call this whenever a product is created or updated (title/description/category changed)
export async function generateAndSaveProductEmbedding(productId) {
  const product = await Product.findById(productId);
  if (!product) return null;

  const text = buildEmbeddingText(product);
  if (!text.trim()) return null;

  const embedding = await generateEmbedding(text);

  product.embedding = embedding;
  product.embeddingUpdatedAt = new Date();
  await product.save();

  return embedding;
}

// Batch backfill for existing products that have no embedding yet.
// OpenAI allows array input, so batch to cut down on request count.
export async function backfillMissingEmbeddings({ batchSize = 20 } = {}) {
  const products = await Product.find({
    $or: [{ embedding: { $size: 0 } }, { embedding: { $exists: false } }],
  }).select("_id title brand category shortDescription description");

  let processed = 0;
  let failed = 0;

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const texts = batch.map(buildEmbeddingText);

    try {
      const res = await openai.embeddings.create({
        model: EMBEDDING_MODEL,
        input: texts,
      });

      await Promise.all(
        batch.map((product, idx) =>
          Product.updateOne(
            { _id: product._id },
            { embedding: res.data[idx].embedding, embeddingUpdatedAt: new Date() }
          )
        )
      );

      processed += batch.length;
    } catch (err) {
      console.error("[ai] embedding backfill batch failed:", err.message);
      failed += batch.length;
    }
  }

  return { total: products.length, processed, failed };
}