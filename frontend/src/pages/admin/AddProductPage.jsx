import { useForm } from "react-hook-form";
import { addProduct } from "../../services/product.service";

export const AddProductPage = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);

      formData.append(
        "slug",
        data.title.toLowerCase().replace(/\s+/g, "-")
      );

      formData.append("description", data.description);

      formData.append("category", data.category);

      formData.append("brand", data.brand);

      formData.append("price", data.price);

      formData.append(
        "discountPrice",
        data.discountPrice || 0
      );

      formData.append("stock", data.stock);

      // Arrays (backend expects JSON strings)
      formData.append("colors", JSON.stringify([]));
      formData.append("sizes", JSON.stringify([]));
      formData.append("tags", JSON.stringify([]));
      formData.append("specifications", JSON.stringify([]));

      // Images
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });

      const res = await addProduct(formData);

      alert(res.data.message);

      reset();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title")}
        placeholder="Title"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
      />

      <input
        {...register("category")}
        placeholder="Category"
      />

      <input
        {...register("brand")}
        placeholder="Brand"
      />

      <input
        type="number"
        {...register("price")}
        placeholder="Price"
      />

      <input
        type="number"
        {...register("discountPrice")}
        placeholder="Discount Price"
      />

      <input
        type="number"
        {...register("stock")}
        placeholder="Stock"
      />

      <input
        type="file"
        multiple
        {...register("images")}
      />

      <button type="submit">
        Add Product
      </button>
    </form>
  );
};

export default AddProductPage;