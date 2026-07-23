import mongoose from "mongoose";

const aiRecommendationCacheSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    reasonSummary: { type: String, default: "" },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("AiRecommendationCache", aiRecommendationCacheSchema);