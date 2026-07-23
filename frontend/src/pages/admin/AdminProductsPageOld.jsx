import { useState } from "react";
import { Table } from "../../components/common/Table";
import { Outlet } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { ToolBar } from "../../components/admin/product-table/ToolBar";


// const categories = [
//   { label: "All Products", value: "" },
//   { label: "Men Shirts", value: "men-shirts" },
//   { label: "Men Watches", value: "men-watches" },
//   { label: "Men Shoes", value: "men-shoes" },
//   { label: "Women Dresses", value: "women-dresses" },
//   { label: "Women Shoes", value: "women-shoes" },
//   { label: "Women Bags", value: "women-bags" },
//   { label: "Women Jewellery", value: "women-jewellery" },
// ];

export const AdminProductsPage = () => {
  // const [category, setCategory] = useState("");
  const { products, loading, error } = useProducts({
  category,
});

  return (
    <>
        {/* <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          {categories.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select> */}
     
      <Table data={products} loading={loading} error={error} />
      <Outlet />
    </>
  );
};
